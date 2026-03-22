import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
@Component({
  selector: 'app-barcode-info',
  templateUrl: './barcode-info.page.html',
  styleUrls: ['./barcode-info.page.scss'],
})
export class BarcodeInfoPage implements OnInit {
  branch_view: any[] = [];
  allBranches: any[] = [];
  filteredBranchList: any[] = [];
  assets_view: any[] = [];
  filteredAssetsList: any[] = [];
// Readable Address
  address: any;

  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };
  selectedBranch: string = '';
  selectedBranchName: string = '';
  selectedAsset: string = '';
  selectedAssetName: string = '';

  page = 1;
  limit = 20;
  hasMoreBranches = true;
  isLoading = false;
  searchLoaded = false;

  userdetails = { BranchID: '' };
  unique_code: any;
unique_brnach_id = {
  UniqueCode: ''
};
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private androidPermissions: AndroidPermissions,
        private locationAccuracy: LocationAccuracy,
        private platform: Platform,
  ) {
    this.chckAppGpsPermission()
  }

  ngOnInit() {
    this.loadBranches();
  }

  ionViewWillEnter() {
    if (this.selectedBranch) {
      this.getBranchAssets(this.selectedBranch);
    }
  }

  /** Loader */
  async presentLoader(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'circles',
      duration: 1000,
      translucent: true,
    });
    await loading.present();
  }

  /** Toast */
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  /** Load paginated branches */
  async loadBranches(event?: any) {
    if (this.isLoading || !this.hasMoreBranches) {
      if (event) event.target.complete();
      return;
    }

    this.isLoading = true;
    const api = 'https://techxpertindia.in/api/get_all_branch_v1.php';
    const body = { page: this.page.toString(), limit: this.limit.toString() };

    if (!event) await this.presentLoader('Loading branches...');

    this.http.post(api, body).subscribe({
      next: (response: any) => {
        const newBranches = response.data || [];
        this.branch_view = [...this.branch_view, ...newBranches];
        this.filteredBranchList = [...this.branch_view];
        if (newBranches.length < this.limit) this.hasMoreBranches = false;
        this.page++;
      },
      
      error: () => {
        this.presentToast('Failed to load branches', 'danger');
      },
      complete: () => {
        this.isLoading = false;
        if (event) event.target.complete();
      },
    });
  }

  /** Infinite Scroll */
  loadMore(event: any) {
    this.loadBranches(event);
  }

  /** Search Branches */
  async filterBranches(event: any) {
    const term = event.target.value?.trim().toLowerCase() || '';

    if (!term) {
      this.filteredBranchList = [...this.branch_view];
      return;
    }

    if (!this.searchLoaded) {
      this.searchLoaded = true;
      await this.presentLoader('Loading all branches...');
      const api = 'https://techxpertindia.in/api/get_all_branch_v1.php';

      this.http.get(api).subscribe({
        next: (response: any) => {
          this.allBranches = response.data || [];
          this.filteredBranchList = this.allBranches.filter((b: any) =>
            b.BranchSite.toLowerCase().includes(term)
          );
        },
        error: () => {
          this.presentToast('Search failed', 'danger');
        },
      });
    } else {
      this.filteredBranchList = this.allBranches.filter((b: any) =>
        b.BranchSite.toLowerCase().includes(term)
      );
    }
  }

  /** Select Branch */
  selectBranch(branch: any) {
    this.selectedBranch = branch.ID;
    this.selectedBranchName = branch.BranchSite;
    this.getBranchAssets(branch.ID);
  }

  /** Clear Selected Branch (Go Back) */
  clearSelectedBranch() {
    this.selectedBranch = '';
    this.selectedBranchName = '';
    this.filteredAssetsList = [];
    this.assets_view = [];
  }

  /** Fetch Branch Assets */
  async getBranchAssets(branchID: string) {
    this.userdetails.BranchID = branchID;
    const api = 'https://techxpertindia.in/api/get_branch_assets_v2.php';

    await this.presentLoader('Loading assets...');
    this.http.post(api, this.userdetails).subscribe((response: any) => {
      this.assets_view = response.data || [];
      this.filteredAssetsList = [...this.assets_view];
    });
  }

  /** Filter Assets */
  filterAssets(event: any) {
    const term = event.target.value?.toLowerCase() || '';
    this.filteredAssetsList =
      term === ''
        ? [...this.assets_view]
        : this.assets_view.filter((a) =>
            a.EquipmentName.toLowerCase().includes(term)
          );
  }

  /** Continue to Barcode Scanning */
  continue() {
    this.router.navigateByUrl('/barcode-scanning');
  }

  /** Select Asset */
  selectAsset(asset: any) {
    this.selectedAsset = asset.ID;
    this.selectedAssetName = asset.EquipmentName;
    localStorage.setItem('AssetsID', this.selectedAsset);
    this.continue();
  }
  
  //////////////////////////////////////////////////////////////////////////
  async unassignAsset(asset: any) {
  this.unique_brnach_id.UniqueCode = asset.UniqueCode;
alert(this.unique_brnach_id.UniqueCode)
  const api = 'https://techxpertindia.in/api/banch-assets-qr-code/unassign-assets-on-qr.php';

  const loader = await this.loadingCtrl.create({
    message: 'Unassigning asset...',
    spinner: 'circles',
    translucent: true,
  });
  await loader.present();

  this.http.post(api, this.unique_brnach_id).subscribe({
    next: async () => {
      await loader.dismiss();
      this.presentToast('Asset unassigned successfully', 'success');
      asset.IsMapedQR = '0';
    },
    error: async () => {
      await loader.dismiss();
      this.presentToast('Failed to unassign asset', 'danger');
    }
  });
}

