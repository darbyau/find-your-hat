const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    // Initialize the field with the provided 2D array
    this.field = field;
    // coordinates of the player [y][x]
    for (let y = 0; y < this.field.length; y++) {
      for (let x = 0; x < this.field[y].length; x++) {
        if (field[y][x] === pathCharacter) {
          this.playerY = y; // Starting y position of the player
          this.playerX = x; // Starting x position of the player
        }
      }
    }
  }

  print() {
    // Print the field to the console
    // Join each row's characters with a space and print it
    this.field.forEach((row) => {
      console.log(row.join(" "));
    });
  }

  move(direction) {
    // Move the player in the specified direction
    const oldY = this.playerY;
    const oldX = this.playerX;

    let directionLabel;

    switch (direction) {
      case "u":
        this.playerY--; // Move up
        directionLabel = "up";
        break;
      case "d":
        this.playerY++; // Move down
        directionLabel = "down";
        break;
      case "l":
        this.playerX--; // Move left
        directionLabel = "left";
        break;
      case "r":
        this.playerX++; // Move right
        directionLabel = "right";
        break;
      default:
        console.log("\nInvalid direction -> please use 'u', 'd', 'l', or 'r'.");
    }
    console.log("\n" + `moving ${directionLabel}...` + "\n");
    console.log(
      `Your position is now: (${this.playerY}, ${this.playerX})` + "\n"
    );

    console.log(`${oldY}, ${oldX} -> ${this.playerY}, ${this.playerX}` + "\n");
  }

  gameOver() {
    // Check if the player has fallen into a hole or found the hat or moved outside the field

    // Check if the player is outside the field first
    if (
      this.playerX < 0 ||
      this.playerX >= this.field[0].length ||
      this.playerY < 0 ||
      this.playerY >= this.field.length
    ) {
      console.log("You moved outside the field! Game Over.");
      return true; // Game over
    }
    // Check if the player is on a hole or reached hat
    let currentPosition = this.field[this.playerY][this.playerX];

    if (currentPosition === hole) {
      console.log("Game Over! You fell into a hole.");
      return true; // Game over
    } else if (currentPosition === hat) {
      console.log("😁 Congratulations! You found your hat!");
      return true; // Game over
    } else {
      console.log("currentPosition: " + currentPosition);
      return false; // Continue the game
    }
  }

  static generateField(height, width, percentage) {
    // Generate a new field with random positions for the hat and holes
    this.field = [];

    height = height || Math.floor(Math.random() * 8) + 3; // Default height if not provided || at least 3
    width = width || Math.floor(Math.random() * 8) + 3; // Default width if not provided | // at least 3

    // Fill the field with the fieldCharacter
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        row.push(fieldCharacter);
      }
      this.field.push(row);
    }

    // Step 2: Place player start at top-left
    this.field[0][0] = pathCharacter;

    // Step 3: Place the hat at a random position
    let hatPlaced = false;

    while (!hatPlaced) {
      const hatY = Math.floor(Math.random() * height);
      const hatX = Math.floor(Math.random() * width);

      if (hatY !== 0 || hatX !== 0) {
        this.field[hatY][hatX] = hat; // Place the hat
        hatPlaced = true; // Hat is placed
      }
    }

    percentage = percentage || 0.2; // Default percentage of holes if not provided
    //place holes at random positions
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.field[y][x] === fieldCharacter) {
          // Randomly decide to place a hole with a 20% chance
          if (Math.random() < percentage) {
            this.field[y][x] = hole; // Place a hole
          }
        }
      }
    }

    return this.field; // Return the generated field
  }

  runGame() {
    // Main game loop
    let playing = true;

    while (playing) {
      //clear the console for a fresh view
      console.clear();
      this.print(); //show the current field
      // Prompt the user for a direction to move

      const direction = prompt(
        "Which direction would you like to move? (u/d/l/r) "
      );
      // Store old position before move
      const oldY = this.playerY;
      const oldX = this.playerX;

      this.move(direction); // move player position

      if (this.gameOver() === true) {
        playing = false; // End the game if gameOver returns true -> Exit the loop
      } else {
        // If the game is not over, update the field
        this.field[oldY][oldX] = fieldCharacter; // Leave a trail or clear the path
        this.field[this.playerY][this.playerX] = pathCharacter; // Mark new location with '*'
      }
    }
  }
}

// ---------------------------------------------------------------------

// Initialize the game
const field1 = new Field(Field.generateField()); // Create a new field with random size and holes

// Output welcome message and instructions
console.log("Welcome to 'Find Your Hat'!");
console.log("You are represented by '*', the hat is '^', and holes are 'O'.");
console.log(
  "Navigate through the field using 'u', 'l', 'd', 'r' to move up, left, down, and right respectively."
);
console.log("");
console.log(
  `Your starting position is: (${field1.playerY}, ${field1.playerX})`
);

const checkReady = prompt(
  "Press Enter to start the game or type 'exit' to quit: "
);
if (checkReady.toLowerCase() === "exit") {
  console.log("Thanks for playing! Goodbye!");
  process.exit(); // Exit the game if the user types 'exit'
  //process.exit(); is a Node.js command that immediately stops the program.
}

// Start the game
field1.runGame();
