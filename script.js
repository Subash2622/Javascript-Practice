let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
  }

  init(paper) {
    // Handle dragging for touch devices
    paper.addEventListener("touchstart", (e) => this.startDrag(e, paper, true));
    paper.addEventListener("touchmove", (e) => this.drag(e, paper, true));
    paper.addEventListener("touchend", () => this.endDrag());

    // Handle dragging for mouse devices
    paper.addEventListener("mousedown", (e) => this.startDrag(e, paper, false));
    window.addEventListener("mousemove", (e) => this.drag(e, paper, false));
    window.addEventListener("mouseup", () => this.endDrag());

    // Handle rotation with right-click
    paper.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    window.addEventListener("mouseleave", () => this.endDrag());
  }

  startDrag(event, paper, isTouch) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ++;

    if (isTouch) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    } else {
      this.touchStartX = event.clientX;
      this.touchStartY = event.clientY;
    }
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  drag(event, paper, isTouch) {
    if (!this.holdingPaper) return;

    event.preventDefault();
    if (isTouch) {
      this.touchMoveX = event.touches[0].clientX;
      this.touchMoveY = event.touches[0].clientY;
    } else {
      this.touchMoveX = event.clientX;
      this.touchMoveY = event.clientY;
    }

    this.velX = this.touchMoveX - this.prevTouchX;
    this.velY = this.touchMoveY - this.prevTouchY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevTouchX = this.touchMoveX;
    this.prevTouchY = this.touchMoveY;

    paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
  }
}

document.querySelectorAll(".paper").forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
