$(document).on("keydown", function (event) {
  if (event.key) {
    if (
      (event.key === "p" && event.ctrlKey) ||
      (event.keyCode === 80 && event.ctrlKey)
    ) {
      event.preventDefault();
      forPrintEventListenerFn("beforeprint");
      return;
    }
  }
});

//为了打印时候，正文字体同比放大
function forPrintFontSizeFn(beforeprint) {
  var oldHTMLStr = $("#UCAP-CONTENT").html();
  if ($("#UCAP-CONTENT-FORPRINT").length === 0) {
    $("#UCAP-CONTENT").after('<div id="UCAP-CONTENT-FORPRINT"></div>');
  }

  if (beforeprint === "beforeprint") {
    $("#UCAP-CONTENT-FORPRINT").show().html(oldHTMLStr);
  } else {
    $("#UCAP-CONTENT-FORPRINT")
      .hide()
      .html(oldHTMLStr)
      .attr("class", $("#UCAP-CONTENT").attr("class"));
    $("#UCAP-CONTENT-FORPRINT #player_video").html("");
    $("#UCAP-CONTENT-FORPRINT #player_video").remove();
  }

  //遍历所有末端叶子元素，并改变字号
  // function traverseAllEndChildEleFn(eleOP){
  //   var _oldFontSize = $(eleOP).css('font-size');
  //   var _newFontSize = parseInt(_oldFontSize)+10;
  //   var _oldStyleVale = $(eleOP).attr('style');
  //   $(eleOP).css('cssText',_oldStyleVale+';'+'font-size:'+_newFontSize+'px !important');
  //   if($(eleOP).children().length>0){
  //     $(eleOP).children().each(function(i,o){
  //       traverseAllEndChildEleFn(o)
  //     });
  //   }
  // }

  function _setFn(eleOP) {
    var _oldStyleVale = eleOP.attr("style");
    if (eleOP.find("img").length === 0) {
      eleOP.css("cssText", _oldStyleVale + ";" + "zoom:1.4");
    } else {
      eleOP.find("img").get(0).onload = function () {
        var _thisImgWidth = eleOP.find("img").get(0).width;
        var _thisImgHeight = eleOP.find("img").get(0).height;
        eleOP.height(_thisImgHeight);
        eleOP.find("img").css({
          position: "absolute",
          left: "50%",
          "margin-left": -(_thisImgWidth / 2),
        });
      };
    }
  }

  //如果有 .trs_paper_default 元素的话
  if ($("#UCAP-CONTENT-FORPRINT .trs_paper_default").length > 0) {
    $("#UCAP-CONTENT-FORPRINT .trs_paper_default>*").each(function (i, o) {
      _setFn($(o));
    });
  } else {
    $("#UCAP-CONTENT-FORPRINT>*").each(function (i, o) {
      _setFn($(o));
    });
  }
}
forPrintFontSizeFn();

//恢复到正常细览
function returnNotPrintStateFn() {
  $("body").removeClass("printing");
  $("#UCAP-CONTENT").show();
  $("#UCAP-CONTENT-FORPRINT").hide();
  switch ($(".index_switchsize span.on").index()) {
    case 0:
      $("body").removeClass("printingFontSizeDefault");
      break;
    case 1:
      $("body").removeClass("printingFontSizeBig");
      break;
    case 2:
      $("body").removeClass("printingFontSizeBigger");
      break;
  }

  // $('.locationHref').hide();
}

//是否隐藏图片及图片说明
function isPrintPictureAndCaptionFn() {
  var isFunctionPlay = false;
  if ($("#UCAP-CONTENT img").length > 0) {
    isFunctionPlay = true;
  }

  //查看是否有 隐藏的图片，正文中有隐藏图片，忽略掉
  if ($("#UCAP-CONTENT img").length > 0) {
    var imgParentArr = [];
    $("#UCAP-CONTENT img").each(function (i, o) {
      if ($(o).parent().is(":hidden")) {
        imgParentArr.push("none");
      } else {
        imgParentArr.push("block");
      }
    });
    isFunctionPlay = imgParentArr.some(function (o, i) {
      return o === "block";
    });
  }

  if (!isFunctionPlay) {
    return;
  }

  $("#UCAP-CONTENT-FORPRINT img").each(function (i, o) {
    $(this).parents("p").removeClass("docImgEleO");
  });
}

function forPrintEventListenerFn(flag) {
  if (flag === "beforeprint") {
    clearTimeout(forPrintEventListenerFn.timer1);

    forPrintFontSizeFn("beforeprint");
    isPrintPictureAndCaptionFn();
    $("body").addClass("printing");
    $("#UCAP-CONTENT").hide();
    $("#UCAP-CONTENT-FORPRINT").show();
    switch ($(".index_switchsize span.on").index()) {
      case 0:
        $("body").addClass("printingFontSizeDefault");
        break;
      case 1:
        $("body").addClass("printingFontSizeBig");
        break;
      case 2:
        $("body").addClass("printingFontSizeBigger");
        break;
    }
    // $('.locationHref').text(decodeURI(location.href)).show();

    //为兼容图片回流过程中出现错误
    forPrintEventListenerFn.timer1 = setTimeout(function () {
      print();
      forPrintEventListenerFn.timer = setTimeout(function () {
        returnNotPrintStateFn();
      }, 200);
    }, 100);
  } else if (flag === "afterprint") {
    returnNotPrintStateFn();
  }
}
// $(window).on('beforeprint',function(){
//   forPrintEventListenerFn('beforeprint');
// });
$(window).on("afterprint", function () {
  forPrintEventListenerFn("afterprint");
});
