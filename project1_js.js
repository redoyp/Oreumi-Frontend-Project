// 슬라이드 js

document.addEventListener("DOMContentLoaded", () => {
  const mainPicture = document.querySelector(".mainPicture");
  let slides = [];
  let currentIndex = 0;

  // JSON 파일에서 이미지 목록 불러오기
  fetch("./slide.json")
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



// 갤러리 (스크롤 시 20개씩 로드)
let allImages = []; // 전체 이미지 배열
let filteredImages = []; // 필터링된 이미지 배열 (지역별 검색)
let loadedImages = 0; // 현재 로드된 이미지 개수
const imagesPerLoad = 20; // 한 번에 로드할 이미지 개수
const gallery = document.getElementById("gallery");

// json 에서 이미지 목록 불러오기
async function fetchImages() {
  try {
    const response = await fetch("./images.json");
    const data = await response.json();
    allImages = data.images;
    filteredImages = allImages;
    loadedImages = 0; // 초기화
    gallery.innerHTML = ""; // 기존 이미지 초기화
    loadMoreImages();
  } catch (error) {
    console.error("이미지를 불러오는 중 오류 발생:", error);
  }
}

// 지역명으로 필터링된 이미지 로드
function searchByRegion(region) {
  if (region.trim() === "") {
    filteredImages = allImages; // 검색어가 비어 있으면 전체 이미지로 초기화
  } else {
    // 지역명으로 필터링 (파일명에서 지역명을 추출하여 비교)
    filteredImages = allImages.filter(imagePath => extractLocation(imagePath).includes(region));
  }

  loadedImages = 0; // 초기화
  gallery.innerHTML = ""; // 기존 이미지 초기화
  loadMoreImages();
}

// 20개씩 이미지 추가 로드
function loadMoreImages() {
  const nextImages = filteredImages.slice(loadedImages, loadedImages + imagesPerLoad);

  nextImages.forEach(imagePath => {
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    const img = document.createElement("img");
    img.src = imagePath;

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

    // 이미지가 로드된 후 애니메이션 클래스를 추가
    img.onload = () => {
      imageBox.classList.add("visible");
    };
  });

  loadedImages += imagesPerLoad;
}

// 스크롤 이벤트 감지 (끝까지 내렸을 때 추가 로드)
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    if (loadedImages < filteredImages.length) {
      loadMoreImages();
    }
  }
});

// 파일명에서 '이름' 추출 (예: "경복궁")
function extractTitle(imagePath) {
  const filename = imagePath.split("/").pop().replace(".jpg", "");
  return filename.split("_")[1];
}

// 파일명에서 '지역' 추출 (예: "서울")
function extractLocation(imagePath) {
  const filename = imagePath.split("/").pop().replace(".jpg", "");
  return filename.split("_")[0];
}

// search 버튼 클릭 시 지역 검색
document.querySelector(".searchButton").addEventListener("click", () => {
  const searchPlace = document.querySelector(".searchPlace").value.trim();
  searchByRegion(searchPlace); // 지역 검색 함수 호출
});

// Enter 키 입력 시 지역 검색
document.querySelector(".searchPlace").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchPlace = document.querySelector(".searchPlace").value.trim();
    searchByRegion(searchPlace); // 지역 검색 함수 호출
  }
});

fetchImages(); // 초기 실행



// 모달창
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const close = document.querySelector(".close");

// 갤러리 이미지 클릭 시 모달 표시
gallery.addEventListener("click", (event) => {
  // 클릭된 요소의 가장 가까운 ".image-box" 찾기
  const imageBox = event.target.closest(".image-box");
  if (!imageBox) return; // 클릭된 요소가 이미지 박스가 아니면 종료

  const img = imageBox.querySelector("img"); // 이미지 태그
  const title = imageBox.querySelector(".title").textContent; // 제목
  const location = imageBox.querySelector(".location").textContent; // 지역

  modalImage.src = img.src;
  modalTitle.textContent = title;
  modalLocation.textContent = location;

  modal.style.display = "flex";
});

// 닫기 버튼 클릭 시 모달 닫기
close.addEventListener("click", () => {
  modal.style.display = "none";
});

// 모달 바깥 부분 클릭 시 닫기
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
