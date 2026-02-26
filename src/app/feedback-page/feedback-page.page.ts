import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.page.html',
  styleUrls: ['./feedback-page.page.scss'],
})
export class FeedbackPagePage implements OnInit, OnDestroy {
  countdown: number = 60;
  blinkVisible: boolean = true;

  timerInterval: any;
  blinkInterval: any;
  pollInterval: any;

  apiUrl = 'https://techxpertindia.in/api/send_feebackback_link.php';

  OTP: any = {
    TicketID: localStorage.getItem('ID'),
    TicketStatus: 'Generate OTP to Close',
    UpdatedBy: localStorage.getItem('workname'),
    AssignedTo: localStorage.getItem('empl_ID'),
    DueDate: localStorage.getItem('Date'),
  };

  dataTosend = {
    phonenumber: '',
    TicketID: localStorage.getItem('ID'),
  };

  feedbackresponse = {
    TicketID: localStorage.getItem('ID'),
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

ngOnInit() {
  // Start continuous blink interval
  this.blinkInterval = setInterval(() => {
    if (this.countdown > 0) { // only blink while countdown > 0
      const element = document.querySelector('.timeout-box') as HTMLElement;
      if (element) {
        element.classList.add('blink');
        // Remove the class after 1s to allow next blink
        setTimeout(() => element.classList.remove('blink'), 1000);
      }
    } else {
      clearInterval(this.blinkInterval); // stop blinking when countdown reaches 0
    }
  }, 15000); // every 15 sec
}

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.blinkInterval) clearInterval(this.blinkInterval);
    if (this.pollInterval) clearInterval(this.pollInterval);
  }

  // async sendFeedback() {
  //   if (!this.dataTosend.phonenumber) {
  //     this.showToast('⚠️ Please enter Number');
  //     return;
  //   }

  //   this.countdown = 60;

  //   // Show loader
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Complete feedback please, otherwise OTP not generated',
  //     spinner: 'circles',
  //   });
  //   await loading.present();

  //   // Start countdown timer
  //   this.timerInterval = setInterval(() => {
  //     this.countdown--;
  //     if (this.countdown <= 0) {
  //       clearInterval(this.timerInterval);
  //       clearInterval(this.pollInterval);
  //       loading.dismiss();
  //       this.showToast('⏱️ Timeout! Redirecting to technician page');
  //       this.navCtrl.navigateForward('/technician');
  //     }
  //   }, 1000);

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   try {
  //     // Send feedback API
  //     const res: any = await this.http.post(this.apiUrl, this.dataTosend, { headers }).toPromise();
  //     this.showToast(res?.message || 'Feedback submitted successfully ✅');

  //     // Start polling every 5 seconds
  //     this.pollInterval = setInterval(async () => {
  //       try {
  //         const status: any = await this.http.post(
  //           'https://techxpertindia.in/api/get-feedback-status.php',
  //           this.feedbackresponse
  //         ).toPromise();

  //         if (status?.error === false) {
  //           clearInterval(this.pollInterval);
  //           clearInterval(this.timerInterval);
  //           await loading.dismiss();
  //           this.showToast('✅ Thank you for feedback!');
  //           this.Service_Change_Status();
  //           this.launchConfetti();
  //         }
  //       } catch (err) {
  //         console.error('Polling error', err);
  //       }
  //     }, 5000);

  //   } catch (error) {
  //     clearInterval(this.timerInterval);
  //     clearInterval(this.pollInterval);
  //     await loading.dismiss();
  //     this.showToast('❌ Something went wrong, try again');
  //     console.error('Feedback API Error:', error);
  //   }
  // }

async sendFeedback() {
  if (!this.dataTosend.phonenumber) {
    this.showToast('⚠️ Please enter Number');
    return;
  }

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  try {
    // Send feedback API
    const res: any = await this.http
      .post(this.apiUrl, this.dataTosend, { headers })
      .toPromise();

    this.showToast(res?.message || 'Your feedback for this number has been sent successfully 😊');

    // Directly change service status
    this.Service_Change_Status();
    // this.launchConfetti();

  } catch (error) {
    this.showToast('❌ Something went wrong, try again');
    console.error('Feedback API Error:', error);
  }
}





  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'dark',
    });
    toast.present();
  }

  async Service_Change_Status() {
    const url = 'https://techxpertindia.in/api/change_ticket_status.php';
    const loading = await this.loadingCtrl.create({
      message: 'OTP has been generated and sent to your WhatsApp.',
      spinner: 'circles',
    });
    await loading.present();

    this.http.post(url, this.OTP).subscribe({
      next: async (data: any) => {
        console.log('API Response:', data);
        await loading.dismiss();
        this.navCtrl.navigateForward('/opt-submit');
      },
      error: async (error) => {
        console.error('API Error:', error);
        await loading.dismiss();
        this.showToast('❌ Something went wrong. Please try again!');
      },
    });
  }

  // launchConfetti() {
  //   const duration = 2 * 1000;
  //   const end = Date.now() + duration;

  //   (function frame() {
  //     confetti({
  //       particleCount: 5,
  //       angle: 60,
  //       spread: 55,
  //       origin: { x: 0 },
  //     });
  //     confetti({
  //       particleCount: 5,
  //       angle: 120,
  //       spread: 55,
  //       origin: { x: 1 },
  //     });

  //     if (Date.now() < end) {
  //       requestAnimationFrame(frame);
  //     }
  //   })();
  // }
}
