import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera as CapacitorCamera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
type SectionKey = 'pre' | 'post' | 'service';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.page.html',
  styleUrls: ['./technician.page.scss'],
})
export class TechnicianPage implements OnInit, OnDestroy {

  // UI flags & model
  button = false; // Submit enabled only when mandatory items done
  DPR_done = false;
  otr = true;
  show = false;
  open = true;
  teemp = false;

  impact: any = {};
  imgg: any[] = [];

  post_not_done = true;
  post_done = false;
  pre_not_done = true;
  pre_done = false;

  services_not_done = true;   // DIGITAL SERVICE REPORT (MANDATORY)
  services_done = false;

  DPR_show = false;
preImages: string[] = [];
postImages: string[] = [];
serviceImages: string[] = [];

  preImageSrc: string | null = null;
  postImageSrc: string | null = null;
  serviceImageSrc: string | null = null;

  isButtonDisabled11 = false;
  isButtonDisabled22 = false;
  isButtonDisabled = false;

  sections: Array<any> = [];

  // payload templates (TicketID and CreatedBy will be refreshed from storage/query params in Get)
  dataToSend = {
    imageData: '',
    TicketID: localStorage.getItem('ID'),
    CreatedBy: localStorage.getItem('workname'),
    Action: 'pre_img',
  };
spart_part ={
  "TicketID": localStorage.getItem('ID'),
  "AssetsID":localStorage.getItem('branch_tickets_history_id'),
  "EmployeeID"  :localStorage.getItem("empl_ID")
}

  dataTo_post = {
    imageData: '',
    TicketID: localStorage.getItem('ID'),
    CreatedBy: localStorage.getItem('workname'),
    Action: 'post_img',
  };

  dataToSendd = {
    imageData: '',
    TicketID: localStorage.getItem('ID'),
    CreatedBy: localStorage.getItem('workname'),
    Action: 'Service Report',
  };

  feedbackresponse = {
    TicketID: localStorage.getItem('ID'),
  };

  DPR_not_done = true;
  general_services: any = null;

  private destroy$ = new Subject<void>();
  spare_value:any;
  spare_not_upate: boolean;
  catgory_id: any;
  SparePartStatus: any;
  Not_approve: boolean;
  approve: boolean;
  Submitted: boolean;
  Not_show: any;
  button_disbale: boolean;
  Testing: boolean;

  constructor(
    private androidPermissions: AndroidPermissions,
    private actionSheetCtrl: ActionSheetController,
    private ngxService: NgxUiLoaderService,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // permission & view init
    this.checkCameraPermission() 
    this.initSections();
  }

  spare_update : boolean

  ngOnInit() {
    this.Get();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Enable submit only when mandatory items complete
  updateSubmitButtonState() {
    const preOK = !!this.pre_done;
    const postOK = !!this.post_done;
    const digitalOK = !!this.services_done; // mandatory

    this.button = preOK && postOK && digitalOK;
  }

  initSections() {
    this.sections = [
      { key: 'pre', name: 'Pre Image', src: this.preImageSrc, done: this.pre_done, not_done: this.pre_not_done, disable: this.isButtonDisabled22 },
      { key: 'post', name: 'Post Image', src: this.postImageSrc, done: this.post_done, not_done: this.post_not_done, disable: this.isButtonDisabled },
      { key: 'service', name: 'Service Report', src: this.serviceImageSrc, done: false, not_done: false, disable: this.isButtonDisabled11 }
    ];
  }

  refreshSections() {
    this.sections = [
      {
        key: 'pre',
        name: 'Pre Image',
        src: this.preImageSrc,
        done: this.pre_done,
        not_done: this.pre_not_done,
        disable: this.isButtonDisabled22
      },
      {
        key: 'post',
        name: 'Post Image',
        src: this.postImageSrc,
        done: this.post_done,
        not_done: this.post_not_done,
        disable: this.isButtonDisabled
      },
      {
        key: 'service',
        name: 'Service Report',
        src: this.serviceImageSrc,
        done: false,
        not_done: false,
        disable: this.isButtonDisabled11
      }
    ];

    this.updateSubmitButtonState();
  }

  // Camera permission (basic)
async checkCameraPermission() {
  const result = await this.androidPermissions.checkPermission(
    this.androidPermissions.PERMISSION.CAMERA
  );

  if (!result.hasPermission) {
    await this.androidPermissions.requestPermission(
      this.androidPermissions.PERMISSION.CAMERA
    );
  }
}

  // Fetch ticket details (reads BookingID from queryParams if present)
  Get() {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params && params.BookingID) {
        this.dataToSend.TicketID = params.BookingID;
        this.dataTo_post.TicketID = params.BookingID;
        this.dataToSendd.TicketID = params.BookingID;
        this.feedbackresponse.TicketID = params.BookingID;
      }
      this.Getdata();
    });
  }
