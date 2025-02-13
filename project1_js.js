/* 슬라이드 js */

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");

  let currentIndex = 0;

  function showNextSlide() {
    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    currentSlide.classList.remove("active");
    currentSlide.classList.add("next");

    nextSlide.classList.add("active");
    nextSlide.classList.remove("next");

    currentIndex = nextIndex;
  }

  setInterval(showNextSlide, 5000);
});


/* search about 눌렀을 때 투명화 */

document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.querySelector(".about");
  const searchBtn = document.querySelector(".search");
  const mainPicture = document.querySelector(".mainPicture");

  function toggleOverlay(showSearch) {
    const isTransparent = mainPicture.classList.contains("transparent");

    if (isTransparent) {
      // 투명화 해제 (애니메이션 추가)
      mainPicture.classList.remove("transparent");
      mainPicture.classList.add("visible");

      setTimeout(() => {
        mainPicture.classList.remove("visible"); // 원래 상태로
      }, 500); // 투명화 해제 애니메이션 지속시간
    } else {
      // 투명화 적용 및 해당 요소 표시
      mainPicture.classList.add("transparent");
    }
  }

  searchBtn.addEventListener("click", () => toggleOverlay(true));
  aboutBtn.addEventListener("click", () => toggleOverlay(false));
});
