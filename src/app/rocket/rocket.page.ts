import { NgxUiLoaderModule } from "ngx-ui-loader";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.page.html',
  styleUrls: ['./rocket.page.scss'],
})
export class RocketPage implements OnInit {


  constructor(

    public router: Router,
  ) {




  }

  ngOnInit() { }

  logout() {


    this.router.navigate(["vendor-new-page"])
  }


  next() {
    this.router.navigate(["corprate-tickets"])
  }
    net(){
      this.router.navigate(["home"])
    }
}









