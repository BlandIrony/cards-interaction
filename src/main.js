import { Item } from "./scripts/items.js";
import { preloadImages, createArray } from "./scripts/utils.js";
import { gsap } from "gsap";

const cardWrapper = document.querySelector('.card-wrapper');

const cards = [];
[...document.querySelectorAll('.card')].forEach(card => {
  cards.push(new Item(card));
})

const order = createArray(cards.length)

class Home {
  constructor () {
    this.initAnimation();
    this.initialYValue = null;
    this.isCompleted = false;
  }

  initAnimation () {
    let completedCount = 0;
    
    cards.forEach((card, i) => {
      gsap.set(card.DOM.el, { autoAlpha: 0, y: 600, force3D: true })
      let pos = order.indexOf(i);

      gsap.to(card.DOM.el, {
        y: -i * 30,
        z: -i * 100,
        autoAlpha: 1,
        zIndex: cards.length - pos,
        duration: 1.5,
        ease: "elastic.out",
        delay: i * 0.04,
        onComplete: () => {
          completedCount++;
          if (completedCount === cards.length) {
            this.mouseInteraction()
          }
        }
      })
    })
  }

  mouseInteraction() {
    if (this.isCompleted) return;

    const hoverTimeline = gsap.timeline({ paused: true });

    hoverTimeline.to(cardWrapper, {
      scale: 1.1,
      transformOrigin: '50% 50%',
      duration: 0.2,
      ease: "power2.inOut"
    }, 0);

    cards.forEach((card, i) => {
      hoverTimeline.to(card.DOM.el, {
        rotateY: -40,
        x: i * 100,
        y: -i * 2,
        z: -i * 50,
        duration: 0.5,
        ease: "power2.inOut"
      }, "<0.015");
    });

    cardWrapper.addEventListener("mouseenter", () => hoverTimeline.play());
    cardWrapper.addEventListener("mouseleave", () => hoverTimeline.reverse());
    
    cards.forEach((card) => {
      card.DOM.el.addEventListener('mouseenter', () => {
        this.showPrice(card);
      })
      card.DOM.el.addEventListener('mouseleave', () => {
        this.hidePrice(card);
      })
    })
  }

  showPrice(card) {
    this.initialYValue = gsap.getProperty(card.DOM.el, "y")
    
    gsap.to(card.DOM.el, {
      y: -45,
    })
    gsap.to(card.DOM.price, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
  }

  hidePrice(card) {
    gsap.to(card.DOM.el, {
      y: this.initialYValue,
    })
    gsap.to(card.DOM.price, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.inOut"
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Home()
})