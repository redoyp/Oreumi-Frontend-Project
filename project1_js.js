// DOM이 완전히 로드된 후에 실행되는 코드 블록
document.addEventListener("DOMContentLoaded", () => {

  // 슬라이드 이미지들을 모두 선택하여 slides 변수에 저장
  const slides = document.querySelectorAll(".slide");

  // 현재 보이는 이미지의 인덱스, 처음에는 0번 이미지
  let currentIndex = 0;

  // 슬라이드를 전환하는 함수
  function showNextSlide() {
    // 현재 보이는 이미지 (현재 인덱스에 해당하는 이미지)
    const currentSlide = slides[currentIndex];

    // 다음 이미지의 인덱스를 계산 (순환되도록)
    // 마지막 이미지를 지나면 첫 번째 이미지로 돌아가게 설정
    const nextIndex = (currentIndex + 1) % slides.length;

    // 다음 이미지 (다음 인덱스에 해당하는 이미지)
    const nextSlide = slides[nextIndex];

    // 현재 이미지에서 'active' 클래스를 제거하고 'next' 클래스를 추가하여 화면에서 밀어냄
    currentSlide.classList.remove("active");
    currentSlide.classList.add("next");

    // 다음 이미지에 'active' 클래스를 추가하여 화면에 보이게 하고,
    // 'next' 클래스는 제거하여 자연스럽게 애니메이션되도록 함
    nextSlide.classList.add("active");
    nextSlide.classList.remove("next");

    // 현재 인덱스를 업데이트하여 다음 슬라이드를 가리키게 설정
    currentIndex = nextIndex;
  }

  // 3초마다 showNextSlide 함수 실행 (슬라이드 전환)
  setInterval(showNextSlide, 5000); // 5초마다 이미지 변경
});
