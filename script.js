// Constants
const playerBalanceElement = document.getElementById("balance");
const avatarElement = document.getElementById("avatar");
const avatarCostElement = document.getElementById("avatarCost");
const selectedStockElement = document.getElementById("selectedStock");
const stocksOwnedElement = document.getElementById("stocksOwned");
const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");
const buyAvatarButton = document.getElementById("buyAvatarButton");

// Player data
let playerBalance = 10000;
let avatars = [
    "https://www.nicepng.com/png/detail/348-3483446_2d-character-design-wassermolekl.png",  // Replace with your image file paths
    "https://opengameart.org/sites/default/files/player_19.png",
    "https://www.pngitem.com/pimgs/m/190-1906083_2d-girl-character-png-transparent-png.png",
];
let avatarCosts = [100, 200, 300];
let selectedAvatar = 0;

// Stock data
let stocks = [
    { name: "AAPL", price: 150.0, quantity: 0 },
    { name: "GOOGL", price: 2700.0, quantity: 0 },
    { name: "CTXR", price: 5.0, quantity: 0 },
    { name: "MARK", price: 3.0, quantity: 0 },
    { name: "SIRI", price: 6.0, quantity: 0 },
    { name: "GOLD", price: 1800.0, quantity: 0 },
    { name: "SILVER", price: 25.0, quantity: 0 },
    { name: "COTTON", price: 0.8, quantity: 0 },
    { name: "BRIDGEWATER", price: 50.0, quantity: 0 },
    // Add more stock data here
];

let selectedStock = 0;

// Function to update the player's information
function updatePlayerInfo() {
    playerBalanceElement.textContent = playerBalance.toFixed(2);
    avatarElement.style.backgroundImage = `url(${avatars[selectedAvatar]})`;
    avatarCostElement.textContent = avatarCosts[selectedAvatar].toFixed(2);
    selectedStockElement.textContent = `Selected Stock: ${stocks[selectedStock].name} ($${stocks[selectedStock].price.toFixed(2)})`;
    stocksOwnedElement.textContent = `Stocks Owned: ${stocks[selectedStock].quantity}`;
}

// Function to handle buying stock
function buyStock() {
    const stock = stocks[selectedStock];
    if (playerBalance >= stock.price) {
        stock.quantity += 1;
        playerBalance -= stock.price;
        updatePlayerInfo();
    }
}

// Function to handle selling stock
function sellStock() {
    const stock = stocks[selectedStock];
    if (stock.quantity > 0) {
        stock.quantity -= 1;
        playerBalance += stock.price;
        updatePlayerInfo();
    }
}

// Event listeners for Buy and Sell buttons
buyButton.addEventListener("click", buyStock);

sellButton.addEventListener("click", sellStock);

// Function to handle purchasing avatars
function purchaseAvatar() {
    const avatarCost = avatarCosts[selectedAvatar];
    if (playerBalance >= avatarCost) {
        playerBalance -= avatarCost;
        updatePlayerInfo();
    }
}

// Event listener for Buy Avatar button
buyAvatarButton.addEventListener("click", purchaseAvatar);

// Function to update stock prices periodically every 1 second
setInterval(() => {
    updateStockPrices();
    updateStockInfo(selectedStock);
    updateStockChart();
}, 1000); // Updated interval to 1 second

// Function to create the stock chart
function updateStockChart() {
    const stockChart = document.getElementById("stockChart");
    stockChart.innerHTML = "";

    for (let i = 0; i < stocks.length; i++) {
        const stock = stocks[i];
        const stockItem = document.createElement("div");
        stockItem.className = "stock-item";

        const stockName = document.createElement("div");
        stockName.className = "stock-name";
        stockName.textContent = stock.name;

        const stockPrice = document.createElement("div");
        stockPrice.className = "stock-price";
        stockPrice.textContent = `$${stock.price.toFixed(2)}`;

        stockItem.appendChild(stockName);
        stockItem.appendChild(stockPrice);
        stockChart.appendChild(stockItem);
    }
}

// Initialize player info, stock list, and stock chart
updatePlayerInfo();
generateStockList();
