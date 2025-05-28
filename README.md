# Find Your Hat

<!-- ## Overview  -->

**Find Your Hat** is an interactive terminal game built with JavaScript. The player must navigate a field, avoiding holes and staying within the boundaries, to find their lost hat. The game is played in the terminal and uses user input to move the player character around the field.

## How to Play

- The field is a grid containing:
  - Your character: `*`
  - The hat: `^`
  - Holes: `O`
  - Neutral ground: `░`
- Move using the following keys:
  - `u` = up
  - `d` = down
  - `l` = left
  - `r` = right
- The goal is to reach the hat (`^`) without falling into a hole (`O`) or moving outside the field.

## Features

- Randomly generated fields with customizable size and hole percentage.
- Clear terminal display of the field after each move.
- Game ends when you find the hat, fall into a hole, or move outside the field.
- Replayable with different field configurations.

## Getting Started 

### Prerequisites

- Node.js installed on your machine.
- Install the required npm package in terminal:

  ```bash
  npm install prompt-sync
  ```

### Running the Game

1. Clone this repository.
2. Install dependencies (if any).
3. Run the game in your terminal:

   ```bash
   node main.js