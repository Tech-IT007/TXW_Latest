import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login'); // change to your page
      }, 10000);
    });
  }
}