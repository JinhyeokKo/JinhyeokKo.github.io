// 태그 필터링 기능
document.addEventListener('DOMContentLoaded', function() {

  // 모든 필터 버튼 찾기
  const filterButtons = document.querySelectorAll("#tag-filter-buttons .btn");
  const postItems = document.querySelectorAll(".post-item");

  // 각 버튼에 클릭 이벤트 추가
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();


      const selectedTag = this.getAttribute("data-tag");

      // 활성화된 버튼 스타일 변경
      filterButtons.forEach(function(btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // 포스트 필터링
      if (selectedTag === "all") {
        postItems.forEach(function(item) {
          item.classList.remove("hidden");
          item.style.display = "";  // 기본 표시 스타일로 복원
        });
      } else {
        postItems.forEach(function(item) {
          const postTags = item.getAttribute("data-tags") || "";

          // 공백으로 구분된 태그 문자열을 배열로 변환하여 정확히 비교
          const tagsArray = postTags.trim().split(/\s+/);

          if (tagsArray.includes(selectedTag)) {
            item.classList.remove("hidden");
            item.style.display = "";  // 기본 표시 스타일로 복원
          } else {
            item.classList.add("hidden");
            item.style.display = "none !important";  // !important 추가
          }
        });
      }

    });
  });
});
