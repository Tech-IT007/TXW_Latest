import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dpr',
  templateUrl: './dpr.page.html',
  styleUrls: ['./dpr.page.scss'],
})
export class DPRPage implements OnInit {
  taskList: any[] = [];
  loading = false;
  pendingTodayCount = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ionViewWillEnter() {
    this.getTaskList();
  }

  ngOnInit() {}

  getTaskList() {
    this.loading = true;
    const userdetails = { TicketID: localStorage.getItem('ID') };

    this.http
      .post('https://techxpertindia.in/api/get_all_task_list_by_ticket_id.php', userdetails)
      .subscribe({
        next: (response: any) => {
          this.taskList = response?.data || [];

          // Animate each progress bar
          this.taskList.forEach((task: any) => {
            const val = parseFloat(task.Progress) || 0;
            task.animatedProgress = 0;
            this.animateProgress(task, val);
          });

          // 🔴 Count today's pending tasks (0% progress)
       this.pendingTodayCount = this.taskList.filter((task: any) => {
  if (!task?.StartDate || !task?.EndDate) return false;

  const today = new Date().toISOString().split('T')[0];
  const start = new Date(task.StartDate).toISOString().split('T')[0];
  const end = new Date(task.EndDate).toISOString().split('T')[0];
  const progress = parseFloat(task.Progress) || 0;

  // Check if today is between start and end date
  return today >= start && today <= end && progress === 0;
}).length;


          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  // ✅ Animate progress (0 → actual value)
  animateProgress(task: any, target: number) {
    const duration = 1000; // 1 sec
    const steps = 30;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        task.animatedProgress = Math.round(target);
        clearInterval(interval);
      } else {
        task.animatedProgress = Math.round(current);
      }
    }, duration / steps);
  }

  getProgressBarValue(progress: any): number {
    const val = parseFloat(progress);
    if (isNaN(val) || val < 0) return 0;
    if (val > 100) return 1;
    return val / 100;
  }

  getProgressColor(progress: any): string {
    const val = parseFloat(progress);
    if (isNaN(val) || val < 0) return 'medium';
    if (val < 30) return 'danger';
    if (val < 100) return 'warning';
    return 'success';
  }

  // ✅ Highlight when StartDate = Today & progress = 0
  isTodayAndZeroProgress(task: any): boolean {
    if (!task?.StartDate) return false;
    const today = new Date().toISOString().split('T')[0];
    const startDate = new Date(task.StartDate).toISOString().split('T')[0];
    return startDate === today && parseFloat(task.animatedProgress) === 0;
  }
viewDetails(task: any) {
  const taskId = task.ID;
  localStorage.setItem('TaskID', taskId);

  const progress = parseFloat(task.animatedProgress) || 0;

  // 🔵 Save Progress of this task in LocalStorage
  localStorage.setItem('TaskProgress', progress.toString());

  if (progress >= 100) {
    this.router.navigateByUrl('/dp-list2');
  } else {
    this.router.navigateByUrl('/dpr-id-list');
  }
}
downloadPDF() {
  const ticketID = localStorage.getItem('ID');

  if (!ticketID) {
    console.error("Ticket ID not found in localStorage");
    return;
  }

  const pdfUrl = `https://techxpertindia.in/admin/corporate-tickets/action/generate-dpr-report?TicketID=${ticketID}`;

  // Open in new tab
  window.open(pdfUrl, '_blank');
}

}
