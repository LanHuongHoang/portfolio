import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { OBJLoader } from "jsm/loaders/OBJLoader.js";

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20);
camera.position.z = 2.5;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("model-container").appendChild(renderer.domElement);

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 4;
window.addEventListener('dblclick', () => {
	controls.enabled = !controls.enabled;
	if (controls.enabled) {
		camera.position.set(1, 2, 1.5);  // Zoom in
	} else {
		camera.position.set(2, 4, 3.5);  // Zoom out
	}
	camera.lookAt(0, 0, 0);
	camera.updateProjectionMatrix();
});
window.addEventListener('click', () => {
	controls.enabled = !controls.enabled;
});
controls.update();

// Lighting setup
const sunlight = new THREE.DirectionalLight(0xffffe0, 1);
sunlight.position.set(5, 10, 5);
scene.add(sunlight);

const filllight = new THREE.DirectionalLight(0x88ccff, 0.5);
filllight.position.set(-5, -10, -5);
scene.add(filllight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Load and initialize model
const loader = new OBJLoader();

const texLoader = new THREE.TextureLoader();

const barTex = texLoader.load('./3dmodel/textures/UV1.jpg');
const material = new THREE.MeshStandardMaterial({ map: barTex });

const outTex = texLoader.load('./3dmodel/textures/UV2.jpg');
const outMaterial = new THREE.MeshStandardMaterial({ map: outTex });
scene.add(outMaterial);


loader.load("./3dmodel/models/sfbase.obj", (obj) => {
	obj.traverse((child) => {
		if (child.isMesh) {
			child.material = material;
			child.castShadow = true;  // Enable shadow casting
			child.receiveShadow = true;  // Enable shadow receiving
		}
	});

	// Calculate bounding box and adjust scale
	const boundingBox = new THREE.Box3().setFromObject(obj);
	const size = boundingBox.getSize(new THREE.Vector3());
	const maxDim = Math.max(size.x, size.y, size.z);
	const scale = 1 / maxDim;
	obj.scale.set(scale, scale, scale);

	obj.position.set(0, 0, 0);
	scene.add(obj);
	init(obj.children[0].geometry);
});

// Load and initialize another model

loader.load("./3dmodel/models/sfmain.obj", (obj) => {
	obj.traverse((child) => {
		if (child.isMesh) {
			child.material = outMaterial;
			child.castShadow = true;  // Enable shadow casting
			child.receiveShadow = true;  // Enable shadow receiving
		}
	});

	// Calculate bounding box and adjust scale
	const boundingBox = new THREE.Box3().setFromObject(obj);
	const size = boundingBox.getSize(new THREE.Vector3());
	const maxDim = Math.max(size.x, size.y, size.z);
	const scale = 1 / maxDim;
	obj.scale.set(scale, scale, scale);

	obj.position.set(0, 0, 0);  // Position the second model differently
	scene.add(obj);
});

// Enable shadows in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Update lights to cast shadows
sunlight.castShadow = true;
filllight.castShadow = true;

// Soften shadows by adjusting shadow map properties
sunlight.shadow.mapSize.width = 2048;
sunlight.shadow.mapSize.height = 2048;
sunlight.shadow.radius = 4;
sunlight.shadow.darkness = 0.3;  // Decrease shadow darkness

filllight.shadow.mapSize.width = 2048;
filllight.shadow.mapSize.height = 2048;
filllight.shadow.radius = 4;
filllight.shadow.darkness = 0.3;  // Decrease shadow darkness

// Initialize scene with geometry
function init(geometry) {
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
	animate();
}

// Change the background size dynamically
function changeBackgroundSize(width, height) {
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}

// Adjust camera position
camera.position.set(2, 4, 3.5);  // Move the camera for a better view
camera.lookAt(0, 0, 0);  // Make sure the camera is looking at the model
camera.fov = 15;  // Change the camera aperture (field of view)
camera.updateProjectionMatrix();  // Update the projection matrix after changing the FOV

// Example usage: change background size 
changeBackgroundSize(1150, 700);
