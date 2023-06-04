$(function () {
  //字体大中小
  $(".index_switchsize span").click(function () {
    //获取para的字体大小
    var thisEle = $(
      ".pages_content p,.pages_content,.pages_content font,.pages_content span,.pages_content div"
    ).css("font-size");
    //parseFloat的第二个参数表示转化的进制，10就表示转为10进制
    var textFontSize = parseFloat(thisEle, 10);
    //javascript自带方法
    var unit = thisEle.slice(-2); //获取单位
    var cName = $(this).attr("class");
    if (cName.indexOf("bigger") != -1) {
      textFontSize = 30;
      $(this).addClass("on").siblings().removeClass("on");
    } else if (cName.indexOf("big") != -1) {
      textFontSize = 25;
      $(this).addClass("on").siblings().removeClass("on");
    } else if (cName.indexOf("default") != -1) {
      //   textFontSize = 16;
      location.reload();
      $(this).addClass("on").siblings().removeClass("on");
    }
    //设置para的字体大小
    $(
      ".pages_content p,.pages_content,.pages_content font,.pages_content span,.pages_content div"
    ).css("font-size", textFontSize + unit);
  });

  $(".index_switchsize .default").click(function () {
    $(
      ".pages_content p,.pages_content,.pages_content font,.pages_content span,.pages_content div"
    ).css("font-size", "16px");
  });

  //打印
  var printAreaCount = 0;
  var removePrintArea = function (id) {
    $("iframe#" + id).remove();
  };
  $.fn.printArea = function () {
    var ele = $(this);
    var idPrefix = "printArea_";
    removePrintArea(idPrefix + printAreaCount);
    printAreaCount++;
    var iframeId = idPrefix + printAreaCount;
    var iframeStyle =
      "position:absolute;width:0px;height:0px;left:-500px;top:-500px;";
    iframe = document.createElement("IFRAME");
    $(iframe).attr({
      style: iframeStyle,
      id: iframeId,
    });
    document.body.appendChild(iframe);
    var doc = iframe.contentWindow.document;
    $(document)
      .find("link")
      .filter(function () {
        return (
          $(this).attr("rel").toLowerCase() == "stylesheet" &&
          $(this).attr("href").indexOf("mobile") <= 0
        );
      })
      .each(function () {
        doc.write(
          '<link type="text/css" rel="stylesheet" href="' +
            $(this).attr("href") +
            '"/>'
        );
      });
    $("style").each(function () {
      doc.write("<style>" + $(this).html() + "</style>");
    });
    doc.write(
      '<div class="' +
        $(ele).attr("class") +
        '" style="width: ' +
        $(ele).width() +
        'px">' +
        $(ele).html() +
        "</div>"
    );
    $("[data-print=js]").each(function () {
      doc.write(
        '<script type="text/javascript" src="' +
          $(this).attr("src") +
          '"></script>'
      );
    });
    doc.close();
    var frameWindow = iframe.contentWindow;
    frameWindow.close();
    frameWindow.focus();
    setTimeout(function () {
      frameWindow.print();
    }, 500);
  };
  $(".customPrintIco").click(function () {
    $(".printArea").printArea();
  });

  var list01li = $(".list01 li");
  var li_len = list01li.length;
  if (li_len == 0) $(".xg-list").hide();

  $(".pages_content img").parent("span").css("text-indent", 0);
});
