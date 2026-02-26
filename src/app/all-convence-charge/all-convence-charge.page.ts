import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-all-convence-charge',
  templateUrl: './all-convence-charge.page.html',
  styleUrls: ['./all-convence-charge.page.scss'],
})
export class AllConvenceChargePage implements OnInit {

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

      // Safe assign data
      this.obj = Array.isArray(res?.data) ? res.data : [];
      console.log('📋 Total Records:', this.obj.length);

      // Empty state
      this.show = this.obj.length === 0;

      // ✅ SAFE GRAND TOTAL CALCULATION (NO NaN)
      this.grandTotal = this.obj.reduce((sum, item) => {
        const amount = parseFloat(item?.ConvenienceAmount);
        return sum + (isNaN(amount) ? 0 : amount);
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
