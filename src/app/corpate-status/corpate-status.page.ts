import { Component, OnInit } from "@angular/core";
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { ToastController, LoadingController } from "@ionic/angular";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { CalendarComponentOptions } from 'ion2-calendar'
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Component({
  selector: 'app-corpate-status',
  templateUrl: './corpate-status.page.html',
  styleUrls: ['./corpate-status.page.scss'],
})
export class CorpateStatusPage implements OnInit {

showTechModal = false;
showVendorModal = false;

selectedTechName = '';
selectedVendorName = '';

filteredTechList: any[] = [];
filteredVendorList: any[] = [];







openTechModal() {
  this.filteredTechList = [...this.mic];
  this.showTechModal = true;
}

closeTechModal() {
  this.showTechModal = false;
}

openVendorModal() {
  this.filteredVendorList = [...this.value];
  this.showVendorModal = true;
}

closeVendorModal() {
  this.showVendorModal = false;
}
selectTech(item: any) {
  this.bookingdata.AssignedTo = item.ID;
  this.selectedTechName = item.Name;
  this.closeTechModal();
}

selectVendor(item: any) {
  this.bookingdata.AssignedTo = item.ID;
  this.selectedVendorName = item.Name;
  this.closeVendorModal();
}


techSearchOptions = {
  header: 'Search Technician',
  inputs: [
    {
      name: 'search',
      type: 'text',
      placeholder: 'Search name...',
      handler: (input) => {
        this.filterTech(input.value);
      }
    }
  ]
};

vendorSearchOptions = {
  header: 'Search Vendor',
  inputs: [
    {
      name: 'search',
      type: 'text',
      placeholder: 'Search name...',
      handler: (input) => {
        this.filterVendor(input.value);
      }
    }
  ]
};
  showForm: boolean
  calculationForm: FormGroup
  calculation: FormGroup;
  costly = true

  Techxpert_cost: any;

  final_otp: any;


  befor = false
  vendo: boolean
  rocke: any = "None"

  valid_cost: any;
  booking: any = 'books';
  secoundimg_post: string;
  open4_post = false
  threeimg_post: string;
  Quotation: string = 'No';
  raise = true
  set: boolean = false;
  secoundimg: string;
  open4 = false
  threeimg: string;
  dateMulti: string[];
  type: 'string';
  checkbox: boolean = false;
  close_tickets: any;
  teemp = false

  spare = {
    "TicketID": localStorage.getItem("ID"),
    "SparePartDecs": ""
  }

  edit_data = {
    "TicketID": localStorage.getItem("ID"),
    "CallType": "",
  }

  cost = {
    "TicketID": localStorage.getItem("ID"),
  }

  dataToSend = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "pre_img"

  }
  dataTo_post = {
    "imageData": "",
    "TicketID": localStorage.getItem("ID"),
    "CreatedBy": localStorage.getItem("workname"),
    "Action": "post_img"

  }
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  img2_post = true

  open2_post = false
  open3_post = false
  ist_post = false
  add2_post = false
  three_post = false
  add_post = false

  img_post = true
  assgin: boolean

  isButtonDisabled: boolean = false;
  isButtonDisable: boolean = false



  toast: any;
  temp: any;
  DataToSend = {
    "TicketID": localStorage.getItem("ID"),

    "C_VisitorNo": "",
    "C_VisitCharge": "",
    "C_MaterialCost": "",
    "C_LabourCost": "",
    "C_TotalPrice": "",
    "T_VisitorNo": "",
    "T_VisitCharge": "",
    "T_MaterialCost": "",
    "T_LabourCost": "",
    "T_TotalPrice": "",
    "Status": "1"
  }
  bookingdata = {
    TicketID: localStorage.getItem("ID"),
    TicketStatus: "Assigned",
    UpdatedBy: "admin",
    AssignedTo: "",
    DueDate: localStorage.getItem("Date"),
    // Quotation: ""
    // "CallType":"Custumprice",
    // "ExpnsePrice":"Description",

  };
  isButtonDisabled_to: boolean = false;
  isButtonDis: boolean = false
  img2 = true
  Assgin_status = false
  open2 = false
  open3 = false
  ist = false
  add2 = false
  add22 = false
  three = false
  add = false

  img = true
  searchTerm: string;
  message: any;
  status_services: string = "otp"
  emp: any;


  vendor_ = {
    TicketID: localStorage.getItem("ID"),
    EmployeeType: "Vendor"
  };
  Tech = {
    TicketID: localStorage.getItem("ID"),
    EmployeeType: "Technician"
  }
  final_otp_price: any;
  services_data: any;
  clickedImage: string;
  clickedd: string
  clickedImage_post: string;
  closer: boolean;
  clicked: string;
  use: any;
  otp: any;
  userId: any;
  Test: any;
  view: any = {};
  obh: any;
  Users: any;
  impact_data: any;
  photo2: string
  test_variable: any;
  ID: any;

  dataToSends = {
    TicketID: localStorage.getItem("ID"),
  }
  rol: any
  pick: Boolean = false;
  photo: string
  role: any
  close = false
  open = false
  BookingID: any;
  mic: any;
  value: any;
  user: any
  impact: any = {};

  book: string;
  users: any;
  obj: any;
  data: any;
  postdata: any;
  profilepage: number;
  assin: any;
  deo: any;
  serve: any;
  order: any;
  image: any;
  status: Boolean = false;
  hidden: Boolean = true;
  wwe: Boolean = false;
  sign: Boolean = false;
  show = false
  Type: any;
  selectedValue: any;
  assginvalue: any;
  edit_value: any
  close_icon: boolean
  predata: any;
  isButtonDisabled11: boolean;
  isButtonDisabled22: boolean;
  isButtonDisabled33: boolean;
  hidd: boolean
  otr: boolean = true;
  grow: boolean = true
  imageUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    // private camera: Camera,
    private ngxService: NgxUiLoaderService,
    private androidPermissions: AndroidPermissions,
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.checkPermissions();
    this.spare.SparePartDecs = "No"
    this.edit_data.CallType = "OTR"
    this.emp = localStorage.getItem("empl_ID")
    console.log(this.emp)
    this.detailsview();


  }





