let canvas;
let context;
let fps = 30;
let score = 0;
let mouseX;
let mouseY;
let paddle;
let ball;
let game;
let isGameOver = false;

function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 20;
}

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.a = 30;
    this.xSpeed = 10;
    this.ySpeed = 15;
}

Paddle.prototype.draw = function () {
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fill();
}

Paddle.prototype.move = function () {
    this.x = mouseX - this.width/2;
}

Ball.prototype.draw = function () {
    context.fillRect(this.x, this.y, this.a, this.a);
    context.fill();
}

Ball.prototype.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
}

Ball.prototype.coll = function () {
    if (
        this.x <= 0 ||
        this.x >= canvas.width - this.a
    ) {
        this.xSpeed *= -1;
    }
    if (this.y <= 0) {
        this.ySpeed *= -1;
    }
    if (
            this.y+this.a >= paddle.y &&
            this.x + this.a > paddle.x &&
            this.x < paddle.x+paddle.width
    ) {
        this.ySpeed *= -1;
        score += 1;
    }
    if (this.y + this.a >= canvas.height) {
        isGameOver = true;
    }
}

window.onload = function () {
    // 画布初始化
    canvas = document.querySelector('#game');
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 5;
    context.fillStyle = '#fff';
    context.font = '48px serif';

    // 鼠标事件
    canvas.onmousemove = function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    function gameOver() {
        if (isGameOver) {
            clearInterval(game);
            context.font = '100px serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('Game Over', canvas.width / 2, canvas.height/2);
        }
    }

    function setup() {
        paddle = new Paddle(0, 500);
        paddle.x = canvas.width / 2 - paddle.width / 2;
        ball = new Ball(0, 100);
        ball.x = canvas.width / 2 - ball.a / 2;
    }

    function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        paddle.draw();
        paddle.move();
        ball.draw();
        ball.move();
        ball.coll();
        context.fillText('Score: '+score, 10, 50);
        gameOver();
    }
    
    setup();
    game = setInterval(gameLoop, fps);
}