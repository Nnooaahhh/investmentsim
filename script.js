import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
FONT = pygame.font.Font(None, 36)

# Player data
player_balance = 10000
avatars = [
    pygame.image.load("avatar1.png"),  # Replace with your image file paths
    pygame.image.load("avatar2.png"),
    pygame.image.load("avatar3.png"),
]
avatar_costs = [100, 200, 300]
selected_avatar = 0

# Stock data (same as before)
stocks = [
    {"name": "AAPL", "price": 150.0, "quantity": 0},
    {"name": "GOOGL", "price": 2700.0, "quantity": 0},
    # Add more stocks, penny stocks, commodities, etc.
]

# Function to update stock prices (same as before)
# ...

# Function to buy stocks (same as before)
# ...

# Function to sell stocks (same as before)
# ...

# Function to purchase an avatar
def purchase_avatar(avatar_index):
    global player_balance, selected_avatar
    cost = avatar_costs[avatar_index]
    if player_balance >= cost:
        selected_avatar = avatar_index
        player_balance -= cost

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
            elif event.key == pygame.K_LEFT:
                selected_avatar = (selected_avatar - 1) % len(avatars)
            elif event.key == pygame.K_RIGHT:
                selected_avatar = (selected_avatar + 1) % len(avatars)
            elif event.key == pygame.K_b:
                buy_stock(selected_stock)
            elif event.key == pygame.K_s:
                sell_stock(selected_stock)
            elif event.key == pygame.K_p:
                purchase_avatar(selected_avatar)

    update_stock_prices()
    selected_stock = pygame.mouse.get_pos()[0] // (WIDTH // len(stocks))

    # Clear the screen
    screen.fill(WHITE)

    # Display player info
    balance_text = FONT.render(f"Balance: ${player_balance:.2f}", True, BLACK)
    avatar_rect = avatars[selected_avatar]
    screen.blit(avatar_rect, (20, 20))
    avatar_cost_text = FONT.render(f"Avatar Cost: ${avatar_costs[selected_avatar]}", True, BLACK)
    stock_info_text = FONT.render(f"Selected Stock: {stocks[selected_stock]['name']} (${stocks[selected_stock]['price']:.2f})", True, BLACK)
    stocks_owned_text = FONT.render(f"Stocks Owned: {stocks[selected_stock]['quantity']}", True, BLACK)

    screen.blit(balance_text, (20, 250))
    screen.blit(avatar_cost_text, (20, 300))
    screen.blit(stock_info_text, (20, 350))
    screen.blit(stocks_owned_text, (20, 400))

    # Display stock information (same as before)
    # ...

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()
