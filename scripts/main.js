// --- GSAP
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, CustomEase, DrawSVGPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --------------- CUSTOM EASE ---------------
CustomEase.create("ease-out-1", "0.25, 1, 0.5, 1");
CustomEase.create("ease-in-out-1", "0.87, 0, 0.13, 1");

// --- GLOBAL - RELOAD AT THE TOP
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- PAPER TIGET SIGNATURE
const pprtgr = [
  'color: #F2F3F3',
  'background: #080808',
  'font-size: 12px',
  'padding-left: 10px',
  'line-height: 2',
  'border-left: 5px solid #ff3c31',
].join(';');
console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);

// --------------- GLOBAL FADE ---------------
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");

  gsap.set(fadeElements, { opacity: 0, y: "5em" });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "ease-out-1",
        stagger: 0.15,
      }),
  });
}

// --- REVIEWS SLIDER
function reviewsSlider() {
  const slider = new Swiper(".swiper.reviews", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 500,
    loop: true,
    navigation: {
      nextEl: '.swiper-next.reviews',
      prevEl: '.swiper-prev.reviews',
    },
    pagination: {
      el: ".swiper-pagination.reviews",
      clickable: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
  });
}

// --------------- HEADER SCROLLED ---------------
function headerScrolled() {
  const header = document.querySelector(".c-header");

  if (!header) return;

  ScrollTrigger.create({
    trigger: "body",
    start: "100 top",
    onToggle: (self) => {
      if (self.isActive) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

function logosMarquee() {
  const marquee = document.querySelector(".c-marquee");
  if (!marquee) return;

  const marqueeItems = document.querySelectorAll(".c-img-contain.marquee-logo");
  if (marqueeItems.length <= 5) return;

  const marqueeList = document.querySelector(".c-marquee-list");

  if (marqueeList) {
    marqueeList.style.justifyContent = "flex-end";
    marqueeList.style.alignItems = "center";
    marqueeList.style.gridColumnGap = "0em";
    marqueeList.style.gridRowGap = "0em";
    marqueeList.style.flexGrow = "0";
    marqueeList.style.flexShrink = "0";
    marqueeList.style.flexBasis = "auto";
    marquee.style.display = "flex";
    marquee.style.justifyContent = "flex-end";
    marquee.style.alignItems = "center";
  }

  marqueeItems.forEach(item => {
    item.style.marginRight = "2.25em";
  });

  const duplicatedList = marqueeList.cloneNode(true);
  marquee.appendChild(duplicatedList);

  const marqueeDuration = window.innerWidth <= 479 ? marqueeItems.length * 1.8 : marqueeItems
    .length * 5;

  const tl = gsap.timeline();
  tl.to([marqueeList, duplicatedList], {
    xPercent: 100,
    duration: marqueeDuration,
    ease: "linear",
    repeat: -1
  });
}

function cardsMainLines() {

  const tl = gsap.timeline({
    defaults: {
      ease: "ease-out-1",
      duration: 3
    },
    scrollTrigger: {
      trigger: ".c-cards-lines",
      start: "top 80%",
    }
  });

  tl.fromTo("#card-main-1", { drawSVG: "0%" }, { drawSVG: "100%" });
  tl.fromTo("#card-main-2", { drawSVG: "0%" }, { drawSVG: "100%" }, "<0.2");
  tl.fromTo("#card-main-3", { drawSVG: "0%" }, { drawSVG: "100%" }, "<0.4");
  tl.fromTo("#card-main-4", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.2 }, "<");
  tl.fromTo("#card-main-5", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.2 }, "<");
}

// --- CARDS
function cardsAnimation() {

  const cards = document.querySelectorAll(".c-card");
  const card1 = document.querySelector(".c-card.is-1");
  const card1Line = card1.querySelector("#card-1-line");

  const tl = gsap.timeline({
    defaults: {
      ease: "ease-out-1",
      duration: 1.4
    },
    scrollTrigger: {
      trigger: ".c-cards-wrap",
      start: "top center",
      once: true,
    }
  });

  gsap.set(cards, { y: "6em", opacity: 0 });
  gsap.set("#card-4-circle", { transformOrigin: "center center" });

  tl.to(cards, {
    y: 0,
    opacity: 1,
    stagger: 0.4
  })

  tl.fromTo(card1Line, { drawSVG: "0%" }, { drawSVG: "100%", duration: 4 }, "<1");

  tl.fromTo(
    "#card-2-path-1", { clipPath: "inset(0% 0% 100% 0%)" }, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.4
    }, "<0.8");

  tl.fromTo(
    "#card-2-path-2", { clipPath: "inset(100% 0% 0% 0%)" }, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.4
    }, "<0.4");

  tl.from("#card-4-num", {
    y: "1em",
    opacity: 0,
    duration: 1
  }, "<0.2");

  tl.from("#card-4-circle", {
    scale: 0,
    duration: 1
  }, "<0.2");

  tl.from("#card-4-arrow", {
    y: "0.25em",
    opacity: 0,
    duration: 1
  }, "<0.2");
}

