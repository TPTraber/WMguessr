// Three.js scene objects used to render the campus panorama.
let camera, scene, renderer;
let panoramaMesh;
let panoramaTexture;

// Current view direction and the pointer position at drag start.
let onPointerDownMouseX = 0;
let onPointerDownMouseY = 0;
let lon = 0;
let onPointerDownLon = 0;
let lat = 0;
let onPointerDownLat = 0;

// Create the panorama scene and connect input and resize handlers.
function initPano() {
    const container = document.getElementById("panoContainer");

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    scene = new THREE.Scene();

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    panoramaMesh = new THREE.Mesh(geometry, material);
    scene.add(panoramaMesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    container.style.touchAction = "none";
    container.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("wheel", onDocumentMouseWheel);
    window.addEventListener("resize", onWindowResize);
}

// Keep the camera and renderer matched to the browser viewport.
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Remember the initial pointer and view direction when dragging begins.
function onPointerDown(event) {
    if (event.isPrimary === false) return;

    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
}

// Convert pointer movement into horizontal and vertical view angles.
function onPointerMove(event) {
    if (event.isPrimary === false) return;

    lon = onPointerDownLon + (onPointerDownMouseX - event.clientX) * 0.1;
    lat = onPointerDownLat + (event.clientY - onPointerDownMouseY) * 0.1;
}

// Remove drag listeners when the pointer is released.
function onPointerUp(event) {
    if (event.isPrimary === false) return;

    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
}

// Use the mouse wheel to adjust the camera's field of view.
function onDocumentMouseWheel(event) {
    const fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
    camera.updateProjectionMatrix();
}

// Aim the camera from the current longitude and latitude.
function animate() {
    lat = Math.max(-85, Math.min(85, lat));
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);

    renderer.render(scene, camera);
}

// Load a new panorama and release the previous texture when it succeeds.
function loadPanorama(url) {
    new THREE.TextureLoader().load(
        url,
        (texture) => {
            const previousTexture = panoramaTexture;
            panoramaTexture = texture;
            panoramaMesh.material.map = texture;
            panoramaMesh.material.needsUpdate = true;
            if (previousTexture) previousTexture.dispose();
        },
        undefined,
        (error) => {
            console.error(`Could not load panorama: ${url}`, error);
        }
    );
}
