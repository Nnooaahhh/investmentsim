// JavaScript code for investment simulator

// Constants
const playerBalanceElement = document.getElementById("balance");
const avatarElement = document.getElementById("avatar");
const avatarCostElement = document.getElementById("avatarCost");
const selectedStockElement = document.getElementById("selectedStock");
const stocksOwnedElement = document.getElementById("stocksOwned");
const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");

// Player data
let playerBalance = 10000;
let avatars = [
    "avatar1.png",  // Replace with your image file paths
    "avatar2.png",
    "avatar3.png",
];
let avatarCosts = [100, 200, 300];
let selectedAvatar = 0;

// Stock data (same as before)
// ...

// Function to update the player's information
function updatePlayerInfo() {
    playerBalanceElement.textContent = playerBalance.toFixed(2);
    avatarElement.style.backgroundImage = `url(${avatars[selectedAvatar]})`;
    avatarCostElement.textContent = avatarCosts[selectedAvatar].toFixed(2);
}

// Function to handle buying stock
function buyStock(stockIndex) {
    const stock = stocks[stockIndex];
    if (playerBalance >= stock.price) {
        stock.quantity += 1;
        playerBalance -= stock.price;
        updatePlayerInfo();
        updateStockInfo(stockIndex);
    }
}

// Function to handle selling stock
function sellStock(stockIndex) {
    const stock = stocks[stockIndex];
    if (stock.quantity > 0) {
        stock.quantity -= 1;
        playerBalance += stock.price;
        updatePlayerInfo();
        updateStockInfo(stockIndex);
    }
}

// Function to update stock information (same as before)
// ...

// Event listeners for Buy and Sell buttons
buyButton.addEventListener("click", () => {
    buyStock(selectedStock);
});

sellButton.addEventListener("click", () => {
    sellStock(selectedStock);
});

// Initialize player info and stock info
updatePlayerInfo();
updateStockInfo(selectedStock);
