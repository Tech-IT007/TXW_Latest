import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-branch-selector-modal',
  templateUrl: './branch-selector-modal.component.html',
  styleUrls: ['./branch-selector-modal.component.scss'],
})
export class BranchSelectorModalComponent implements OnInit {
  @Input() branches: any[] = [];
  filteredBranches: any[] = [];

  page = 1;
  limit = 20;
  hasMoreBranches = true;
  isLoading = false;

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.filteredBranches = [...this.branches];
  }

  filterBranches(event: any) {
    const val = event.target.value.toLowerCase();
    this.filteredBranches = this.branches.filter(b =>
      b.BranchSite.toLowerCase().includes(val)
    );
  }

  selectBranch(branch: any) {
    this.modalCtrl.dismiss(branch);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  /** Load next page of branches from API */
  loadMoreBranches(event: any) {
    if (this.isLoading || !this.hasMoreBranches) {
      event.target.complete();
      return;
    }

    this.isLoading = true;
    const api = 'https://techxpertindia.in/api/get_all_branch_v1.php';
    const body = { page: this.page.toString(), limit: this.limit.toString() };

    this.http.post(api, body).subscribe({
      next: (res: any) => {
        const newBranches = res.data || [];
        this.branches = [...this.branches, ...newBranches];
        this.filteredBranches = [...this.branches];

        if (newBranches.length < this.limit) this.hasMoreBranches = false;
        this.page++;
      },
      error: () => this.hasMoreBranches = false,
      complete: () => {
        this.isLoading = false;
        event.target.complete();
      }
    });
  }
}
