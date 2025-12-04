"use strict";
class Sprite {
    constructor(element) {
        this.element_ = element;
        this.parent_ = null;
        this.children_ = new Array();
        this.nativeParent_ = (element.parentNode);
        if (element.dataset.spriteId)
            console.error("HTML element #" + element.dataset.spriteId
                + " '" + element.id + "' already associated with a sprite.");
        this.setId();
        if (this.nativeParent_ != null && this.nativeParent_.tagName.toLowerCase() != "body") {
            let parent = null;
            if (this.nativeParent_.dataset.spriteId)
                parent = Sprite.instances_.get(this.nativeParent_.dataset.spriteId);
            else
                parent = new Sprite(this.nativeParent_);
            parent.appendChild(this);
        }
        try {
            let box = element.getBoundingClientRect();
            this.x_ = box.left;
            this.y_ = box.top;
            this.width_ = box.width;
            this.height_ = box.height;
            if (this.parent_ != null) {
                box = this.parent_.element_.getBoundingClientRect();
                this.x_ -= box.left;
                this.y_ -= box.top;
            }
        }
        catch (e) {
            this.x_ = 0;
            this.y_ = 0;
            this.width_ = 0;
            this.height_ = 0;
        }
        this.setRotation(0);
        this.setOpacity(1);
        this.element_.style.position = "absolute";
        if (this.element_ instanceof HTMLImageElement)
            (this.element_).draggable = false;
    }
    getId() { return this.element_.dataset.spriteId; }
    setId() {
        if (!this.element_.dataset.spriteId) {
            this.element_.dataset.spriteId = String(++Sprite.counter_);
            Sprite.instances_.set(this.element_.dataset.spriteId, this);
        }
    }
    removeId() {
        if (this.element_.dataset.spriteId) {
            Sprite.instances_.delete(this.element_.dataset.spriteId);
            this.element_.removeAttribute("data-sprite-id");
        }
    }
    static logInstances() { for (let sprite of Sprite.instances_)
        console.log(sprite); }
    log() {
        let message;
        message = `${this.getId()}`;
        message += `{${this.x_};${this.y_}`;
        message += ` ${this.width_}x${this.height_}`;
        message += ` ${this.rotation_}°`;
        message += ` [${this.children_.length}]`;
        message += " -> " + (this.parent_ == null ? "null" : `#${this.parent_.getId()}`);
        message += "}";
        console.log(message);
    }
    getElement() { return this.element_; }
    getStyle() { return this.element_.style; }
    getBoundingClientRect() { return this.element_.getBoundingClientRect(); }
    getParentNode() { return (this.element_.parentNode); }
    getParent() { return this.parent_; }
    getChildren() { return this.children_; }
    appendChild(sprite) {
        if (sprite instanceof Sprite) {
            if (sprite.parent_ != null)
                console.error(`HTML element #${sprite.getId()} already has a parent.`);
            else {
                if (sprite.nativeParent_ == null)
                    this.element_.appendChild(sprite.element_);
                sprite.parent_ = this;
                this.children_.push(sprite);
                sprite.setId();
            }
        }
        else if (sprite instanceof HTMLElement)
            this.element_.appendChild(sprite);
    }
    removeChild(sprite) {
        if (sprite instanceof Sprite) {
            if (sprite.parent_ != this)
                console.error(`Attempt to remove HTML element #${sprite.getId()} from the wrong parent.`);
            else {
                if (sprite.nativeParent_ == null)
                    this.element_.removeChild(sprite.element_);
                sprite.parent_ = null;
                sprite.removeId();
                for (let i = 0; i < this.children_.length; ++i) {
                    if (this.children_[i] == sprite) {
                        let last = this.children_.pop();
                        if (i < this.children_.length)
                            this.children_[i] = last;
                        i = this.children_.length;
                    }
                }
            }
        }
        else if (sprite instanceof HTMLElement)
            this.element_.removeChild(sprite);
    }
    getX() { return this.x_; }
    getY() { return this.y_; }
    setX(x) {
        this.element_.style.left = x + "px";
        this.x_ = x;
    }
    setY(y) {
        this.element_.style.top = y + "px";
        this.y_ = y;
    }
    setXY(x, y) {
        this.element_.style.left = x + "px";
        this.element_.style.top = y + "px";
        this.x_ = x;
        this.y_ = y;
    }
    getWidth() { return this.width_; }
    getHeight() { return this.height_; }
    setWidth(width) {
        this.element_.style.width = width + "px";
        this.width_ = width;
        if (this.element_ instanceof HTMLCanvasElement)
            (this.element_).width = width;
    }
    setHeight(height) {
        this.element_.style.height = height + "px";
        this.height_ = height;
        if (this.element_ instanceof HTMLCanvasElement)
            (this.element_).height = height;
    }
    setDimension(width, height) {
        this.element_.style.width = width + "px";
        this.element_.style.height = height + "px";
        this.width_ = width;
        this.height_ = height;
        if (this.element_ instanceof HTMLCanvasElement) {
            (this.element_).width = width;
            (this.element_).height = height;
        }
    }
    getCenterX() { return (this.x_ + this.width_ / 2); }
    getCenterY() { return (this.y_ + this.height_ / 2); }
    getLeft() { return this.x_; }
    getRight() { return (this.x_ + this.width_); }
    getTop() { return this.y_; }
    getBottom() { return (this.y_ + this.height_); }
    getPoint() {
        return new Sprite.Point(this.x_ + this.width_ / 2, this.y_ + this.height_ / 2);
    }
    getRectangle() {
        return new Sprite.Rectangle(this.x_, this.y_, this.width_, this.height_);
    }
    getCircle(ratio = 1) {
        return new Sprite.Circle(this.x_ + this.width_ / 2, this.y_ + this.height_ / 2, ratio * this.width_ / 2);
    }
    setImage(url, width, height) {
        if (this.element_ instanceof HTMLImageElement) {
            (this.element_).src = url;
            this.setWidth(width);
            this.setHeight(height);
        }
    }
    getContext() {
        if (this.element_ instanceof HTMLCanvasElement)
            return (this.element_).getContext("2d");
        return null;
    }
    hide() { this.element_.style.visibility = "hidden"; }
    show() { this.element_.style.visibility = "visible"; }
    isVisible() { return (this.element_.style.visibility != "hidden"); }
    getRotation() { return this.rotation_; }
    setRotation(angle) {
        this.rotation_ = angle;
        this.element_.style.transform = "rotate(" + angle + "deg)";
    }
    setRotationPivot(x, y) {
        this.element_.style.transformOrigin = x + "px " + y + "px";
    }
    getOpacity() { return this.opacity_; }
    setOpacity(opacity) {
        this.opacity_ = opacity;
        this.element_.style.opacity = "" + this.opacity_;
    }
    addEventListener(type, action) {
        this.element_.addEventListener(type, action);
    }
    removeEventListener(type, action) {
        this.element_.removeEventListener(type, action);
    }
    scaledMouseX(x) { return x; }
    scaledMouseY(y) { return y; }
    follow(target, x, y, frequency) {
        return setInterval(() => { this.placeOnTarget(target, x, y); }, frequency);
    }
    placeOnTarget(target, x, y) {
        let distance = Math.sqrt(x * x + y * y);
        let angle1 = target.getRotation() / 180 * Math.PI;
        let angle2 = (y < 0 ? -Math.acos(x / distance) : Math.acos(x / distance));
        x = distance * Math.cos(angle1 + angle2);
        y = distance * Math.sin(angle1 + angle2);
        this.setX(target.getCenterX() - this.getWidth() / 2 + x);
        this.setY(target.getCenterY() - this.getHeight() / 2 + y);
    }
}
Sprite.counter_ = 0;
Sprite.instances_ = new Map();
(function (Sprite) {
    function collision(a, b) {
        if (a instanceof Circle) {
            if (b instanceof Circle)
                return collisionCircleCircle(a, b);
            else if (b instanceof Rectangle)
                return collisionCircleRectangle(a, b);
            else if (b instanceof Point)
                return collisionCirclePoint(a, b);
        }
        else if (a instanceof Rectangle) {
            if (b instanceof Circle)
                return collisionCircleRectangle(b, a);
            else if (b instanceof Rectangle)
                return collisionRectangleRectangle(a, b);
            else if (b instanceof Point)
                return collisionRectanglePoint(a, b);
        }
        else if (a instanceof Point) {
            if (b instanceof Circle)
                return collisionCirclePoint(b, a);
            else if (b instanceof Rectangle)
                return collisionRectanglePoint(b, a);
            else if (b instanceof Point)
                return collisionPointPoint(a, b);
        }
    }
    Sprite.collision = collision;
    class Shape {
    }
    Sprite.Shape = Shape;
    class Point extends Shape {
        constructor(x, y) {
            super();
            this.x_ = x;
            this.y_ = y;
        }
    }
    Sprite.Point = Point;
    class Circle extends Shape {
        constructor(centerX, centerY, radius) {
            super();
            this.cx_ = centerX;
            this.cy_ = centerY;
            this.radius_ = radius;
        }
    }
    Sprite.Circle = Circle;
    class Rectangle extends Shape {
        constructor(cornerX, cornerY, width, height) {
            super();
            this.x_ = cornerX;
            this.y_ = cornerY;
            this.width_ = width;
            this.height_ = height;
        }
    }
    Sprite.Rectangle = Rectangle;
    function collisionCircleRectangle(circle, rectangle) {
        let px = Math.max(rectangle.x_, Math.min(circle.cx_, rectangle.x_ + rectangle.width_));
        let py = Math.max(rectangle.y_, Math.min(circle.cy_, rectangle.y_ + rectangle.height_));
        let dx = px - circle.cx_;
        let dy = py - circle.cy_;
        let distance = dx * dx + dy * dy;
        let radius = circle.radius_ * circle.radius_;
        return (distance < radius);
    }
    function collisionCircleCircle(circle1, circle2) {
        let dx = circle1.cx_ - circle2.cx_;
        let dy = circle1.cy_ - circle2.cy_;
        let distance = dx * dx + dy * dy;
        let radius = circle1.radius_ + circle2.radius_;
        return (distance < radius * radius);
    }
    function collisionCirclePoint(circle, point) {
        let dx = point.x_ - circle.cx_;
        let dy = point.y_ - circle.cy_;
        let distance = dx * dx + dy * dy;
        let radius = circle.radius_ * circle.radius_;
        return (distance < radius);
    }
    function collisionRectangleRectangle(rectangle1, rectangle2) {
        return (rectangle1.x_ < rectangle2.x_ + rectangle2.width_
            && rectangle1.x_ + rectangle1.width_ > rectangle2.x_
            && rectangle1.y_ < rectangle2.y_ + rectangle2.height_
            && rectangle1.y_ + rectangle1.height_ > rectangle2.y_);
    }
    function collisionRectanglePoint(rectangle, point) {
        return (point.x_ >= rectangle.x_ && point.x_ <= rectangle.x_ + rectangle.width_
            && point.y_ >= rectangle.y_ && point.y_ <= rectangle.y_ + rectangle.height_);
    }
    function collisionPointPoint(point1, point2) {
        let dx = point1.x_ - point2.x_;
        let dy = point1.y_ - point2.y_;
        let distance = dx * dx + dy * dy;
        return (distance < 1);
    }
})(Sprite || (Sprite = {}));
