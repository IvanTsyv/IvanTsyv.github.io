
// Set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // Set background color to white
document.body.appendChild(renderer.domElement);

// Load your 3D model (replace 'model.glb' with your actual model file)
var loader = new THREE.GLTFLoader();
loader.load('Creates.glb', function(gltf) {
    scene.add(gltf.scene);
    console.log('Model loaded successfully');
}, undefined, function(error) {
    console.error('An error happened:', error);
});

// Set up lighting
var ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Set up the camera position
camera.position.set(0, 1, 5);

// Add orbit controls for interaction
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable inertia
controls.dampingFactor = 0.25; // Damping factor
controls.screenSpacePanning = false; // Lock vertical panning
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation

// Create a simple animation loop
var animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
};
animate();

// Adjust canvas size on window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Test with a simple object
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