chckAppGpsPermission() {

  this.androidPermissions.checkPermission(
    this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
  ).then(
    (result) => {

      if (result.hasPermission) {

        this.requestToSwitchOnGPS();

      } else {

        this.askGPSPermission();

      }

    },
    (err) => {
      alert(err);
    }
  );

}
 askGPSPermission() {

  this.locationAccuracy.canRequest().then((canRequest: boolean) => {

    if (canRequest) {

      this.requestToSwitchOnGPS();

    } else {

      this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
      ).then(

        () => {
          this.requestToSwitchOnGPS();
        },

        (error) => {
          alert('Permission denied ' + error);
        }

      );

    }

  });

}
requestToSwitchOnGPS() {

  this.locationAccuracy.request(
    this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
  ).then(

    () => {

      this.getGeolocation();

    },

    (error) => {

      alert('GPS Error ' + JSON.stringify(error));

    }

  );

}

async getGeolocation() {

  this.geolocation.getCurrentPosition({

    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0

  }).then((resp) => {

    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    this.accuracy = resp.coords.accuracy;

    console.log("Latitude:", this.latitude);
    console.log("Longitude:", this.longitude);
    console.log("Accuracy:", this.accuracy);

    localStorage.setItem('latitude', this.latitude.toString());
    localStorage.setItem('longitude', this.longitude.toString());

    this.getGeoencoder(this.latitude, this.longitude);

  }).catch((error) => {

    console.error("Location Error", error);
    alert("Unable to fetch location");

  });

}

async getGeoencoder(latitude: number, longitude: number) {

  try {

    const result: NativeGeocoderResult[] =
      await this.nativeGeocoder.reverseGeocode(
        latitude,
        longitude,
        this.geoencoderOptions
      );

    if (result && result.length > 0) {

      this.address = this.generateShortCleanAddress(result[0]);

      localStorage.setItem('address', this.address);

      console.log("Address:", this.address);

    } else {

      this.address = "Address not found";

    }

  } catch (error) {

    console.error("Geocoder Error", error);

    this.address = "Unable to fetch address";

  }

}
generateShortCleanAddress(addressObj: any): string {

  const parts = [];

  if (addressObj.subThoroughfare) parts.push(addressObj.subThoroughfare);
  if (addressObj.thoroughfare) parts.push(addressObj.thoroughfare);
  if (addressObj.subLocality) parts.push(addressObj.subLocality);
  if (addressObj.locality) parts.push(addressObj.locality);

  if (addressObj.administrativeArea) {

    let state = addressObj.administrativeArea.trim().toLowerCase();

    const stateShortcuts = {

      'uttar pradesh': 'UP',
      'madhya pradesh': 'MP',
      'maharashtra': 'MH',
      'delhi': 'DL',
      'karnataka': 'KA',
      'tamil nadu': 'TN',
      'west bengal': 'WB',
      'bihar': 'BR',
      'rajasthan': 'RJ',
      'gujarat': 'GJ'

    };

    state = stateShortcuts[state] || addressObj.administrativeArea;

    parts.push(state);

  }

  const uniqueParts = [...new Set(parts)];

  if (addressObj.postalCode) {

    return `${uniqueParts.join(', ')} - ${addressObj.postalCode}`;

  } else {

    return uniqueParts.join(', ');

  }

}














}
