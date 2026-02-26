import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { AppUpdateModalPage } from './app-update-modal/app-update-modal.page';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  appversion = '4.1';
  version: any;
  user: any = {}; // Initialize user object
  users: any;

  constructor(
    private platform: Platform,
    private router: Router,
    private http: HttpClient,
    private modalController: ModalController,
    private firebase: FirebaseX,
    private localNotifications: LocalNotifications,
    private toast: ToastController,
      private androidPermissions: AndroidPermissions
  ) {
    this.platform.ready().then(() => {
      // this.initPush();
       this.requestNotificationPermission();
      this.checkUserAndNavigate();
      this.version_update();
      this.runHttp();
      this.initPush();
    });
  }

  // =========================================
  // 🔥 PUSH NOTIFICATION SETUP
  // =========================================
initPush() {

  this.localNotifications.requestPermission();

  // GET TOKEN
  this.firebase.getToken().then(token => {
    localStorage.setItem('fcm_token', token);
    this.saveTokenToServer(token);
  });

  // TOKEN REFRESH
  this.firebase.onTokenRefresh().subscribe(token => {
    localStorage.setItem('fcm_token', token);
    this.saveTokenToServer(token);
  });

  // RECEIVE + CLICK HANDLER
  this.firebase.onMessageReceived().subscribe((data: any) => {

    console.log("🔥 PUSH DATA:", data);

    const title = data.title || data.data?.title || "Techxpert";
    const body = data.body || data.data?.body || "New Notification";

    // ⭐ IF USER CLICKED NOTIFICATION
    if (data.tap) {

      console.log("✅ Notification CLICKED");

      // REDIRECT HERE
      this.router.navigate(['/vendor-new-page']);

      return;
    }

    // ⭐ FOREGROUND ONLY
    this.localNotifications.schedule({
      id: Date.now(),
      title: title,
      text: body,
      foreground: true,
      smallIcon: 'res://icon',
      icon: 'res://icon',
      data: data
    });

  });

}

  // =========================================
  // 💾 SAVE TOKEN TO SERVER
  // =========================================
  saveTokenToServer(token: string) {
    const url = 'https://techxpertindia.in/api/save-device-token.php';
    const body = {
      UserID: localStorage.getItem('EmployeeID'),
      DeviceToken: token,
      Platform : "Android"

    };
    this.http.post(url, body).subscribe(
      () => console.log('✅ Token saved successfully'),
      () => console.log('❌ Token save failed')
    );
  }

  // =========================================
  // 🔀 LOGIN NAVIGATION
  // =========================================
  checkUserAndNavigate() {
    const username = localStorage.getItem('workname');
    if (username) {
      this.router.navigate(['/vendor-new-page']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // =========================================
  // 🔄 APP UPDATE CHECK
  // =========================================
version_update() {

  const url = 'https://techxpertindia.in/api/get_user_app_version_new.php';

  this.http.post(url, { version: this.appversion }).subscribe((res: any) => {

    const serverVersion = res?.version?.trim();
    const currentVersion = this.appversion?.trim();

    if (!serverVersion) return;

    if (this.isNewVersion(serverVersion, currentVersion)) {
      this.showUpdateModal();
    }

  });
}

  /* ============================
     VERSION COMPARE FUNCTION
  ============================= */
  isNewVersion(server: string, current: string): boolean {

    const s = server.split('.').map(Number);
    const c = current.split('.').map(Number);

    for (let i = 0; i < Math.max(s.length, c.length); i++) {

      const sv = s[i] || 0;
      const cv = c[i] || 0;

      if (sv > cv) return true;
      if (sv < cv) return false;
    }

    return false;
  }

  /* ============================
     SHOW UPDATE MODAL
  ============================= */
  async showUpdateModal() {

    const modal = await this.modalController.create({
      component: AppUpdateModalPage,
      backdropDismiss: false,
      cssClass: 'update-modal'
    });

    await modal.present();
  }


  // =========================================
  // 🔔 FETCH USER DATA & AUTOMATIC NOTIFICATION
  // =========================================
  runHttp() {
    const url = 'https://techxpertindia.in/api/get_employee_info.php';
    this.http.post(url, { EmployeeID: localStorage.getItem('EmployeeID') }).subscribe((response)=>{
      console.log('User Data:', response);
      this.users = response;
      this.user = this.users.data;
    })
    
  }

  // =========================================
  // 🔔 SEND AUTOMATIC NOTIFICATION
  // =========================================
requestNotificationPermission() {

  // Android 13+ only
  this.androidPermissions.checkPermission(
    this.androidPermissions.PERMISSION.POST_NOTIFICATIONS
  ).then(result => {

    if (!result.hasPermission) {

      this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.POST_NOTIFICATIONS
      ).then(res => {
        console.log('✅ Notification permission granted');
      }).catch(err => {
        console.log('❌ Permission denied', err);
      });

    } else {
      console.log('✅ Notification permission already allowed');
    }

  });

}

async logout() {

  const login = {
    UserID: localStorage.getItem('EmployeeID'),
    DeviceToken: localStorage.getItem('fcm_token')
  };

  this.http.post(
    'https://techxpertindia.in/api/logout.php',
    login
  ).subscribe({
    next: (res: any) => {
      // clear local storage after API success
      localStorage.clear();

      // redirect to login
      this.router.navigateByUrl('/login', { replaceUrl: true });
    },
    error: (err) => {
      // even if API fails, force logout
      localStorage.clear();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  });

}
}
