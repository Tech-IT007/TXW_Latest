import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  gridSize = 24;
  rows = 20;
  cols = 10;
  board: number[][] = [];
  colors = ['#000', '#f87171', '#60a5fa', '#facc15', '#34d399', '#a78bfa', '#fb923c'];

  shapes = [
    [[1, 1, 1, 1]], // I
    [
      [2, 2],
      [2, 2],
    ], // O
    [
      [0, 3, 0],
      [3, 3, 3],
    ], // T
    [
      [0, 4, 4],
      [4, 4, 0],
    ], // S
    [
      [5, 5, 0],
      [0, 5, 5],
    ], // Z
    [
      [6, 0, 0],
      [6, 6, 6],
    ], // J
    [
      [0, 0, 7],
      [7, 7, 7],
    ], // L
  ];

  currentShape: any;
  pos = { x: 0, y: 0 };

  dropInterval: any;
  dropSpeed = 500;
  score = 0;
  level = 1;
  linesCleared = 0;

  gameStarted = false;
  isPaused = false;

  ngOnInit() {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d')!;
    this.resetBoard();
    this.draw();
  }

  resetBoard() {
    this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    this.score = 0;
    this.level = 1;
    this.linesCleared = 0;
    this.pos = { x: 0, y: 0 };
    this.currentShape = null;
    this.clearInterval();
  }

  clearInterval() {
    if (this.dropInterval) {
      clearInterval(this.dropInterval);
      this.dropInterval = null;
    }
  }

  startGame() {
    this.gameStarted = true;
    this.isPaused = false;
    this.resetBoard();
    this.spawnShape();
    this.startDropLoop();
  }

  startDropLoop() {
    this.clearInterval();
    this.dropInterval = setInterval(() => {
      if (!this.isPaused) this.drop();
    }, this.dropSpeed);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  spawnShape() {
    const index = Math.floor(Math.random() * this.shapes.length);
    this.currentShape = this.shapes[index];
    this.pos = { x: 3, y: 0 };

    if (this.collides()) {
      this.gameOver();
    }
  }

  gameOver() {
    this.clearInterval();
    this.gameStarted = false;
    alert(`Game Over! Your score: ${this.score}`);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.cols * this.gridSize, this.rows * this.gridSize);

    // Draw board
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          this.drawSquare(x, y, this.colors[this.board[y][x]]);
        }
      }
    }

    // Draw current shape
    if (this.currentShape) {
      this.currentShape.forEach((row: number[], dy: number) => {
        row.forEach((value, dx) => {
          if (value)
            this.drawSquare(this.pos.x + dx, this.pos.y + dy, this.colors[value]);
        });
      });
    }
  }

  drawSquare(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
  }

  collides(): boolean {
    return this.currentShape.some((row: number[], dy: number) =>
      row.some((value, dx) => {
        if (!value) return false;
        const newX = this.pos.x + dx;
        const newY = this.pos.y + dy;
        return (
          newX < 0 ||
          newX >= this.cols ||
          newY >= this.rows ||
          (newY >= 0 && this.board[newY][newX])
        );
      })
    );
  }

  merge() {
    this.currentShape.forEach((row: number[], dy: number) =>
      row.forEach((value, dx) => {
        if (value && this.pos.y + dy >= 0) {
          this.board[this.pos.y + dy][this.pos.x + dx] = value;
        }
      })
    );
    this.clearLines();
    this.spawnShape();
  }

  clearLines() {
    let lines = 0;
    this.board = this.board.filter(row => row.some(cell => !cell));

    lines = this.rows - this.board.length;
    while (this.board.length < this.rows) {
      this.board.unshift(Array(this.cols).fill(0));
    }

    if (lines > 0) {
      const lineScore = [0, 100, 300, 500, 800][lines] || 1000;
      this.score += lineScore * this.level;
      this.linesCleared += lines;

      if (this.linesCleared >= 10) {
        this.level++;
        this.linesCleared = 0;
        this.increaseSpeed();
      }
    }
  }

  increaseSpeed() {
    this.dropSpeed = Math.max(100, this.dropSpeed - 50);
    this.startDropLoop();
  }

  drop() {
    if (!this.currentShape) return;
    this.pos.y++;
    if (this.collides()) {
      this.pos.y--;
      this.merge();
    }
    this.draw();
  }

  moveLeft() {
    if (!this.currentShape) return;
    this.pos.x--;
    if (this.collides()) this.pos.x++;
    this.draw();
  }

  moveRight() {
    if (!this.currentShape) return;
    this.pos.x++;
    if (this.collides()) this.pos.x--;
    this.draw();
  }

  moveDown() {
    if (!this.currentShape) return;
    this.drop();
  }

  rotate() {
    if (!this.currentShape) return;
    const rotated = this.currentShape[0].map((_: any, i: number) =>
      this.currentShape.map((row: number[]) => row[i])
    ).reverse();
    const prevShape = this.currentShape;
    this.currentShape = rotated;
    if (this.collides()) this.currentShape = prevShape;
    this.draw();
  }
}

























