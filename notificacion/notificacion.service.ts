import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  sendNotification(notif: string): void {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission == 'granted') {
          new Notification(notif);
        }
      });
    }
  }
}