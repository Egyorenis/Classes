// game.js
let scene, camera, renderer, player, groundBlock;
let inventory = [];

// Initialize the game
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create a green block as the ground
    const blockGeometry = new THREE.BoxGeometry(1, 1, 1); // Ground block size
    const blockMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Solid green color
    groundBlock = new THREE.Mesh(blockGeometry, blockMaterial);
    groundBlock.position.y = 0; // Position it at the ground level
    scene.add(groundBlock);

    // Create a player entity (a cylinder)
    const playerGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32); // Cylinder as player model
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue player
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 0.75, 0); // Position it at half its height (so it's sitting on the ground)
    scene.add(player);

    // Set camera position inside the player
    camera.position.set(0, 0.75, 2); // Set camera at the top of the cylinder
    camera.lookAt(player.position); // Look at the player's position

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

    // Rotate the player based on mouse movement
    player.rotation.y -= movementX * 0.002; 
    camera.rotation.x -= movementY * 0.002; // Rotate camera based on mouse movement
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x)); // Limit vertical look
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