Getdata() {
  this.ngxService.start();

  const url = 'https://techxpertindia.in/api/get_corporate_ticket_detail.php';
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.post(url, this.dataToSend, { headers }).subscribe(
    (response: any) => {
      this.ngxService.stop();

      const data = response?.data || {};
      this.impact = data;
      this.imgg = data.ticket_images || [];

      this.post_done = Number(data.PostImg || 0) !== 0;
      this.post_not_done = !this.post_done;

      this.pre_done = Number(data.PreImg || 0) !== 0;
      this.pre_not_done = !this.pre_done;

      this.services_done = Number(data.GeneralServiceReport || 0) !== 0;
      this.services_not_done = !this.services_done;

      this.teemp = data.Type === 'AMC';

      this.DPR_done = Number(data.IsProjectCompleted || 0) === 1;
      this.DPR_not_done = !this.DPR_done;
      this.SparePartStatus = response
      this.SparePartStatus =  this.SparePartStatus.data.SparePartStatus
      console.log("Spare_part", this.SparePartStatus)

if (this.SparePartStatus === 'Submitted' || this.SparePartStatus === 'Verified') {
  this.Submitted = true;
  this.Not_show = false;
} else {
  this.Submitted = false;
  this.Not_show = true;
}

      if(this.SparePartStatus == 'Approved'){
      this.approve = true;
      
      this.Submitted = false;
      this.Not_show = false;
      }
     
if (
  this.SparePartStatus === 'Submitted' ||
  this.SparePartStatus === 'Verified'
) {
  this.Testing = false; // disable
} else if (
  this.SparePartStatus === 'Approved' ||
  this.SparePartStatus === 'Pending'  || 
  this.SparePartStatus === 'undefined'
) {
  this.Testing = true; // enable
}else{
  this.Testing = true;
}


      this.general_services = response
      this.general_services = this.general_services.data.GeneralServiceReportID
      console.log(this.general_services)
      this.general_services = localStorage.setItem("Genral_services_report", this.general_services)

      this.refreshSections();
    }
  );
}

  // Show action sheet for camera/gallery
  async openCameraOptions(target: SectionKey) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Take Photo',
          icon: 'camera',
          handler: () => this.takePictureForTarget('camera', target)
        },
        {
          text: 'Choose from Gallery',
          icon: 'image',
          handler: () => this.takePictureForTarget('gallery', target)
        },
        { text: 'Cancel', role: 'cancel' }
      ]
    });

    await actionSheet.present();
  }

  // Camera capture using Capacitor
