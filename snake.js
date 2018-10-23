(function() {
	var canvas = document.getElementById('gameCanvas');
	var ctx = canvas.getContext('2d');
	var gridSize = 10;

	var snake = [];
	var snakeLength = 5;
	var snakeX = ((canvas.width/10) / 2 )*10 + 5;
	var snakeY = ((canvas.height/10) / 2 )*10 - 5;

	for (s = 0; s < snakeLength; s++) {
		snake[s] = [{x: snakeX - (s*gridSize), y: snakeY}]
	}

	var previousDirection = 0;
	var newDirection = 39;

	var foodX = 0;
	var foodY = 0;
	var hasFood = false;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode >= 37 && e.keyCode <= 40) {
			previousDirection = newDirection;
			newDirection = e.keyCode;
		}
	});


	function drawSnake() {
		ctx.beginPath();
		snake.forEach((s, i) => {
			ctx.arc(s[0].x, s[0].y, gridSize/2, 0, 2*Math.PI,false);
		});
		
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.closePath();
		hasFood = true;
	}

	function updateSnake() {
		snake.forEach((s, i) => {
			if (i > 0 && i < snakeLength - 1) {
				s.push(snake[i-1].shift())
			}
			else if (i == snakeLength - 1) {
				s.shift();
				s.push(snake[i-1].shift())
			}
		});
	}

	function growSnake() {
		const snakeCurrentLength = snake.length
		snake.push(snake[snakeCurrentLength-1])
	}


	function getRndInteger(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

	function drawFood() {
		ctx.beginPath();
		ctx.arc(foodX, foodY, gridSize/2, 0, 2*Math.PI, false);
		ctx.fillStyle = "#ff0000";
		ctx.fill();
		ctx.closePath();
	}

	function eatFood(){
		if (snake[0][0].x == foodX && snake[0][0].y == foodY) {
			hasFood = false;
			growSnake();
		}
	}

	function wallCollision(){
		if (snake[0][0].x < 0 || snake[0][0].x > canvas.width || snake[0][0].y < 0 || snake[0][0].y > canvas.height) {
			loseGame();
		}
	}

	function selfCollision(s, i, snake){
		if (i > 0) {
			return (snake[0][0].x === snake[i][0].x) && (snake[0][0].y === snake[i][0].y)
		}
	}

	function loseGame() {
		alert('you lost!');
		clearInterval(draw);
		document.location.reload();
	}

	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (!hasFood) {
			foodX = getRndInteger(0, (canvas.width/10) - 1) * 10 + 5;
			foodY = getRndInteger(1, (canvas.height/10) - 1) * 10 -5;
			hasFood = true;
		}

		drawSnake();
		drawFood();
		eatFood();
		wallCollision();

		if (snake.some(selfCollision)) {
			loseGame();
		}

		if (newDirection == 37) {
			snake[0][1] = {x: snake[0][0].x - gridSize, y: snake[0][0].y};
			updateSnake();
		}

		if (newDirection == 38) {
			snake[0][1] = {x: snake[0][0].x, y: snake[0][0].y - gridSize};
			updateSnake();
		}

		if (newDirection == 39) {
			snake[0][1] = {x: snake[0][0].x + gridSize, y: snake[0][0].y};
			updateSnake();
		}

		if (newDirection == 40) {
			snake[0][1] = {x: snake[0][0].x, y: snake[0][0].y + gridSize};
			updateSnake();
		}
	}

	setInterval(draw, 200);	
}) ();
