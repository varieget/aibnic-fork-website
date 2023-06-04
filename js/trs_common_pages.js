function simplePage(dom, pageDom, isShowPage) {
  isShowPage = isShowPage || false;
  if (!dom || dom.length <= 0) {
    if (!isShowPage) {
      $("#pagination").hide();
    }
    return;
  }
  var arr = dom.html().split("</trs_page_separator>");
  var pages = arr.length;
  if (pages === 1 || pages === 0) {
    if (!isShowPage) {
      $("#pagination").hide();
    }
    return;
  }

  var index = window.location.href.split("#")[1] || 1;
  index = Number(index);
  $("#pagination").pagination({
    pageCount: pages,
    coping: true,
    activeCls: "on",
    current: index,
    endPage: pages,
    count: 14,
    prevContent: "<",
    nextContent: ">",
    callback: function (api) {
      // var index = api.getCurrent();
      var _index = api.getCurrent();
      $("#pagination a[data-page=" + _index + "]").click();
      location.hash = "#" + _index;
      location.hash = "#" + _index;
      $("#UCAP-CONTENT .view").html(arr[_index - 1]);

      $("#pagination").append(
        '<font href="javascript:;" class="all">余下全文</font>' +
          '<font href="javascript:;" class="alls">全文</font>'
      );
    },
  });
  $("#pagination").append(
    '<font href="javascript:;" class="all">余下全文</font>' +
      '<font href="javascript:;" class="alls">全文</font>'
  );

  $(document).on("click", "#pagination .all", function () {
    $("#UCAP-CONTENT .view").html("");
    var index = Number($("#pagination .on").text()) - 1;
    for (var i = index; i < arr.length; i++) {
      $("#UCAP-CONTENT .view").append(arr[i]);
    }
    $("#pagination").hide();
  });
  $(document).on("click", "#pagination .alls", function () {
    $("#UCAP-CONTENT .view").html("");
    for (var i = 0; i < arr.length; i++) {
      $("#UCAP-CONTENT .view").append(arr[i]);
    }
    $("#pagination").hide();
  });

  // 初始化
  $("#UCAP-CONTENT .view").html(arr[index - 1]);
  if (location.hash === "") {
    location.hash = "#1";
    location.hash = "#1";
  }
}
