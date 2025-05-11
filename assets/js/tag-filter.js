// 태그 필터링 기능
document.addEventListener('DOMContentLoaded', function() {
  console.log("태그 필터링 스크립트 로드됨");

  // 모든 필터 버튼 찾기
  const filterButtons = document.querySelectorAll("#tag-filter-buttons .btn");
  const postItems = document.querySelectorAll(".post-item");

  // 각 버튼에 클릭 이벤트 추가
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const selectedTag = this.getAttribute("data-tag");
      console.log("버튼 클릭됨:", selectedTag);

      // 활성화된 버튼 스타일 변경
      filterButtons.forEach(function(btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // 포스트 필터링
      if (selectedTag === "all") {
        postItems.forEach(function(item) {
          item.style.display = "flex";
        });
      } else {
        postItems.forEach(function(item) {
          const postTags = item.getAttribute("data-tags") || "";
          if (postTags.includes(selectedTag)) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
  });
});
