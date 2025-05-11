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

      console.log("태그 버튼 클릭됨");

      const selectedTag = this.getAttribute("data-tag");
      console.log("선택된 태그:", selectedTag);

      // 활성화된 버튼 스타일 변경
      filterButtons.forEach(function(btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");

      // 포스트 필터링
      if (selectedTag === "all") {
        console.log("모든 포스트 표시");
        postItems.forEach(function(item) {
          item.style.display = "flex";
        });
      } else {
        postItems.forEach(function(item) {
          const postTags = item.getAttribute("data-tags") || "";
          console.log("포스트 태그:", postTags, "선택된 태그:", selectedTag);

          // 공백으로 구분된 태그 문자열을 배열로 변환하여 정확히 비교
          const tagsArray = postTags.trim().split(/\s+/);

          if (tagsArray.includes(selectedTag)) {
            item.style.display = "flex";
            console.log("포스트 표시:", item.querySelector("a").textContent);
          } else {
            item.style.display = "none";
            console.log("포스트 숨김:", item.querySelector("a").textContent);
          }
        });
      }
    });
  });

  // 페이지 로드 시 콘솔에 모든 포스트 아이템의 태그 정보 출력 (디버깅용)
  console.log("현재 페이지의 모든 포스트 아이템과 태그:");
  postItems.forEach(function(item) {
    const title = item.querySelector("a").textContent;
    const tags = item.getAttribute("data-tags") || "태그 없음";
    console.log(`포스트: "${title}", 태그: "${tags}"`);
  });
});
