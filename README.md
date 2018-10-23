# Snake
Vanilla JS Snake Arcade Game using Canvas

## Current status

- Snake can move left, right, up, and down, passing along the snake head's most recent position to the next snake item in the array, down to the end of the array.
- Game ends upon snake reaching the bounds of the canvas or colliding with itself.
- Food is drawn on random spots on the board.
- Eating a food piece grows the snake by 1 dot.


## What I wish I had time for

- Debug rendering of snake, currently the snake looks like a triangle anytime it makes a turn
- Drawing of newly added snake body part on the canvas - currently, the snake array updates via snake.push() however the last array item does not get drawn on the canvas
- Optimizing the use of gridSize in all calculations for XY coordinates for the snake and the food items
- Add in a check to make sure the food is not drawn on top of any part of the snake
- Modify direction change to include checks to make sure the snake cannot double back on itself
- Using requestAnimationFrame for redrawing the canvas instead of using setInterval