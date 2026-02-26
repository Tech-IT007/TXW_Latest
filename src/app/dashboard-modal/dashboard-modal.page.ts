import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.page.html',
  styleUrls: ['./dashboard-modal.page.scss'],
})
export class DashboardModalPage implements OnInit {

  attendance: any[] = [];
  assignment: any[] = [];
  closing: any[] = [];

  attendancePercent = 0;
  assignmentPercent = 0;
  closingPercent = 0;

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getAttendance();
    this.getAssignment();
    this.getClosingDetails();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  // 🟢 ATTENDANCE API
  getAttendance() {
    const data = {
      EmployeeID: localStorage.getItem('EmployeeID'),
      date_from: '2025-03-01',
      date_to: '2025-03-31'
    };

    this.http.post('https://techxpertindia.in/api/dashboard/get_detailed_attendance.php', data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.attendance = Array.isArray(res.data) ? res.data : [res.data];
          if (this.attendance.length > 0) {
            this.animatePercentage('attendance', this.attendance[0]['Performance%']);
          }
        }
      });
  }

  // 🟠 ASSIGNMENT API
  getAssignment() {
    const data = {
      EmployeeID: localStorage.getItem('EmployeeID'),
      date_from: '2025-08-01',
      date_to: '2025-08-31'
    };

    this.http.post('https://techxpertindia.in/api/dashboard/get_detailed_assignment_kpi.php', data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.assignment = Array.isArray(res.data) ? res.data : [res.data];
          this.animatePercentage('assignment', this.assignment[0]['Performance%']);
        }
      });
  }

  // 🔵 CLOSING KPI API
  getClosingDetails() {
    const data = {
      EmployeeID: localStorage.getItem('EmployeeID'),
      date_from: '2025-09-01',
      date_to: '2025-09-25'
    };

    this.http.post('https://techxpertindia.in/api/dashboard/get_detailed_close.php', data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.closing = Array.isArray(res.data) ? res.data : [res.data];
          if (this.closing.length > 0) {
            this.animatePercentage('closing', this.closing[0]['Performance%']);
          }
        }
      });
  }

  // ⚙️ Animate circular % display
  animatePercentage(type: 'attendance' | 'assignment' | 'closing', value?: any) {
    let target = Number(value) || 0;
    let current = 0;
    const step = target / 50; // controls animation speed

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      if (type === 'attendance') this.attendancePercent = current;
      if (type === 'assignment') this.assignmentPercent = current;
      if (type === 'closing') this.closingPercent = current;
    }, 20);
  }

  // 🎨 Dynamic color based on % value
  getColor(value: number | string | undefined): string {
    const v = Number(value) || 0;
    if (v >= 80) return '#00C853'; // green
    if (v >= 50) return '#FFD600'; // yellow
    return '#D50000'; // red
  }
}
