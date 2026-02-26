import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Notifications array (BehaviorSubject reactive)
  private _notifications = new BehaviorSubject<any[]>([]);
  notifications$ = this._notifications.asObservable();

  constructor() {}

  // Add new notification
  addNotification(notification: any) {
    const current = this._notifications.value;
    this._notifications.next([notification, ...current]);
  }

  // Get count of notifications
  getNotificationCount(): number {
    return this._notifications.value.length;
  }
}
