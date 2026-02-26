import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-account-convence-charge',
  templateUrl: './account-convence-charge.page.html',
  styleUrls: ['./account-convence-charge.page.scss'],
})
export class AccountConvenceChargePage implements OnInit {

  obj: any[] = [];
  show = false;

  todayDate: string = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
grandTotal = 0;

  dataToSend = {
    EmployeeID: localStorage.getItem('EmployeeID')
  };

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.getConvenienceCharges();
  }

getConvenienceCharges(): void {
  console.log('🚀 Fetching conveyance charges...');
  this.ngxService.start();

  const url = 'https://techxpertindia.in/api/get_employee_covenience.php';
  console.log('📡 API URL:', url);
  console.log('📤 Payload:', this.dataToSend);

  this.http.post<any>(url, this.dataToSend).subscribe({
    next: (res) => {
      console.log('✅ API Response:', res);

      // Assign data safely
      this.obj = Array.isArray(res?.data) ? res.data : [];
      console.log('📋 Total Records:', this.obj.length);

      this.show = this.obj.length === 0;
      console.log('👀 Empty State (show):', this.show);

      // GRAND TOTAL calculation
      this.grandTotal = this.obj.reduce((total, item, index) => {
        const amount = Number(item?.ConvenienceAmount || 0);
        console.log(`💰 Record ${index + 1} Amount:`, amount);
        return total + amount;
      }, 0);

      console.log('🧮 GRAND TOTAL:', this.grandTotal);

      this.ngxService.stop();
      console.log('⛔ Loader stopped');
    },

    error: (err) => {
      console.error('❌ API Error:', err);
      this.ngxService.stop();
      this.obj = [];
      this.show = true;
      this.grandTotal = 0;
      this.presentToast('Something went wrong. Please try again.');
    }
  });
}



  /**
   * ✅ CHECK IF CREATED DATE IS TODAY
   * Supports: YYYY-MM-DD or YYYY-MM-DD HH:mm:ss
   */
  isToday(dateValue: string): boolean {
    if (!dateValue) return false;
    return dateValue.startsWith(this.todayDate);
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }
}


