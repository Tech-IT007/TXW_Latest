import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-camera-details',
  templateUrl: './view-camera-details.page.html',
  styleUrls: ['./view-camera-details.page.scss'],
})
export class ViewCameraDetailsPage implements OnInit {
  taskDetails: any = null;
  loading: boolean = true;
  Images:any

  constructor(private http: HttpClient) {}
temp :any = {}
  ngOnInit() {
    this.getTaskDetails();
  }

  getTaskDetails() {
    const userdetails = {
      TaskProgressID:  localStorage.getItem('TaskProgressID_camera_details'),
    };

    this.http
      .post('https://techxpertindia.in/api/get-all-progress-task-details.php', userdetails)
      .subscribe((response)=>{
        console.log(response)
       this.temp = response
       this.temp = this.temp.data
       console.log(this.temp)
       this.Images = response
       this.Images = this.Images.data.Images
       console.log(this.Images)
       this.loading = false 
      });
  }
}
