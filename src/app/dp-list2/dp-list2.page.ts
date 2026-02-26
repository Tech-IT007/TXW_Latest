import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dp-list2',
  templateUrl: './dp-list2.page.html',
  styleUrls: ['./dp-list2.page.scss'],
})
export class DpList2Page implements OnInit {
  taskProgressList: any[] = [];
  loading = false;

  user_details = {
    TaskID: localStorage.getItem("TaskID")
  };
pick_user_id = {
TaskProgressID: localStorage.getItem("TaskID")
}
  constructor(private http: HttpClient, private router: Router) {}
  ionViewWillEnter()
  {
   this.getTaskProgressDetails();
      this.showpicks()
  }
  ngOnInit() {
  }

  // ✅ Fetch all task progress
  getTaskProgressDetails() {
    this.loading = true;
    this.http.post('https://techxpertindia.in/api/get_all_task_progress_details_by_task_id.php', this.user_details)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response && response.data) {
            this.taskProgressList = response.data.map((item: any) => {
              const finalValue = this.getProgressValue(item.Status);
              return {
                ...item,
                progress: 0,
                finalProgress: finalValue,
                showUpdate: this.shouldShowUpdate(item.TaskDate),
                statusClass: this.getStatusClass(item.Status)
              };
            });
            this.animateProgressBars();
          } else {
            this.taskProgressList = [];
          }
        },
        (error) => {
          this.loading = false;
          console.error('Error fetching task progress details', error);
        }
      );
  }

  // ✅ Animate progress bar
  animateProgressBars() {
    const interval = setInterval(() => {
      let allDone = true;
      this.taskProgressList.forEach((task) => {
        if (task.progress < task.finalProgress) {
          task.progress = Math.min(task.progress + 0.01, task.finalProgress);
          allDone = false;
        }
      });
      if (allDone) clearInterval(interval);
    }, 30);
  }

  // ✅ Convert status to progress %
  getProgressValue(status: any): number {
    if (!status) return 0;
    const numeric = Number(status);
    if (!isNaN(numeric)) {
      return Math.min(numeric / 100, 1);
    }

    switch ((status + '').toLowerCase()) {
      case 'completed':
      case 'done':
        return 1;
      case 'in progress':
      case 'ongoing':
        return 0.6;
      case 'pending':
      case 'not started':
        return 0.2;
      default:
        return 0;
    }
  }

  // ✅ Show Update button only for today and future TaskDates
  shouldShowUpdate(taskDate: string): boolean {
    if (!taskDate) return false;

    try {
      const apiDate = new Date(taskDate);
      const today = new Date();

      // Normalize both to ignore time zone and time parts
      apiDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      // ✅ Show only if TaskDate is today or in future
      return apiDate >= today;
    } catch {
      return false;
    }
  }

  // ✅ Status color CSS
  getStatusClass(status: any): string {
    const numeric = Number(status);
    if (!isNaN(numeric)) {
      if (numeric >= 80) return 'status-completed';
      if (numeric >= 40) return 'status-progress';
      return 'status-pending';
    }

    switch ((status + '').toLowerCase()) {
      case 'completed':
      case 'done':
        return 'status-completed';
      case 'in progress':
      case 'ongoing':
        return 'status-progress';
      case 'pending':
      case 'not started':
        return 'status-pending';
      default:
        return 'status-unknown';
    }
  }

  // ✅ Navigate to DPR Form
  router_to_DPRform(task: any) {
    localStorage.setItem("TaskProgressID", task.ID);
    localStorage.setItem("TaskDate", task.TaskDate);
    this.router.navigateByUrl("/dpr-form");
  }

  trackByIndex(index: number): number {
    return index;
  }


showpicks(){
  var api = "https://techxpertindia.in/api/view_dpr_images.php"
  return this.http.post(api , this.pick_user_id).subscribe((response)=>{
    console.log(response)
  })
}

 router_to_DPR_camera(task: any) {
    localStorage.setItem("TaskProgressID_camera_details", task.ID);
    this.router.navigateByUrl("/view-camera-details");
  }
}