function circleAnimation() {
  const circles = document.querySelectorAll("[data-circle-animation='true']");
  if (circles.length === 0) return;

  circles.forEach(circle => {
    gsap.fromTo(circle, { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      ease: "ease-out-1",
      scrollTrigger: {
        trigger: circle,
        start: "top center",
        once: true,
      }
    });
  });
}

// --------------- VIMEO MODAL ---------------
function videoModals() {
  const triggers = document.querySelectorAll("[data-modal-trigger]");
  const body = document.querySelector("body");

  if (!triggers.length) return;

  triggers.forEach(trigger => {
    const modalId = trigger.getAttribute("data-modal-trigger");
    const modal = document.querySelector(`[data-modal-id='${modalId}']`);
    if (!modal) return;

    const iframe = modal.querySelector("iframe");
    const modalCloseBtn = modal.querySelector(".c-modal-close-btn");
    if (!iframe) return;

    const player = new Vimeo.Player(iframe);

    function openModal() {
      lenis.stop();
      modal.classList.add("is-open");
      player.play();
    }

    function closeModal() {
      lenis.start();
      modal.classList.remove("is-open");
      player.pause();
      body.classList.remove("no-scroll");
    }

    trigger.addEventListener("click", openModal);
    modalCloseBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  });
}

// --- FOOTER MARQUEE
function footerMarquee() {
  const marqueeRowOne = document.querySelector(".c-footer-marquee");
  const marqueeRowTwo = document.querySelector(".c-footer-marquee-reverse");

  if (!marqueeRowOne || !marqueeRowTwo) return;

  const marqueeRowOneList = marqueeRowOne.querySelector(".c-footer-marquee-list");
  const marqueeRowOneListDuplicated = marqueeRowOneList.cloneNode(true);

  marqueeRowOne.appendChild(marqueeRowOneListDuplicated);

  const marqueeRowTwoList = marqueeRowTwo.querySelector(".c-footer-marquee-list-reverse");
  const marqueeRowTwoListDuplicated = marqueeRowTwoList.cloneNode(true);

  marqueeRowTwo.appendChild(marqueeRowTwoListDuplicated);

  const marqueeDuration = window.innerWidth <= 479 ? 40 : 60;

  gsap.to([marqueeRowOneList, marqueeRowOneListDuplicated], {
    xPercent: 100,
    duration: marqueeDuration,
    ease: "linear",
    repeat: -1
  });

  gsap.to([marqueeRowTwoList, marqueeRowTwoListDuplicated], {
    xPercent: -100,
    duration: marqueeDuration,
    ease: "linear",
    repeat: -1
  });
}

// --- DATA GRAPH
function dataGraph() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".c-data-wrap",
      start: "top center",
      once: true,
    }
  });

  tl.from(".c-data-wrap div", {
      y: "4em",
      opacity: 0,
      stagger: 0.04,
      duration: 1.4,
      ease: "ease-out-1"
    })
    .add(() => {
      statsCounter();
    });
}

// --- GLOBAL - STATS COUNTER
function statsCounter() {
  document.querySelectorAll("[data-count-up='true']").forEach((element, index) => {
    let thisId = "countup" + index;
    element.setAttribute("id", thisId);

    let finalValue = element.getAttribute("final-number");
    let cleanValue = finalValue.replace(/,/g, "");
    let match = cleanValue.match(/^([\d.]+)(\D*)$/);

    if (match) {
      let numberPart = match[1];
      let endNumber = parseFloat(numberPart);
      let suffix = match[2] || "";

      let decimals = element.hasAttribute("decimals") ?
        +element.getAttribute("decimals") :
        numberPart.includes(".") ?
        numberPart.split(".")[1].length :
        0;

      let startNumber = 0;
      let duration = element.getAttribute("count-duration");
      let useCommas = finalValue.includes(",");

      let myCounter = new CountUp(
        thisId,
        startNumber,
        endNumber,
        decimals,
        duration,
        {
          suffix: suffix,
          useGrouping: useCommas,
          decimalPlaces: decimals,
        }
      );

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        onEnter: () => {
          gsap.to(element, {
            delay: index * 0.1,
            onStart: () => myCounter.start(),
          });
        },
      });
    } else {
      console.error(`Invalid final-number attribute: ${finalValue}`);
    }
  });
}

function hideHeaderCtaOnMobile() {
  gsap.to(".c-header .c-btn", {
    scrollTrigger: {
      trigger: ".c-section.hm-hero",
      start: "top top",
      end: "bottom top",
      onLeave: () => {
        gsap.to(".c-header .c-btn", { autoAlpha: 1, duration: 0.6, ease: "power3.inOut" });
      },
      onEnterBack: () => {
        gsap.to(".c-header .c-btn", { autoAlpha: 0, duration: 0.6, ease: "power3.inOut" });
      }
    }
  });

}

// --- INIT
function init() {
  reviewsSlider();
  headerScrolled();
  cardsAnimation();
  cardsMainLines();
  circleAnimation();
  videoModals();
  footerMarquee();
  dataGraph();
  statsCounter();
  fade();
}

init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  logosMarquee();
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  hideHeaderCtaOnMobile();
  return () => {
    //
  };
});
