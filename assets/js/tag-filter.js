// 태그 필터링 기능
$(document).ready(function() {
  console.log("태그 필터링 스크립트 로드됨");

  // 태그 필터링 기능
  $("#tag-filter-buttons .btn").click(function() {
    console.log("버튼 클릭됨:", $(this).data("tag"));

    var selectedTag = $(this).data("tag");

    // 활성화된 버튼 스타일 변경
    $("#tag-filter-buttons .btn").removeClass("active");
    $(this).addClass("active");

    // 포스트 필터링
    if (selectedTag === "all") {
      $(".post-item").show();
    } else {
      $(".post-item").each(function() {
        var postTags = $(this).data("tags");
        if (postTags && postTags.indexOf(selectedTag) >= 0) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }

    return false; // 이벤트 전파 방지
  });
});
