
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ChecklistService } from '../services/checklist.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-panel-checklist',
  templateUrl: './panel-checklist.page.html',
  styleUrls: ['./panel-checklist.page.scss'],
})
export class PanelChecklistPage implements OnInit {
  checklistForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private checklistService: ChecklistService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.checklistForm = this.fb.group({
      Site: ['MSIL', Validators.required],
      Asset: ['Panel', Validators.required],
      Location: ['', Validators.required], 
      Frequency: ['Quaterly'],
      WorkGroup: ['Electrical'],
      lockTagOutNotice: [false],
      usePersonalProtectiveDevice: [false],
      removeDustFromPanel: [false],
      checkIndicationLamp: [false],
      checkMetersAndSwitches: [false],
      checkLooseConnections: [false],
      checkSurroundingCleaning: [false],
      checkMCCBSettings: [false],
      checkControlFuses: [false],
      checkTPNOutput: [false],
      removeSignboard: [false],
      ensureToolsleftOver: [false],
      acceptableLimits:[false],
      testData: [false],
      wasteCloth:[false],
      cRC:[false],
      sparesUsed: [''],
      toolBox: [false],
      electrianToolKit: [false],
      multimeter: [false],
      tongTester: [false],
      Remark: [''],
      TeamAndCondition: [true, Validators.required],
    });
  }

  // async submitForm() {
  //   if (this.checklistForm.valid) {
  //     this.checklistService.submitChecklist(this.checklistForm.value).subscribe(
  //       async res => {
  //         const toast = await this.toastController.create({
  //           message: 'Checklist submitted successfully!',
  //           duration: 2000,
  //           color: 'success'
  //         });
  //         toast.present();
  //         this.checklistForm.reset();
  //       },
  //       async err => {
  //         const toast = await this.toastController.create({
  //           message: 'Submission failed!',
  //           duration: 2000,
  //           color: 'danger'
  //         });
  //         toast.present();
  //       }
  //     );
  //   }
  // }
}
