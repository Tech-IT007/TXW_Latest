import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera';
import { LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-raised-ticket',
  templateUrl: './raised-ticket.page.html',
  styleUrls: ['./raised-ticket.page.scss'],
})
export class RaisedTicketPage implements OnInit {
// ✅ Image Preview
imagePreview: string | null = null;
tempImageID: string = '';
  services: any[] = [];
  subServices: any[] = [];

  branchSites: any[] = [];
  filteredBranchSites: any[] = [];

  branchSiteModal = false;
  branchSiteSearch = '';
  selectedBranchSiteName = '';

  // ✅ Image
  clickedImage: string | null = null;
  images: string[] = [];
  temp_id: any;
  id: any;

  form = {
    serviceType: '',
    serviceId: '',
    subServiceId: '',
    branchSiteId: '',
    clientTicketId: '',
    CorporateID: '',
    priority: '',
    message: '',
  };

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
   private androidPermissions: AndroidPermissions,
  ) {
    
  }

  ngOnInit() {
    this.loadServices();
    this.loadBranchSites();
    this.checkCameraPermission() 
  }
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

  // ===============================
  // ✅ TOAST
  // ===============================
  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  // ===============================
  // ✅ LOADER
  // ===============================
  async presentLoader(message = 'Please wait...') {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }

  // ===============================
  // ✅ LOAD SERVICES
  // ===============================
  async loadServices() {
    const loader = await this.presentLoader('Loading Services...');
    this.http.get<any>('https://techxpertindia.in/api/get_all_categories.php')
      .subscribe(res => {
        this.services = res.data || [];
        loader.dismiss();
      }, _ => loader.dismiss());
  }

  // ===============================
  // ✅ LOAD SUB SERVICES
  // ===============================
  async loadSubServices(serviceId: any) {
    this.form.subServiceId = '';
    const loader = await this.presentLoader('Loading Sub Services...');

    this.http.post<any>(
      'https://techxpertindia.in/api/get_all_sub_services.php',
      { service_id: serviceId }
    ).subscribe(res => {
      this.subServices = res.data || [];
      loader.dismiss();
    }, _ => loader.dismiss());
  }

  // ===============================
  // ✅ LOAD BRANCH
  // ===============================
  async loadBranchSites() {
    const loader = await this.presentLoader('Loading Branch...');

    const userdetails = {
      EmployeeID: localStorage.getItem("EmployeeID")
    };

    this.http.post<any>(
      'https://techxpertindia.in/api/get_all_branch_account_name_by_account_manager.php',
      userdetails
    ).subscribe(res => {
      this.branchSites = res.data || [];
      this.filteredBranchSites = [...this.branchSites];
      loader.dismiss();
    }, _ => loader.dismiss());
  }

  openBranchSiteModal() {
    this.branchSiteModal = true;
  }

  filterBranchSite() {
    const val = this.branchSiteSearch.toLowerCase();

    this.filteredBranchSites = this.branchSites.filter((b: any) =>
      b.BranchSite?.toLowerCase().includes(val)
    );
  }

  selectBranchSite(branch: any) {
    this.form.branchSiteId = branch.ID;
    this.form.CorporateID = branch.CompanyID;
    this.selectedBranchSiteName = branch.BranchSite;
    this.branchSiteModal = false;
  }

  // ===============================
  // ✅ CAMERA
  // ===============================
async captureImage() {
  try {
    const photo = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      direction: CameraDirection.Rear
    });

    const imageData = photo.base64String;

    // Preview
    this.imagePreview = 'data:image/jpeg;base64,' + imageData;

    // Upload
    await this.uploadImage(imageData as string);

  } catch (err) {
    this.showToast('Camera failed');
  }
}

// ✅ Upload API
async uploadImage(imageData: string) {

  const loader = await this.presentLoader('Uploading...');

  try {
    const res: any = await firstValueFrom(
      this.http.post(
        'https://techxpertindia.in/api/capture_image_for_raise_ticket.php',
        { data: { imageData } }
      )
    );

    this.tempImageID = res.TempImageID;

    // ✅ Save for submit
    localStorage.setItem('admin_temp_ID', this.tempImageID);

    this.showToast('Image uploaded');

  } catch (err) {
    this.showToast('Upload failed');
  } finally {
    loader.dismiss();
  }
}

  async captureGallery() {
    try {
      const photo = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });

      const imageData = photo.base64String;
      this.clickedImage = 'data:image/jpeg;base64,' + imageData;

      await this.saveImage(imageData as string);

    } catch {
      this.showToast('Gallery failed');
    }
  }

  // ===============================
  // ✅ IMAGE UPLOAD
  // ===============================
  async saveImage(imageData: string) {

    const loader = await this.presentLoader('Uploading Image...');

    try {
      const res: any = await firstValueFrom(
        this.http.post(
          'https://techxpertindia.in/api/capture_image_for_raise_ticket.php',
          { data: { imageData } }
        )
      );

      this.id = res.TempImageID;

      // ✅ IMPORTANT FIX
      localStorage.setItem("admin_temp_ID", this.id);

      this.images.push(this.clickedImage!);
      this.showToast('Image uploaded');

    } catch {
      this.showToast('Upload failed');
    } finally {
      loader.dismiss();
    }
  }

  // ===============================
  // ✅ SUBMIT
  // ===============================
async submitTicket() {

  if (!this.form.serviceType ||
      !this.form.serviceId ||
      !this.form.subServiceId ||
      !this.form.branchSiteId ||
      !this.form.priority ||
      !this.form.message) {
    this.showToast('Fill all fields');
    return;
  }

  const loader = await this.presentLoader('Submitting...');

  const payload = {
    CorporateID: this.form.CorporateID,
    BranchID: this.form.branchSiteId,
    CreatedBy: localStorage.getItem("EmployeeID") || "",
    Type: this.form.serviceType,
    BranchAssetID: '-1',
    Subservice: this.form.subServiceId,
    Priority: this.form.priority,
    Action: 'CREATE',
    Message: this.form.message,
    Service: this.form.serviceId,
    ClientTicketID: this.form.clientTicketId || "",
    TempImageID: localStorage.getItem('admin_temp_ID') || "-1"
  };

  this.http.post(
    'https://techxpertindia.in/api/create_corporate_ticket_v2.php',
    payload
  ).subscribe({

    next: (res: any) => {
      loader.dismiss();

      // ✅ YOUR LOGIC
      if (res.error === true) {

        // ❌ ERROR CASE
        alert(res.message || 'Something went wrong ❌');

      } else {

        // ✅ SUCCESS CASE
        this.showToast('Ticket Submitted ✅');

        // Reset form
        this.form = {
          serviceType: '',
          serviceId: '',
          subServiceId: '',
          branchSiteId: '',
          CorporateID: '',
          clientTicketId: '',
          priority: '',
          message: '',
        };

        // Clear image temp ID
        localStorage.removeItem('admin_temp_ID');

        // Navigate
        setTimeout(() => {
          this.router.navigateByUrl('/vendor-new-page', { replaceUrl: true });
        }, 1000);
      }
    },

    error: (err) => {
      loader.dismiss();

      console.error(err);

      // Server error
      this.showToast('Server Error ❌');
    }

  });
}

}