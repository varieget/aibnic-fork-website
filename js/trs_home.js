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

  function Tabs(dom) {
    let index = null;
    $(dom + " .nav").on("mouseover", "span", function () {
      index = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(dom)
        .find(".ctx .item")
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
    });
  }

  return {
    init() {
      nFocus();
      nFocus2();
      Tabs(".tabs");
    },
  };
})();
