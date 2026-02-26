import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

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
}
