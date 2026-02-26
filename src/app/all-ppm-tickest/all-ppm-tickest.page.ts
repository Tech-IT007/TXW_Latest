import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-all-ppm-tickest',
  templateUrl: './all-ppm-tickest.page.html',
  styleUrls: ['./all-ppm-tickest.page.scss'],
})
export class AllPpmTickestPage {
notifications: any[] = [];
notificationCount = 0;
isNotificationOpen = false;
  constructor(
    private http: HttpClient,
    private toast: ToastController,
        private localNotifications: LocalNotifications,
          private notificationService: NotificationService
  ) {}

  // ======================================
  // 🔔 TRIGGER PUSH NOTIFICATION
  // ======================================
// async sendTestNotification(fromClick = false) {
//   const body = {
//     UserID: localStorage.getItem('EmployeeID'),
//     Title: 'New Booking Confirmed',
//     Body: 'Your booking has been confirmed successfully',
//     Screen: 'dashboard',
//     time: new Date()
//   };

//   // 🔔 Save notification in service
//   this.notificationService.addNotification(body);

//   // 🔥 Trigger server-side push
//   this.http.post('https://techxpertindia.in/api/trigger-event.php', body)
//     .subscribe({
//       next: (res: any) => console.log('✅ Push triggered:', res),
//       error: (err) => console.error('❌ Push error:', err)
//     });

//   // 🔕 Local notification
//   if (!fromClick) {
//     this.localNotifications.schedule({
//       id: Date.now(),
//       title: body.Title,
//       text: body.Body,
//       foreground: true,
//       data: body
//     });
//   }
// }


}
