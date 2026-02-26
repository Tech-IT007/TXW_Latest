import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-raised-ticket',
  templateUrl: './raised-ticket.page.html',
  styleUrls: ['./raised-ticket.page.scss'],
})
export class RaisedTicketPage implements OnInit {

  services: any[] = [];
  subServices: any[] = [];
  imagePreview: string | null = null;

  form = {
    serviceType: '',
    serviceId: '',
    subServiceId: '',
    clientTicketId: '',
    priority: '',
    message: '',
    attachment: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.http.get<any>('https://techxpertindia.in/api/get_all_services.php')
      .subscribe(res => {
        this.services = res.data || res;
      });
  }

  loadSubServices(subservice_id: any) {
    this.http.post<any>(
      'https://techxpertindia.in//api/get_all_sub_services.php',
      { service_id: subservice_id }
    ).subscribe(res => {
      this.subServices = res.data || res;
    });
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 70,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.imagePreview = image.dataUrl!;
    this.form.attachment = image.dataUrl!;
  }

  submitTicket() {
    console.log('Ticket Data:', this.form);
    // call submit ticket API here
  }
}
