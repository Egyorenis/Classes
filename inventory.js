// inventory.js
let inventory = [];

// Add an item to the inventory
function addItemToInventory(item) {
    inventory.push(item);
    updateInventoryUI();
}

// Update the inventory UI
function updateInventoryUI() {
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.innerHTML = ''; // Clear previous items
    inventory.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item; // Display item
        inventoryDiv.appendChild(itemDiv);
    });
}

// Toggle inventory visibility
function toggleInventory() {
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.classList.toggle('hidden');
}

// Event listener for keydown to toggle inventory
document.addEventListener('keydown', (event) => {
    if (event.key === 'i') { // Press 'I' to toggle inventory
        toggleInventory();
    }
});
