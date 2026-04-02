import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  targets: any[] = [];
  score = 0;
  gameStarted = false;
  timeLeft = 30;

  gameInterval: any;
  timerInterval: any;

  // 🔊 Sounds
  shootSound = new Audio('assets/sounds/shoot.mp3');
  hitSound = new Audio('assets/sounds/hitt.mp3');
  missSound = new Audio('assets/sounds/miss.mp3');

  constructor() {}

  ngOnInit() {
    // Preload sounds (optional)
    this.shootSound.load();
    this.hitSound.load();
    this.missSound.load();
  }

  // ▶️ Start Game
  startGame() {
    this.score = 0;
    this.timeLeft = 30;
    this.targets = [];
    this.gameStarted = true;

    this.spawnTargets();

    // ⏱ Timer
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.gameOver();
      }
    }, 1000);
  }

  // 🎯 Spawn Targets
  spawnTargets() {
    this.gameInterval = setInterval(() => {
      this.targets.push({
        x: Math.random() * 260,
        y: Math.random() * 460
      });

      // Limit targets
      if (this.targets.length > 5) {
        this.targets.shift();
      }
    }, 800);
  }

  // 🔫 Shoot Function (FIXED)
  shoot(event: any) {
    if (!this.gameStarted) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let isHit = false;

    this.targets = this.targets.filter(target => {
      const size = 50;

      const hit =
        clickX > target.x &&
        clickX < target.x + size &&
        clickY > target.y &&
        clickY < target.y + size;

      if (hit) {
        isHit = true;
        this.score += 10;
        this.playSound(this.hitSound);
      }

      return !hit;
    });

    // 🔊 Always play shoot sound
    this.playSound(this.shootSound);

    // ❌ Miss sound
    if (!isHit) {
      this.playSound(this.missSound);
    }
  }

  // 🔊 Play Sound Safely
  playSound(sound: HTMLAudioElement) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  // 🛑 Game Over
  gameOver() {
    clearInterval(this.gameInterval);
    clearInterval(this.timerInterval);
    this.gameStarted = false;

    alert('🎮 Game Over! Score: ' + this.score);
  }

}



