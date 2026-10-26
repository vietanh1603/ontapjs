import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x01020a);
scene.fog = new THREE.FogExp2(0x01020a, 0.018);

const camera = new THREE.PerspectiveCamera(
    58,
    innerWidth / innerHeight,
    0.1,
    200,
);
camera.position.set(0, 3.5, 24);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
const universe = document.querySelector(".vutru");

if (!universe) {
    console.error("Không tìm thấy .vutru");
} else {
    universe.appendChild(renderer.domElement);
}

renderer.domElement.style.position = "absolute";
renderer.domElement.style.inset = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "0";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.035;
controls.minDistance = 8;
controls.maxDistance = 45;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.18;
controls.enablePan = false;

scene.add(new THREE.AmbientLight(0x6d5aa8, 0.7));
const textureLoader = new THREE.TextureLoader();
// Tạo quả địa cầu với hình ảnh bản đồ trái đất từ CDN công khai
const customTexture = textureLoader.load("./images/anh61.jpg"); // Thay bằng đường dẫn ảnh của bạn
const core = new THREE.Mesh(
    new THREE.SphereGeometry(2.15, 64, 64),
    new THREE.MeshBasicMaterial({ map: customTexture }),
);
scene.add(core);

const coreGlow = new THREE.PointLight(0xb56cff, 8, 30);
scene.add(coreGlow);

const coreRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.2, 0.018, 16, 160),
    new THREE.MeshBasicMaterial({
        color: 0xd8b6ff,
        transparent: true,
        opacity: 0.45,
    }),
);
coreRing.rotation.x = Math.PI / 2.6;
scene.add(coreRing);
// Hiệu ứng cho sao
function makeStarTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;

    const x = c.getContext("2d");

    // Quầng sáng mềm
    const glow = x.createRadialGradient(
        64, 64, 0,
        64, 64, 64
    );

    glow.addColorStop(0.00, "rgba(255,255,255,1)");
    glow.addColorStop(0.08, "rgba(255,255,255,1)");
    glow.addColorStop(0.18, "rgba(220,200,255,0.95)");
    glow.addColorStop(0.35, "rgba(170,130,255,0.55)");
    glow.addColorStop(0.55, "rgba(130,90,255,0.22)");
    glow.addColorStop(0.75, "rgba(100,70,255,0.08)");
    glow.addColorStop(1.00, "rgba(0,0,0,0)");

    x.fillStyle = glow;
    x.fillRect(0, 0, 128, 128);

    // Tâm sao sáng
    const core = x.createRadialGradient(
        64, 64, 0,
        64, 64, 18
    );

    core.addColorStop(0, "rgba(255,255,255,1)");
    core.addColorStop(0.35, "rgba(255,255,255,0.95)");
    core.addColorStop(1, "rgba(255,255,255,0)");

    x.fillStyle = core;
    x.fillRect(0, 0, 128, 128);

    return new THREE.CanvasTexture(c);
}

const starTexture = makeStarTexture();

const starsGroup = new THREE.Group();
scene.add(starsGroup);
const clickable = [];
const starPositions = [];
let currentMemoryIndex = 0;
let currentPhotoIndex = 0;
// thêm sao mới
function addMemoryStar(memory, index) {
    // Bán kính vùng phân bố sao
    const minRadius = 8;
    const maxRadius = 18;

    // Tạo vị trí ngẫu nhiên trong không gian 3D
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    // Khoảng cách ngẫu nhiên từ hành tinh
    const radius =
        minRadius + Math.random() * (maxRadius - minRadius);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const mesh = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: starTexture,
            color: [
                0xa8d8ff,
                0xffc7ef,
                0xffe69a,
                0xc9b8ff,
                0xffb5da,
                0xbaffdc
            ][index % 6],
            transparent: true,
            depthWrite: false,
        })
    );

    // Kích thước sao ngẫu nhiên
    const size = 0.7 + Math.random() * 0.7;
    mesh.scale.setScalar(size);

    // Vị trí ngẫu nhiên
    mesh.position.set(x, y, z);

    mesh.userData = {
        index,
        memory
    };

    starsGroup.add(mesh);
    clickable.push(mesh);
    starPositions.push(mesh.position.clone());
}
memories.forEach(addMemoryStar);

