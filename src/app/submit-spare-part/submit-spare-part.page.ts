import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, IonPopover } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-spare-part',
  templateUrl: './submit-spare-part.page.html',
  styleUrls: ['./submit-spare-part.page.scss'],
})
export class SubmitSparePartPage implements OnInit {

  @ViewChild('sparePartPopover') sparePartPopover!: IonPopover;

  spareParts: any[] = [];
  filteredSpareParts: any[] = [];

  selectedCategory: any;  
  selectedSparePart: any = null;
  quantity: number | null = null;

  ticketID: any;
  item: any[] = [];

  catagory_name: any;
  catagory_id: any;

  loading: boolean = false;
personal_details = {
  TicketID: localStorage.getItem("ID"),
}
  catogory_id: any;
  catogory_spare_id: any;
  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {

    this.ticketID = localStorage.getItem("ID");
    // Load category details from localStorage
    this.catagory_name = localStorage.getItem("CategoryName");
     console.log( "CATGORY_NAME",this.catagory_name)

  this.selectedCategory = this.catagory_name;
    // Set selected category by default
    this.selectedCategory = this.catagory_id;

    this.ticket_id()
    // Load cart items
    this.loadCartSpareParts();

    // Fetch spare parts using category_id
  
  }
spare_part_user = {
  Categories : ""
}
  // Fetch spare parts
  fetchSpareParts() {


    this.http.post<any>('https://techxpertindia.in/api/get-all-spare-part-by-category.php', this.spare_part_user)
      .subscribe({
        next: (res) => {
          this.spareParts = res?.data || [];
          this.filteredSpareParts = [...this.spareParts];
        }
      });
  }

  // Search spare parts
  filterSpareParts(event: any) {
    const val = event.target.value?.toLowerCase() || '';

    if (!val) {
      this.filteredSpareParts = [...this.spareParts];
      return;
    }

    this.filteredSpareParts = this.spareParts.filter(part =>
      part.SparePart.toLowerCase().includes(val)
    );
  }

  // Select spare part inside popover
  selectSparePart(part: any) {
    this.selectedSparePart = part;
    this.sparePartPopover.dismiss();
  }

  // Add spare part into cart
  addSparePart() {
    if (!this.selectedSparePart || !this.quantity || this.quantity <= 0) {
      this.showToast('Please select spare part and enter valid quantity');
      return;
    }

    const payload = {
      CartID: localStorage.getItem("Spare_cart_id"),
      TicketID: this.ticketID,
      SparePartID: this.selectedSparePart.ID,
      Qty: this.quantity
    };

    this.loading = true;

    this.http.post("https://techxpertindia.in/api/add_spare_part_item.php", payload)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          if (res?.error === false || res?.error === "false") {
            this.showToast('Spare part added successfully!');

            this.selectedSparePart = null;
            this.quantity = null;

            this.loadCartSpareParts();
          } else {
            this.showToast(res?.message || 'Failed to add spare part');
          }
        },
        error: () => {
          this.loading = false;
          this.showToast('API error! Please try again.');
        }
      });
  }

  loadCartSpareParts() {
    const payload = {
      CartID: localStorage.getItem("Spare_cart_id"),
      TicketID: this.ticketID
    };

    this.http.post("https://techxpertindia.in/api/get_spare_part_cart.php", payload)
      .subscribe((res: any) => {
        this.item = res?.Items || [];
      });
  }

  deleteSparePart(index: number) {
    const part = this.item[index];

    if (!part?.ID) {
      this.showToast("Invalid spare part!");
      return;
    }

    const payload = {
      CartID: localStorage.getItem("Spare_cart_id"),
      SparePartID: part.SparePartID
    };

    this.loading = true;

    this.http.post("https://techxpertindia.in/api/remove_spare_part_item.php", payload)
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          if (res?.error === false || res?.error === "false") {
            this.showToast("Spare part removed!");
            this.loadCartSpareParts();
          } else {
            this.showToast(res?.message || "Failed to delete spare part");
          }
        },
        error: () => {
          this.loading = false;
          this.showToast("API error! Please try again.");
        }
      });
  }

  submitParts() {
    const payload = {
      CartID: localStorage.getItem("Spare_cart_id"),
      SubmittedBy: localStorage.getItem("workname"),
      Remarks: "Parts required for field job"
    };

    this.http.post("https://techxpertindia.in/api/submit_spare_part_cart.php", payload)
      .subscribe(() => {
        localStorage.removeItem("Spare_cart_id");
        this.router.navigateByUrl("/technician");
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }



 ticket_id (){
  var api ='https://techxpertindia.in/api/get_corporate_ticket_detail.php';
  return this.http.post(api,this.personal_details).subscribe((response)=>{
    console.log(response)
    this.catogory_spare_id  = response
    this.catogory_spare_id  = this.catogory_spare_id.data.Category
    this.spare_part_user.Categories = this.catogory_spare_id
    console.log(this.catogory_spare_id )

      this.fetchSpareParts();
  })
 }


}
