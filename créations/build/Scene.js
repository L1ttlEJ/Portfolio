"use strict";
class Scene extends Sprite {
    constructor(element, resize) {
        super(element);
        this.resize_ = resize;
        this.scale_ = 1;
        let box = this.getParentNode().getBoundingClientRect();
        this.setDimension(640, 480);
        this.setX((box.width - this.getWidth()) / 2);
        this.setY((box.height - this.getHeight()) / 2);
    }
    isFullscreen() { return (document.fullscreenElement != null); }
    toggleFullscreen(event) {
        if (this.isFullscreen()) {
            this.getElement().className = "";
            document.exitFullscreen();
        }
        else {
            this.getElement().className = "fullscreen";
            document.body.requestFullscreen();
        }
        event.stopPropagation();
    }
    resize() {
        let space = (this.isFullscreen() ? 0 : 50);
        let box = this.getParentNode().getBoundingClientRect();
        let rx = this.getWidth() / (box.width - space);
        let ry = this.getHeight() / (box.height - space);
        let s = 1 / Math.max(rx, ry);
        if (this.resize_ || this.isFullscreen()) {
            this.getStyle().transform = "scale(" + s + ")";
            this.scale_ = s;
        }
        else {
            this.getStyle().transform = "";
            this.scale_ = 1;
        }
        this.setX((box.width - this.getWidth()) / 2);
        this.setY((box.height - this.getHeight()) / 2);
    }
    scaledMouseX(x) {
        return (this.getCenterX() + (x - this.getCenterX()) / this.scale_);
    }
    scaledMouseY(y) {
        return (this.getCenterY() + (y - this.getCenterY()) / this.scale_);
    }
    start() { }
    pause() { }
    unpause() { }
    clean() {
        while (this.getChildren().length > 0)
            this.removeChild(this.getChildren()[0]);
    }
    restart() {
        this.pause();
        this.clean();
        this.start();
    }
}