const dustCount = 2800;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
    const r = 10 + Math.random() * 65;
    const a = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 45;
    dustPos[i * 3] = Math.cos(a) * r;
    dustPos[i * 3 + 1] = y;
    dustPos[i * 3 + 2] = Math.sin(a) * r;
}
dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
scene.add(
    new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
            color: 0xb9c8ff,
            size: 0.055,
            transparent: true,
            opacity: 0.8,
        }),
    ),
);

document.getElementById("counter").textContent =
    `${memories.length} / ${memories.length} kỷ niệm`;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hovered = null;

function pointerFromEvent(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}

renderer.domElement.addEventListener("pointermove", (e) => {
    pointerFromEvent(e);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(clickable)[0];
    if (hit) {
        hovered = hit.object;
        document.body.style.cursor = "pointer";
    } else {
        hovered = null;
        document.body.style.cursor = "default";
    }
});

renderer.domElement.addEventListener("click", (e) => {
    pointerFromEvent(e);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(clickable)[0];
    if (hit) openMemory(hit.object.userData.index);
});

function openMemory(index) {
    const m = memories[index];
    

    currentMemoryIndex = index;
    currentPhotoIndex = 0;

    // Lấy danh sách ảnh
    const images = m.images || [m.image];

    document.getElementById("memoryPhoto").src =
        images[currentPhotoIndex];

    document.getElementById("memoryPhoto").alt =
        m.title;

    document.getElementById("memoryDate").textContent =
        m.date;

    document.getElementById("memoryTitle").textContent =
        m.title;

    document.getElementById("memoryText").textContent =
        m.text;

    document.getElementById("memoryNumber").textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;

    updatePhotoNavigation();

    const modal =
        document.getElementById("memoryModal");

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    controls.autoRotate = false;
}
function updatePhotoNavigation() {
    const memory = memories[currentMemoryIndex];

    const images =
        memory.images || [memory.image];

    const total = images.length;

    document.getElementById("memoryPhoto").src =
        images[currentPhotoIndex];

    document.getElementById("photoCounter").textContent =
        `${currentPhotoIndex + 1} / ${total}`;

    const prevButton =
        document.getElementById("prevPhoto");

    const nextButton =
        document.getElementById("nextPhoto");

    // Nếu chỉ có 1 ảnh thì ẩn nút
    if (total <= 1) {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    } else {
        prevButton.style.display = "flex";
        nextButton.style.display = "flex";
    }

}
function showPreviousPhoto() {
    const memory = memories[currentMemoryIndex];

    const images =
        memory.images || [memory.image];

    currentPhotoIndex--;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = images.length - 1;
    }

    updatePhotoNavigation();
}

function showNextPhoto() {
    const memory = memories[currentMemoryIndex];

    const images =
        memory.images || [memory.image];

    currentPhotoIndex++;

    if (currentPhotoIndex >= images.length) {
        currentPhotoIndex = 0;
    }

    updatePhotoNavigation();
}
document
    .getElementById("prevPhoto")
    .addEventListener(
        "click",
        showPreviousPhoto
    );

document
    .getElementById("nextPhoto")
    .addEventListener(
        "click",
        showNextPhoto
    );
function closeMemory() {
    const modal = document.getElementById("memoryModal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    controls.autoRotate = true;
}
document.getElementById("closeModal").addEventListener("click", closeMemory);
document
    .querySelector(".modal-backdrop")
    .addEventListener("click", closeMemory);
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeMemory();
    }

    if (e.key === "ArrowLeft") {
        showPreviousPhoto();
    }

    if (e.key === "ArrowRight") {
        showNextPhoto();
    }
});

window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    core.rotation.y = t * 0.08;
    core.scale.setScalar(1 + Math.sin(t * 1.4) * 0.025);
    coreRing.rotation.z = t * 0.12;

starsGroup.rotation.y = t * 0.035;
starsGroup.rotation.x = Math.sin(t * 0.15) * 0.04;
starsGroup.rotation.z = Math.cos(t * 0.12) * 0.025;

    clickable.forEach((s, i) => {
        const pulse = 1 + Math.sin(t * 2.2 + i) * 0.09;
        s.scale.setScalar((0.85 + (i % 3) * 0.18) * pulse);
    });

    if (hovered) hovered.scale.multiplyScalar(1.002);

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Đợi 2 giây (2000 mili-giây) rồi mới ẩn màn hình loading
setTimeout(() => {
    document.getElementById("loading").classList.add("hide");
}, 1000);