async takePictureForTarget(
  sourceChoice: 'camera' | 'gallery',
  target: SectionKey
) {
  try {
    const source =
      sourceChoice === 'camera'
        ? CameraSource.Camera
        : CameraSource.Photos;

    const photo = await CapacitorCamera.getPhoto({
      quality: 70,
      resultType: CameraResultType.Base64,
      source,
      correctOrientation: true,
      presentationStyle: 'fullscreen',
      saveToGallery: true,
      allowEditing: false,
      direction: CameraDirection.Rear
    });

    const base64Data = photo?.base64String;
    if (!base64Data) {
      await this.presentToast('Unable to capture image.');
      return;
    }

    const preview = `data:image/jpeg;base64,${base64Data}`;

    // ✅ MULTIPLE IMAGE SUPPORT (NO LOGIC REMOVED)
    if (target === 'pre') {
      this.preImageSrc = preview;           // existing
      this.preImages.push(preview);         // NEW
      this.dataToSend.imageData = base64Data;
      this.uploadImage(this.dataToSend, 'pre');

    } else if (target === 'post') {
      this.postImageSrc = preview;
      this.postImages.push(preview);
      this.dataTo_post.imageData = base64Data;
      this.uploadImage(this.dataTo_post, 'post');

    } else {
      this.serviceImageSrc = preview;
      this.serviceImages.push(preview);
      this.dataToSendd.imageData = base64Data;
      this.uploadImage(this.dataToSendd, 'service');
    }

    this.refreshSections();

  } catch (err: any) {
    const msg = err?.message?.toLowerCase() || '';
    if (
      msg.includes('cancel') ||
      msg.includes('permission')
    ) {
      return;
    }

    console.error('Camera error', err);
    await this.presentToast('Error capturing image. Please try again.');
  }
}


  uploadImage(payload: any, target: SectionKey) {
    this.ngxService.start();

    const url = 'https://techxpertindia.in/api/get_capture_image.php';
    const body = { data: payload };

    this.http.post(url, body).pipe(takeUntil(this.destroy$)).subscribe(
      (res: any) => {
        // Refresh local state from server or optimistically mark uploaded
        this.GetdataAfterUpload(target);
      },
      (err) => {
        this.ngxService.stop();
        console.error('uploadImage error', err);
        this.presentToast('Failed to upload image.');
      }
    );
  }

  GetdataAfterUpload(target: SectionKey) {
    if (target === 'pre') {
      this.pre_done = true;
      this.pre_not_done = false;
      this.isButtonDisabled22 = true;
    }

    if (target === 'post') {
      this.post_done = true;
      this.post_not_done = false;
      this.isButtonDisabled = true;
    }

    if (target === 'service') {
      // service image is optional → don't mark mandatory, but set disabled
      this.isButtonDisabled11 = true;
      // if service upload should flip services_done to true, enable this line:
      // this.services_done = true;
      // this.services_not_done = false;
    }

    this.refreshSections();
    this.ngxService.stop();
    this.presentToast('Image uploaded successfully.');
  }

  report() {
    this.router.navigateByUrl('/services-report');
  }

  feedbackStatus() {
    const api = 'https://techxpertindia.in/api/get-feedback-status.php';
    this.http.post(api, this.feedbackresponse).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (!response?.error) {
          this.Service_Change_Status();
        } else {
          this.router.navigateByUrl('/feedback-page');
        }
      },
      (err) => {
        console.error('feedbackStatus error', err);
        this.presentToast('Unable to check feedback status.');
      }
    );
  }

  Service_Change_Status() {
    this.ngxService.start();

    const url = 'https://techxpertindia.in/api/change_ticket_status.php';
    const OTP = {
      TicketID: localStorage.getItem('ID'),
      TicketStatus: 'Generate OTP to Close',
      UpdatedBy: localStorage.getItem('workname'),
      AssignedTo: localStorage.getItem('empl_ID'),
      DueDate: localStorage.getItem('Date')
    };

    this.http.post(url, OTP).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.ngxService.stop();
        this.router.navigate(['opt-submit'], { queryParams: { BookingID: this.impact?.TicketID } });
      },
      (err) => {
        this.ngxService.stop();
        console.error('Service_Change_Status error', err);
        this.presentToast('Failed to change ticket status.');
      }
    );
  }

  async presentToast(msg: string, duration = 1800) {
    const t = await this.toastController.create({ message: msg, duration });
    await t.present();
  }

  add_spare_part (){
    var api = "https://techxpertindia.in/api/add_to_cart_spare_part.php"
    return this.http.post(api , this.spart_part).subscribe((response)=>{
      console.log(response)
      this.spare_value = response
      this.spare_value = this.spare_value.CartID
     localStorage.setItem("Spare_cart_id", this.spare_value)
      this.router.navigateByUrl('/submit-spare-part')
    })
  }


deleteImage(ID: string, index: number) {
  const data = {
    TicketID: localStorage.getItem('ID'),
    ImageID: ID
  };

  this.http.post("https://techxpertindia.in/api/delete_r_n_m_ticket_image.php", data)
    .subscribe((res: any) => {

      if (res?.error === "False") {
        // Remove from UI
        this.imgg.splice(index, 1);
    
      } else {
        console.log("Delete failed:", res);
      }
    this.Getdata()
    },);
}


}
