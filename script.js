const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gravity = -0.05;
const blockSize = 1;
const blocks = [];

let player = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
scene.add(player);
camera.position.set(0, 2, 5);
camera.lookAt(player.position);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Create the initial block
function createBlock(x, y, z) {
    const block = new THREE.Mesh(new THREE.BoxGeometry(blockSize, blockSize, blockSize), new THREE.MeshBasicMaterial({ color: 0xaaaaaa }));
    block.position.set(x, y, z);
    blocks.push(block);
    scene.add(block);
}

// Spawn the main block
createBlock(0, 0, 0);

// Handle player movement
let velocityY = 0;

function update() {
    // Simple gravity
    if (player.position.y > 0) {
        velocityY += gravity;
    } else {
        velocityY = 0;
        player.position.y = 0; // Prevent falling below the ground
    }

    player.position.y += velocityY;

    // Check for block interaction
    for (const block of blocks) {
        if (player.position.distanceTo(block.position) < blockSize) {
            block.material.color.set(0xff0000); // Highlight block when near
            if (mouseClicked) {
                block.material.color.set(0x00ff00); // Break block
                setTimeout(() => {
                    block.material.color.set(0xaaaaaa); // Regenerate block
                }, 10); // Regenerate after 0.01 seconds
            }
        }
    }

    mouseClicked = false; // Reset click state

    renderer.render(scene, camera);
    requestAnimationFrame(update);
}

// Mouse click detection
let mouseClicked = false;

document.addEventListener('mousedown', () => {
    mouseClicked = true;
});

// Control movement
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => {
    controls.lock();
});

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            player.position.z -= 0.1;
            break;
        case 'KeyS':
            player.position.z += 0.1;
            break;
        case 'KeyA':
            player.position.x -= 0.1;
            break;
        case 'KeyD':
            player.position.x += 0.1;
            break;
    }
});

// Start the game loop
update();
