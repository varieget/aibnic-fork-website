const trs_home = (() => {
  function nFocus2() {
    // 互联网+督查和政策问答平台轮播
    const sliderElement = $(".item_slider");
    sliderElement.slidesjs({
      // width: 240,
      // height: 528,
      play: {
        auto: true,
        effect: "fade",
      },
      navigation: {
        effect: "fade",
      },
      pagination: {
        effect: "fade",
      },
      effect: {
        slide: {
          speed: 400,
        },
      },
    });
    const slidernav = sliderElement.find(".slidesjs-navigation");
    slidernav.hide();
    sliderElement.hover(
      () => slidernav.stop().show(),
      () => slidernav.stop().hide()
    );

    slidernav.hover(
      () => $(this).show(),
      () => $(this).show()
    );
  }

  function nFocus() {
    const sliderElement = $(".news_slider");
    sliderElement.slidesjs({
      // width: 240,
      // height: 528,
      play: {
        auto: true,
        effect: "fade",
      },
      navigation: {
        effect: "fade",
      },
      pagination: {
        effect: "fade",
      },
      effect: {
        slide: {
          speed: 400,
        },
      },
    });
    const slidernav = sliderElement.find(".slidesjs-navigation");
    slidernav.hide();
    sliderElement.hover(
      () => slidernav.stop().show(),
      () => slidernav.stop().hide()
    );

    slidernav.hover(
      () => $(this).show(),
      () => $(this).show()
    );
  }

  function focus(dom) {
    const mySwiper = new Swiper(dom + " .swiper-container", {
      progress: false,
      loop: true,
      autoplay: 5000,
      pagination: dom + " .pagination",
      paginationClickable: true,
      onProgressChange(swiper) {
        for (let i = 0; i < swiper.slides.length; i++) {
          let slide = swiper.slides[i];
          let progress = slide.progress;
          let translate = progress * swiper.width;
          let opacity = 1 - Math.min(Math.abs(progress), 1);
          slide.style.opacity = opacity;
          swiper.setTransform(slide, "translate3d(" + translate + "px,0,0)");
        }
      },
      onTouchStart(swiper) {
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.setTransition(swiper.slides[i], 0);
        }
      },
      onSetWrapperTransition(swiper, speed) {
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.setTransition(swiper.slides[i], speed);
        }
      },
    });
    $(dom + " .arrow-left").on("click", (e) => {
      e.preventDefault();
      mySwiper.swipePrev();
    });
    $(dom + " .arrow-right").on("click", (e) => {
      e.preventDefault();
      mySwiper.swipeNext();
    });
  }

  return {
    init() {
      // focus('.news')
      nFocus();
      nFocus2();
      // focus('.state')
      focus(".banner1");
      focus(".banner2");
      focus(".banner3");
    },
  };
})();
