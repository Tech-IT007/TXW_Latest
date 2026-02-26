import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController, Platform, MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  authStatetwo = new BehaviorSubject(true);
  messangerVar:any;
  Name:any;
  Cartlength:any;
  Cartdec:any;
  Cartinc:any;
 
  setmessangerVar() {
    this.messangerVar= localStorage.setItem("role",JSON.stringify(this.messangerVar));
   return this.messangerVar;
  }
  getmessangerVar() {
    this.messangerVar= localStorage.getItem("role");
   return this.messangerVar;
  }

  setName() {
    this.Name= localStorage.setItem("name",JSON.stringify(this.Name));
   return this.Name;
  }
  getName() {
    this.Name= localStorage.getItem("name");
   return this.Name;
  }

 

  setCartlength() {
    this.Cartlength= localStorage.setItem("cartlength",JSON.stringify(this.Cartlength));
   return this.Cartlength;
  }
  getCartlength() {
    this.Cartlength= localStorage.getItem("cartlength");
   return this.Cartlength;
  }


  setCartinc() {
    this.Cartinc= localStorage.setItem("cartinc",JSON.stringify(this.Cartinc));
   return this.Cartlength;
  }
  getCartinc() {
    this.Cartinc= localStorage.getItem("cartinc");
   return this.Cartinc;
  }


  setCartdec() {
    this.Cartdec= localStorage.setItem("cartdec",JSON.stringify(this.Cartdec));
   return this.Cartlength;
  }
  getCartdec() {
    this.Cartdec= localStorage.getItem("cartdec");
   return this.Cartdec;
  }

  constructor(
     private router: Router, 
    private storage: Storage, 
    private http: HttpClient,
    private platform: Platform, 
    public toastController: ToastController,
    public menuctrl:MenuController,
  ) { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
      this.ifLoggedIn1();
    });
    this.messangerVar = true;
    this.Cartlength = true;
    this.Name = true;
    this.Cartinc = true;
    this.Cartdec = true;
  }

    ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authStatetwo.next(false);
        this.authState.next(true);
        this.router.navigate(['/impact']);
        // console.log('Already Logged In');
      }
    });
  }

  ifLoggedIn1() {
    this.storage.get('USER_INFOs').then((response) => {
      if (response) {
        this.authStatetwo.next(false);
        this.authState.next(true);
        this.router.navigate(['/dlboy']);
        // console.log('Already Logged In');
      }
    });
  }

  login(return_response) {
    this.storage.set('USER_INFO', return_response).then((response) => {
      this.router.navigate(['/impact']);
      this.authStatetwo.next(false);
      this.authState.next(true);
      // console.log('Data Saved');
      this.menuctrl.enable(true);
    });
  }

  login1(return_response) {
    this.storage.set('USER_INFOs', return_response).then((response) => {
      this.router.navigate(['/dlboy']);
      this.authStatetwo.next(false);
      this.authState.next(true);
      // console.log('Data Saved');
      this.menuctrl.enable(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['/signin']);
      this.authStatetwo.next(true);
      this.authState.next(false);
      this.menuctrl.enable(false);
    });
  }

  logout1() {
    this.storage.remove('USER_INFOs').then(() => {
      this.router.navigate(['signin']);
      this.authStatetwo.next(true);
      this.authState.next(false);
      this.menuctrl.enable(false);
    });
  }
 
  isAuthenticated() {
    return this.authState.value;
  }

  isAuthenticatedtwo() {
    return this.authStatetwo.value;
  }
}
