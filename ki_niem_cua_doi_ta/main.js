
document.addEventListener("DOMContentLoaded", () => {

    const home = document.getElementById("home");
    const letter = document.getElementById("letterScreen");
    const vutru = document.querySelector(".vutru");

    const openEnvelope = document.getElementById("openEnvelope");
    const toGallery = document.getElementById("toGallery");

    function showScreen(screen) {

        // Ẩn màn hình phong thư + bức thư
        if (home) {
            home.classList.remove("active");
        }

        if (letter) {
            letter.classList.remove("active");
        }

        // Hiện màn hình được chọn
        if (screen) {
            screen.classList.add("active");
        }
    }
    function startMusic() {

        const music = document.getElementById("music");

        if (!music) return;

        music.volume = 0.35;

        music.play().catch(() => {
            console.log("Trình duyệt đang chặn phát nhạc tự động.");
        });
    }


    function openLetter() {

        showScreen(letter);

        // Bắt đầu nhạc sau thao tác người dùng
        startMusic();
    }

    // Nhấn chuột
    if (openEnvelope) {
        openEnvelope.addEventListener("click", openLetter);

        // Nhấn Enter hoặc Space
        openEnvelope.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                openLetter();
            }
        });
    }
// mở vũ trụ
    if (toGallery) {
    toGallery.addEventListener("click", () => {

        // Ẩn bức thư
        if (letter) {
            letter.classList.remove("active");
        }

        // Hiện vũ trụ
        if (vutru) {
            vutru.style.display = "block";
            vutru.classList.add("active");
        }

        // Cho Three.js cập nhật lại kích thước
        window.dispatchEvent(new Event("resize"));
    });
}

    // =========================================================
    // TIM BAY
    // =========================================================
    function createHeart() {

        const heartsContainer = document.getElementById("hearts");

        if (!heartsContainer) return;

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            Math.random() > 0.35 ? "♥" : "❤";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            (12 + Math.random() * 22) + "px";

        heart.style.animationDuration =
            (5 + Math.random() * 7) + "s";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 13000);
    }

    // Tạo tim liên tục
    setInterval(createHeart, 650);

});