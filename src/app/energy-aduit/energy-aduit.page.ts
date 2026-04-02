import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-energy-aduit',
  templateUrl: './energy-aduit.page.html',
  styleUrls: ['./energy-aduit.page.scss'],
})
export class EnergyAduitPage implements OnInit {

  questions = [
    { name: 'Wiring is done through conduit', status: '', remark: '' },
    { name: 'There are no open wires', status: '', remark: '' },
    { name: 'There are no loose wires in branch', status: '', remark: '' },
    { name: 'There are no wires which require conduits', status: '', remark: '' },
    { name: "MCB’s, ELCB’s are free of dust and cobwebs", status: '', remark: '' },
    { name: 'There is a plate cover at the electrical outlet on the walls', status: '', remark: '' },
    { name: 'All equipment have a plug top', status: '', remark: '' },
    { name: 'Rubber mats are available at the LT panel', status: '', remark: '' },
    { name: 'LT panel is earthed', status: '', remark: '' },
    { name: 'LED light LUX level/Illumination found satisfactory', status: '', remark: '' },
    { name: 'Gland used for cable entry points in all DB’s', status: '', remark: '' },
    { name: 'Instantaneous load unbalancing found', status: '', remark: '' },
    { name: 'Earth pits are available for the LT panel', status: '', remark: '' },
    { name: 'Earth pit is well maintained', status: '', remark: '' },
    { name: 'Electrical room and panel is free of combustible materials', status: '', remark: '' },
    { name: 'CO2 fire extinguisher is placed near electrical panel', status: '', remark: '' },
    { name: 'No leakage / seepage inside electrical room', status: '', remark: '' },
    { name: 'Spike guard/extension boards are mounted and secured', status: '', remark: '' },
    { name: 'Electrical switches are properly secured and not exposed', status: '', remark: '' },
    { name: 'Heavy electrical appliances have independent supply ports', status: '', remark: '' },
    { name: 'ACs are in good condition and not leaking', status: '', remark: '' },
    { name: 'AMC is in place for ACs and other critical equipment', status: '', remark: '' },
    { name: 'Pump room is clean and well maintained', status: '', remark: '' },
    { name: 'Periodic maintenance of pump room motors and gauges is carried out', status: '', remark: '' },
    { name: 'No signs of rats or rodents inside the electrical room', status: '', remark: '' },
    { name: 'Periodic rodent control activity is carried out', status: '', remark: '' },
    { name: 'Higher rating MCB found after lower rating MCB', status: '', remark: '' },
    { name: 'No direct connection without protection switchgear', status: '', remark: '' }
  ];

  constructor() {}

  ngOnInit() {}

}






















