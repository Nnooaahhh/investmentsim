// Constants
const playerBalanceElement = document.getElementById("balance");
const avatarElement = document.getElementById("avatar");
const avatarCostElement = document.getElementById("avatarCost");
const selectedStockElement = document.getElementById("selectedStock");
const stocksOwnedElement = document.getElementById("stocksOwned");
const buyButton = document.getElementById("buyButton");
const sellButton = document.getElementById("sellButton");
const buyAvatarButton = document.getElementById("buyAvatarButton");
const stockList = document.querySelector(".stock-list");
const stockChart = document.getElementById("stockChart");

// Player data
let playerBalance = 10000;
let avatars = [
    "https://www.nicepng.com/png/detail/348-3483446_2d-character-design-wassermolekl.png",
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

// Function to update stock prices randomly
function updateStockPrices() {
    for (let i = 0; i < stocks.length; i++) {
        // Simulate price fluctuations (you can adjust this logic)
        const priceChange = (Math.random() - 0.5) * 10;
        stocks[i].price += priceChange;

        // Ensure stock prices stay positive
        if (stocks[i].price < 1) {
            stocks[i].price = 1;
        }
    }
}

// Function to create the stock chart
function updateStockChart() {
    stockChart.innerHTML = "";

    for (let i = 0; i < stocks.length; i++) {
        const stock = stocks[i];
        const stockItem = document.createElement("li");
        stockItem.textContent = `${stock.name} ($${stock.price.toFixed(2)})`;
        stockItem.dataset.index = i;

        stockList.appendChild(stockItem);
    }
}

// Event listener for selecting different stocks
stockList.addEventListener("click", (event) => {
    const selectedIndex = event.target.dataset.index;
    if (selectedIndex !== undefined) {
        selectedStock = parseInt(selectedIndex);
        updatePlayerInfo();
    }
});

// Function to initialize the application
function initApp() {
    updatePlayerInfo();
    updateStockChart();
    setInterval(() => {
        updateStockPrices();
        updateStockChart();
    }, 1000); // Update stock prices every 1 second
}

// Initialize the application
initApp();
