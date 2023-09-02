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

// Stock data
let stocks = [
    { name: "AAPL", price: 150.0, quantity: 0 },
    { name: "GOOGL", price: 2700.0, quantity: 0 },
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

// Event listeners for selecting different stocks
const stockList = document.querySelector(".stock-list");
stockList.addEventListener("click", (event) => {
    if (event.target && event.target.nodeName === "LI") {
        selectedStock = event.target.dataset.index;
        updatePlayerInfo();
    }
});

// Initialize player info and stock list
updatePlayerInfo();

// Function to generate the stock list dynamically
function generateStockList() {
    const stockList = document.querySelector(".stock-list");
    stockList.innerHTML = "";
    for (let i = 0; i < stocks.length; i++) {
        const stockItem = document.createElement("li");
        stockItem.textContent = `${stocks[i].name} ($${stocks[i].price.toFixed(2)})`;
        stockItem.dataset.index = i;
        stockList.appendChild(stockItem);
    }
}

generateStockList();
// Function to update stock prices periodically
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

// Function to update the stock chart
function updateStockChart() {
    const stockChart = document.getElementById("stockChart");
    stockChart.innerHTML = "";

    for (let i = 0; i < stocks.length; i++) {
        const stock = stocks[i];
        const stockBar = document.createElement("div");
        stockBar.className = "stock-bar";
        stockBar.style.height = `${(stock.price / 50).toFixed(2)}px`;
        stockBar.style.backgroundColor = getRandomColor();
        stockChart.appendChild(stockBar);
    }
}

// Generate a random color for the stock bars
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Update stock information, chart, and balance periodically
setInterval(() => {
    updateStockPrices();
    updateStockInfo(selectedStock);
    updateStockChart();
}, 5000); // Adjust the interval as needed (e.g., 5000ms = 5 seconds)

// ... (remaining code, including event listeners)

// Initialize player info, stock list, and stock chart
updatePlayerInfo();
generateStockList();
updateStockChart();

