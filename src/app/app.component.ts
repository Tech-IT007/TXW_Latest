import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
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

  appversion = '4.5';
  user: any = {};
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
      this.initApp();
    });
  }

  // =========================================
  // 🚀 APP INIT (MAIN ENTRY)
  // =========================================
  initApp() {
    this.requestNotificationPermission();
    this.checkCameraPermission();
    this.version_update();

    const username = localStorage.getItem('workname');

    if (username) {
      this.initPush();       // ✅ only if logged in
      this.runHttp();        // ✅ fetch user data
      this.router.navigate(['/vendor-new-page']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // =========================================
  // 🔥 PUSH NOTIFICATION SETUP
  // =========================================
  initPush() {

    this.localNotifications.requestPermission();

    // ✅ GET TOKEN
    this.firebase.getToken().then(token => {
      console.log('FCM TOKEN:', token);
      localStorage.setItem('fcm_token', token);
      this.saveTokenToServer(token);
    });

    // ✅ TOKEN REFRESH
    this.firebase.onTokenRefresh().subscribe(token => {
      console.log('TOKEN REFRESH:', token);
      localStorage.setItem('fcm_token', token);
      this.saveTokenToServer(token);
    });

    // ✅ RECEIVE NOTIFICATION
    this.firebase.onMessageReceived().subscribe(async (data: any) => {

      console.log("🔥 PUSH DATA:", data);

      const title = data.title || data.data?.title || "Techxpert";
      const body = data.body || data.data?.body || "New Notification";

      // ✅ CLICK EVENT
      if (data.tap) {
        const route = data?.data?.route || '/vendor-new-page';
        this.router.navigate([route]);
        return;
      }

      // ✅ FOREGROUND NOTIFICATION
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

    const empId = localStorage.getItem('EmployeeID');

    if (!empId) {
      console.log('⚠️ No EmployeeID, skipping token save');
      return;
    }

    const url = 'https://techxpertindia.in/api/save-device-token.php';

    const body = {
      UserID: empId,
      DeviceToken: token,
      Platform: "Android"
    };

    this.http.post(url, body).subscribe({
      next: () => console.log('✅ Token saved successfully'),
      error: () => console.log('❌ Token save failed')
    });
  }

  // =========================================
  // 🔄 APP UPDATE CHECK
  // =========================================
  version_update() {

    const url = 'https://techxpertindia.in/api/get_user_app_version_new.php';

    this.http.post(url, { version: this.appversion }).subscribe({
      next: (res: any) => {

        if (!res || !res.version) return;

        const serverVersion = res.version.trim();
        const currentVersion = this.appversion.trim();

        if (this.isNewVersion(serverVersion, currentVersion)) {
          this.showUpdateModal();
        }
      },
      error: (err) => {
        console.log('❌ Version check failed', err);
      }
    });
  }

  // =========================================
  // 🔢 VERSION COMPARE
  // =========================================
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

  // =========================================
  // 🔔 SHOW UPDATE MODAL
  // =========================================
  async showUpdateModal() {

    const modal = await this.modalController.create({
      component: AppUpdateModalPage,
      backdropDismiss: false,
      cssClass: 'update-modal'
    });

    await modal.present();
  }

  // =========================================
  // 👤 FETCH USER DATA
  // =========================================
  runHttp() {

    const empId = localStorage.getItem('EmployeeID');

    if (!empId) return;

    const url = 'https://techxpertindia.in/api/get_employee_info.php';

    this.http.post(url, { EmployeeID: empId }).subscribe({
      next: (response: any) => {
        console.log('User Data:', response);
        this.users = response;
        this.user = this.users.data;
      },
      error: (err) => {
        console.log('❌ User fetch failed', err);
      }
    });
  }

  // =========================================
  // 🔔 NOTIFICATION PERMISSION (Android 13+)
  // =========================================
  requestNotificationPermission() {

    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.POST_NOTIFICATIONS
    ).then(result => {

      if (!result.hasPermission) {
        this.androidPermissions.requestPermission(
          this.androidPermissions.PERMISSION.POST_NOTIFICATIONS
        ).then(() => {
          console.log('✅ Notification permission granted');
        }).catch(err => {
          console.log('❌ Permission denied', err);
        });
      }

    });
  }

  // =========================================
  // 📷 CAMERA PERMISSION
  // =========================================
  async checkCameraPermission() {

    const result = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.CAMERA
    );

    if (!result.hasPermission) {
      await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.CAMERA
      );
    }
  }

  // =========================================
  // 🚪 LOGOUT
  // =========================================
  async logout() {

    const login = {
      UserID: localStorage.getItem('EmployeeID'),
      DeviceToken: localStorage.getItem('fcm_token')
    };

    this.http.post(
      'https://techxpertindia.in/api/logout.php',
      login
    ).subscribe({
      next: async () => {
        localStorage.clear();

        const toast = await this.toast.create({
          message: 'Logged out successfully',
          duration: 2000,
          color: 'success'
        });
        toast.present();

        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      error: async () => {
        localStorage.clear();

        const toast = await this.toast.create({
          message: 'Logout failed, cleared locally',
          duration: 2000,
          color: 'warning'
        });
        toast.present();

        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
  }

}