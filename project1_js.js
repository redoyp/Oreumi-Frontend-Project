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

  setInterval(showNextSlide, 5000); // 3초마다 이미지 변경
});
