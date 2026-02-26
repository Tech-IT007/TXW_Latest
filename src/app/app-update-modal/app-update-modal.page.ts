import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-modal',
  templateUrl: './app-update-modal.page.html',
  styleUrls: ['./app-update-modal.page.scss'],
})
export class AppUpdateModalPage {
  constructor(private modalController: ModalController) {}

  // Optional: Close modal if needed
  closeModal() {
    this.modalController.dismiss();
  }
  updateApp() {
  window.open(
    'https://play.google.com/store/apps/details?id=io.ionic.txwworkapp&hl=en_IN',
    '_blank'
  );
}
}
