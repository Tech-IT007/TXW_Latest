import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize,  } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MismatchModalPage } from '../mismatch-modal/mismatch-modal.page'; 
@Component({
  selector: 'app-barcode-scanning',
  templateUrl: './barcode-scanning.page.html',
  styleUrls: ['./barcode-scanning.page.scss'],
})
export class BarcodeScanningPage implements OnInit {
  scannedResults: any[] = [];
  isScanning: boolean = false;

  API_URL = '';
  QR_ID: any;
  ticketid: any;
  assets_code: any;
  status: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private alertController: AlertController,
    private iab: InAppBrowser,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    public router : Router,
     private modalCtrl: ModalController
  ) {
      
  }

  ngOnInit() {
    this.startScanning();
    this.ticketid = localStorage.getItem("BranchAssetID")
  console.log( "ticketid", this.ticketid)
       
  }

  // ✅ Start Scanning (High-Power)
  async startScanning() {
    this.isScanning = true;

    try {
      const data = await this.barcodeScanner.scan({
        preferFrontCamera: false,
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: false, // User can enable torch manually
        prompt: 'Place QR / Barcode inside the frame',
        resultDisplayDuration: 0,
        disableAnimations: true,
        disableSuccessBeep: false,
        orientation: 'portrait',

        // ✅ Enable ALL formats for black & white + color codes
        formats: 'QR_CODE,DATA_MATRIX,PDF_417,CODE_39,CODE_93,CODE_128,EAN_8,EAN_13,UPC_A,UPC_E,ITF'
      });

      if (!data.cancelled && data.text) {
        this.scannedResults.push({
          format: data.format,
          text: data.text,
          date: new Date().toLocaleString()
        });

        console.log("Scanned Code:", data.text);

        // ✅ Call API to verify scanned code
        this.verifyScannedCode(data.text);
      }
    } catch (error) {
      console.error(error);
      this.showToast('Error while scanning');
    } finally {
      this.isScanning = false;
    }
  }

  // ✅ Verify scanned code via API

async verifyScannedCode(scannedCode: string) {
  const loading = await this.loadingCtrl.create({
    message: 'Verifying scanned code...',
    spinner: 'crescent',
    backdropDismiss: false
  });
  await loading.present();

  const fullUrl = this.API_URL + scannedCode;
  console.log("API URL:", fullUrl);

  this.http.get(fullUrl)
    .pipe(finalize(() => loading.dismiss()))
    .subscribe({
      next: async (response: any) => {
        console.log("API Response raw:", response);

         this.status = response
         this.status =  this.status.status
           console.log(this.status)
        // If status === "success" -> QR already mapped -> show toast and route away
        if (this.status === 'success') {
          const toast = await this.toastController.create({
            message: '❌ This QR code is already mapped. Please scan another one.',
            duration: 3000,
         position: 'bottom',
          color: 'danger', 
          });
          await toast.present();
          alert("Again Scanning QR code")
          await this.startScanning()
          return; // VERY IMPORTANT: stop further execution
        }
        
        else{

          this.assets_code = response
          this.assets_code = this.assets_code.unique_code;

          localStorage.setItem('assets_code', this.assets_code);
          console.log("local_assets_code:", localStorage.getItem('assets_code'));
          this.openMismatchModal()
        }

      
        // Fallback if nothing matches
      }
    });
}
  // ✅ Open scanned URL inside the app
  openInSamePage(url: string) {
    this.iab.create(url, '_self', {
      location: 'no',
      zoom: 'yes',
      hideurlbar: 'yes',
      toolbar: 'yes'
    });
  }

  // ✅ Show toast messages
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
    });
    toast.present();
  }

  // ✅ Show alert messages
  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async openMismatchModal() {
  const modal = await this.modalCtrl.create({
    component: MismatchModalPage,  // <-- Your modal page
    cssClass: 'mismatch-modal',
    backdropDismiss: false // Prevent closing by clicking outside
  });

  return await modal.present();
}
}

