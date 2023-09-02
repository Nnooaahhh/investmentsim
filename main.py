import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
FONT = pygame.font.Font(None, 36)

# Game variables
balance = 10000
stock_price = 100
stock_name = "AAPL"
stocks_owned = 0

# Function to update stock price
def update_stock_price():
    global stock_price
    stock_price += random.uniform(-5, 5)

# Function to buy stocks
def buy_stock():
    global balance, stocks_owned
    if balance >= stock_price:
        stocks_to_buy = min(balance // stock_price, 10)  # Buy at most 10 stocks at a time
        balance -= stock_price * stocks_to_buy
        stocks_owned += stocks_to_buy

# Function to sell stocks
def sell_stock():
    global balance, stocks_owned
    if stocks_owned > 0:
        stocks_to_sell = min(stocks_owned, 10)  # Sell at most 10 stocks at a time
        balance += stock_price * stocks_to_sell
        stocks_owned -= stocks_to_sell

# Initialize Pygame window
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Investment Simulator")

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_q:
                running = False
            elif event.key == pygame.K_b:
                buy_stock()
            elif event.key == pygame.K_s:
                sell_stock()

    update_stock_price()

    # Clear the screen
    screen.fill(WHITE)

    # Display balance, stock info, and owned stocks
    balance_text = FONT.render(f"Balance: ${balance:.2f}", True, BLACK)
    stock_info_text = FONT.render(f"{stock_name}: ${stock_price:.2f}", True, BLACK)
    stocks_owned_text = FONT.render(f"Stocks owned: {stocks_owned}", True, BLACK)

    screen.blit(balance_text, (20, 20))
    screen.blit(stock_info_text, (20, 70))
    screen.blit(stocks_owned_text, (20, 120))

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()
