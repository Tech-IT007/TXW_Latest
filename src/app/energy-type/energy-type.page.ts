
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-energy-type',
  templateUrl: './energy-type.page.html',
  styleUrls: ['./energy-type.page.scss'],
})
export class EnergyTypePage implements OnInit {

   selectedAudit: string = '';


  constructor() { }

  ngOnInit() {}

audits = [
  { name: 'Electrical Audit', icon: 'flash-outline' },
  { name: 'UPS Battery Bank Audit', icon: 'battery-charging-outline' },
  { name: 'Fire Detection System Audit', icon: 'flame-outline' },
  { name: 'Emergency Preparedness Audit', icon: 'alert-circle-outline' },
  { name: 'Stabilizer Audit', icon: 'swap-horizontal-outline' }
];
  

}





