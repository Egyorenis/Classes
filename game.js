// game.js
let scene, camera, renderer, player;
let inventory = [];

// Initialize the game
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create a green block
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Solid green color
    player = new THREE.Mesh(geometry, material);
    scene.add(player);

    camera.position.z = 5;

    // Mouse lock functionality
    document.body.addEventListener('click', function() {
        document.body.requestPointerLock();
    });

    // Pointer lock event
    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement) {
            document.addEventListener('mousemove', onMouseMove);
        } else {
            document.removeEventListener('mousemove', onMouseMove);
        }
    });

    window.addEventListener('resize', onWindowResize, false);
    animate();
}

// Handle mouse movement for looking around
function onMouseMove(event) {
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    player.rotation.y -= movementX * 0.002; // Adjust rotation speed
    player.rotation.x -= movementY * 0.002; // Adjust rotation speed
    player.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, player.rotation.x)); // Limit vertical look
}

// Adjust camera and renderer on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start the game
init();
