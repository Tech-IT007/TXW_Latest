import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ups-battery',
  templateUrl: './ups-battery.page.html',
  styleUrls: ['./ups-battery.page.scss'],
})
export class UPSBATTERYPage implements OnInit {

  questions = [
    { name: 'No unwanted combustible material stored in the UPS room', status: '', remark: '' },
    { name: 'Batteries are clean and properly racked', status: '', remark: '' },
    { name: 'Terminals are clear of carbon', status: '', remark: '' },
    { name: 'Petroleum jelly is applied to the terminals', status: '', remark: '' },
    { name: 'Battery interconnection wires are not loose', status: '', remark: '' },
    { name: 'Interconnects have thimbles and are not just twisted', status: '', remark: '' },
    { name: 'Battery bank is free of dead or weak battery', status: '', remark: '' },
    { name: 'Battery impedance results are within standard range', status: '', remark: '' },
    { name: 'UPS room temperature is within 23 ± degree Celsius', status: '', remark: '' },
    { name: 'AMC is in place for UPS and other critical equipment', status: '', remark: '' },
    { name: 'All batteries are of equal size and capacities', status: '', remark: '' },
    { name: 'UPS cover plates are installed and appropriate', status: '', remark: '' },
    { name: 'All wires are properly dressed', status: '', remark: '' },
    { name: 'UPS and battery bank body is earthed', status: '', remark: '' },
    { name: 'Neutral is earthed', status: '', remark: '' },
    { name: 'No leakage / seepage in UPS or battery room', status: '', remark: '' },
    { name: 'Updated emergency contact list is displayed in UPS / battery room', status: '', remark: '' },
    { name: 'CO2 fire extinguisher is placed inside UPS / battery room', status: '', remark: '' }
  ];

  constructor() {}

  ngOnInit() {}

}




