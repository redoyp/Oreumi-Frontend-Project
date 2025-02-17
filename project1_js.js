// 슬라이드 js

document.addEventListener("DOMContentLoaded", () => {
  const mainPicture = document.querySelector(".mainPicture");
  let slides = [];
  let currentIndex = 0;

  // JSON 파일에서 이미지 목록 불러오기
  fetch("./images.json")
    .then((response) => response.json())
    .then((data) => {
      slides = data.images.map((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("slide");
        if (index === 0) img.classList.add("active");
        mainPicture.appendChild(img);
        return img;
      });

      setInterval(showNextSlide, 6000);
    })
    .catch((error) => console.error("JSON 로드 오류:", error));

  function showNextSlide() {
    if (slides.length === 0) return;

    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    currentSlide.classList.remove("active");
    currentSlide.classList.add("next");

    nextSlide.classList.add("active");
    nextSlide.classList.remove("next");

    currentIndex = nextIndex;
  }
});



// search about 눌렀을 때 투명화

document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.querySelector(".about");
  const searchBtn = document.querySelector(".search");
  const mainPicture = document.querySelector(".mainPicture");

  const searchBox = document.querySelector(".searchBox");
  const aboutBox = document.querySelector(".aboutBox");


  let currentMode = null; // 현재 활성화된 모드 (null, "search", "about")

  function showMenu(mode) {
    if (currentMode === mode) {
      // 현재 상태에서 같은 버튼을 한 번 더 누르면 투명화 해제
      mainPicture.classList.remove("invisible");
      mainPicture.classList.add("visible");

      setTimeout(() => {
        mainPicture.classList.remove("visible");
        searchBox.classList.remove("active");
        aboutBox.classList.remove("active");
      }, 500);

      currentMode = null; // 모드 초기화
    } else {
      // 다른 모드를 누른 경우, 새 모드 적용
      mainPicture.classList.remove("visible");
      mainPicture.classList.add("invisible");

      setTimeout(() => {
        if (mode === "search") {
          searchBox.classList.add("active");
          aboutBox.classList.remove("active");
        } else {
          aboutBox.classList.add("active");
          searchBox.classList.remove("active");
        }
      }, 300); // 투명화가 적용된 후 컨텐츠 표시

      currentMode = mode; // 현재 모드 업데이트
    }
  }

  searchBtn.addEventListener("click", () => showMenu("search"));
  aboutBtn.addEventListener("click", () => showMenu("about"));
});



// 갤러리

async function loadImages() {
  try {
    const response = await fetch("./images.json");
    const data = await response.json();
    const gallery = document.getElementById("gallery");

    data.images.forEach(imagePath => {
      const imageBox = document.createElement("div");
      imageBox.classList.add("image-box");

      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = extractTitle(imagePath);

      const title = document.createElement("p");
      title.classList.add("title");
      title.textContent = extractTitle(imagePath);

      const location = document.createElement("p");
      location.classList.add("location");
      location.textContent = extractLocation(imagePath);

      imageBox.appendChild(img);
      imageBox.appendChild(title);
      imageBox.appendChild(location);
      gallery.appendChild(imageBox);
    });

  } catch (error) {
    console.error("이미지를 불러오는 중 오류 발생:", error);
  }
}

// 파일명에서 '이름' 추출 (예: "경복궁")
function extractTitle(imagePath) {
  const filename = imagePath.split("/").pop().replace(".jpg", "");
  return filename.split("_")[1]; // "_" 기준으로 두 번째 요소 (이름)
}

// 파일명에서 '지역' 추출 (예: "서울")
function extractLocation(imagePath) {
  const filename = imagePath.split("/").pop().replace(".jpg", "");
  return filename.split("_")[0]; // "_" 기준으로 첫 번째 요소 (지역)
}

loadImages();