filterTech(ev: any) {
  const val = ev.target.value.toLowerCase();

  this.filteredTechList = this.mic.filter(item =>
    item.Name.toLowerCase().includes(val)
  );
}

filterVendor(ev: any) {
  const val = ev.target.value.toLowerCase();

  this.filteredVendorList = this.value.filter(item =>
    item.Name.toLowerCase().includes(val)
  );
}



  checkPermissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => {
        if (!result.hasPermission) {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
        }
      },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
  }

  ngOnInit() {



    this.bookingdata.AssignedTo = "Assigned"

    // if(this.bookingdata.TicketStatus == undefined  || this.bookingdata.TicketStatus == "") this.bookingdata.TicketStatus = "Raise";
    this.rol = localStorage.getItem("ASSto")
    console.log(this.rol)

    this.role = localStorage.getItem("role")
    console.log(this.role)
    if (this.role == "Vendor" || this.role == "Technician") {
      this.close = false
      this.raise = false
      this.hidden = true
    } else {
      this.close = true
      this.raise = true
      this.hidden = false
    }

    if (this.role == "Vendor" || this.role == "Technician") {
      this.open = true

    }
    else {
      this.open = false
    }
    if (this.role == "Vendor" || this.role == "Technician") {
      this.wwe = false

    }
    else {
      this.wwe = true
    }
    if (this.role == "Vendor" || this.role == "Technician") {
      this.closer = true
      this.grow = false

    }
    else {
      this.closer = false
      this.grow = true
    }





  }

  detailsview() {
    this.Get()

  }

  Get() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params.BookingID) {
        this.dataToSends.TicketID = params.BookingID;

        this.BookingID = params.BookingID
        console.log(this.BookingID)

        this.predata = 0
      }

      this.Getdata();
      this.Service_status()


    })
  }
  Getdata() {


    this.ngxService.start()



    var url = "https://techxpertindia.in/api/get_corporate_ticket_detail.php";
    return this.http
      .post(url, this.dataToSend, {
        headers: new HttpHeaders({ "content-Type": "application/json" }),
      })
      .subscribe((response) => {
        console.log(response);
        this.ID = response
        console.log(this.ID)
        this.ID = this.ID.data.ID
        this.ID = localStorage.setItem("ID", this.ID)
        this.ID = localStorage.getItem("ID")
        // alert(this.ID)
        this.rol = response
        this.rol = this.rol.data.AssignedTo


        this.bookingdata.AssignedTo = this.rol

        this.order = response;
        this.order = this.order.data.EmployeeName
        console.log(this.order)

        this.impact = response;
        this.impact = this.impact.data;
        console.log(this.impact);
        this.temp = response
        this.temp = this.temp.data.length
        console.log(this.temp)

        if (this.temp == "0") {
          this.show = true

        } else {
          this.show = false
        }

        this.Type = response;
        this.Type = this.Type.data.Type
        console.log(this.Type)

        if (this.Type == "AMC") {
          this.teemp = true
        } else {
          this.teemp = false
        }
        this.ngxService.stop();
      });


  }

  onSelectChange(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)
    if (this.selectedValue == "None") {
      this.Assgin_status = true
      this.raise = false

    }


  }


  SelectChange(event: any) {
    this.assginvalue = event.detail.value;
    console.log(this.assginvalue)
    if (this.assginvalue == this.emp) {
      this.set = false
      this.raise = true

    } else {
      this.bookingdata.TicketStatus = "Assigned"
      this.set = true
      this.raise = false

    }
  }

  onSelect_Tech(event: any) {
    this.assginvalue = event.detail.value;
    console.log(this.assginvalue)
    if (this.assginvalue == this.emp) {
      this.set = false
      this.raise = true

    } else {
      this.bookingdata.TicketStatus = "Assigned"
      this.set = true
      this.raise = false

    }
  }
  // vendor() {

  //   var url = "https://techxpertindia.in/api/get_assigned_to_list_v2.php";
  //   return this.http.post(url, this.vendor_).subscribe((data) => {
  //     console.log(data);
  //     this.mic = data;
  //     this.mic = this.mic.data
  //     console.log(this.mic)
  //   });
  // }
  // Techech() {

  //   var url = "https://techxpertindia.in/api/get_assigned_to_list_v2.php";
  //   return this.http.post(url, this.Tech).subscribe((data) => {
  //     console.log(data);
  //     this.value = data;
  //     this.value = this.value.data
  //     console.log(this.value)
  //   });
  // }
  Service_status() {
    this.ngxService.start()
    setTimeout(() => {
      this.ngxService.stop();

      var url = "https://techxpertindia.in/api/get_corporate_ticket_status_v2.php";
      return this.http.post(url, this.status_services).subscribe((data) => {
        console.log(data);
        this.use = data;
        this.otp = this.use
        console.log(this.obj)
        this.serve = data
        console.log(this.serve)
      });
    }, 100);
  }


  row = true



  Service_Change_Status() {
    if (window) {

      if (this.bookingdata.AssignedTo == "" ||
        this.bookingdata.DueDate == ""
        // this.dataTo_post.imageData  == ""

      ) {

        this.toast = this.toastController
          .create({
            message: "Empty Fields",
            duration: 2000,
          })
          .then((toastData) => {
            console.log(toastData);
            toastData.present();
          });
      } else {



        this.ngxService.start();
        var url = "https://techxpertindia.in/api/change_ticket_status.php";
        return this.http.post(url, this.bookingdata).subscribe((data) => {
          console.log(data);
          this.users = data;
          this.obj = this.users;

          console.log(this.obj);
          let navigationExtras: NavigationExtras = {
            queryParams: {
              BookingID: this.BookingID
            }
          }
          this.router.navigate(["corprate-tickets"], navigationExtras)
          this.ngxService.stop();
        });
      }
    }


  }


  showe() {
    if (this.checkbox) {

      this.checkbox = false

    }
    else {
      this.checkbox = true
    }

  }



  onSelect(event: any) {
    this.edit_value = event.detail.value;
    console.log(this.edit_value)
    if (this.edit_value == "Yes" && this.Type == "AMC") {
      var url = "https://techxpertindia.in/api/add_spare_item_status.php";
      return this.http.post(url, this.spare).subscribe((data) => {

        console.log(data);
        this.users = data;
        this.obj = this.users;

        console.log(this.obj);
        this.hidd = true

        this.grow = false
      })

    }
    if (this.edit_value == "No") {

      this.hidd = false
      this.grow = true
    }


  }



  onassgin(event: any) {
    this.edit_value = event.detail.value;
    console.log(this.edit_value)

    if (this.edit_value == "emp") {

      this.assgin = true
      this.vendo = false
    } else if (this.edit_value == "Tech") {

      this.vendo = true
      this.assgin = false


    }

 

  }





  Remark = false;

  onSelectRemark(event: any) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)
    if (this.selectedValue) {
      this.Remark = true

    }


  }


vendor() {
  var url = "https://techxpertindia.in/api/get_assigned_to_list_v2.php";

  this.http.post(url, this.vendor_).subscribe((data: any) => {
    this.mic = data.data;
    this.filteredTechList = [...this.mic];
  });
}

Techech() {
  var url = "https://techxpertindia.in/api/get_assigned_to_list_v2.php";

  this.http.post(url, this.Tech).subscribe((data: any) => {
    this.value = data.data;
    this.filteredVendorList = [...this.value];
  });
}












}

