import { Item } from "./scripts/items.js";
import { preloadImages, createArray } from "./scripts/utils.js";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const cardWrapper = document.querySelector('.card-wrapper');

const cards = [];
[...document.querySelectorAll('.card')].forEach(card => {
  cards.push(new Item(card));
})

const order = createArray(cards.length)

class Home {
  constructor () {
    this.initAnimation();
    this.mouseInteraction();
  }

  initAnimation () {
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

      })
    })
  }

  mouseInteraction() {
    cardWrapper.addEventListener('mouseenter', (e) => {
      cards.forEach((card, i) => {
        gsap.to(card.DOM.el, {
          rotateY: (-i * 55) / 2,
          duration: 0.5,
          ease: "power2.out"
        })
      })
    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Home()
})