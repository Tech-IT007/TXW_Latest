import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-data',
  templateUrl: './audit-data.page.html',
  styleUrls: ['./audit-data.page.scss'],
})
export class AuditDataPage implements OnInit {

   selectedAudit: string = '';


  constructor() { }

  ngOnInit() {}

audits = [
  { name: 'Energy Audit', icon: 'flash-outline' },
  { name: 'Safety Audit', icon: 'shield-checkmark-outline' },
  { name: 'Electrical Audit', icon: 'bulb-outline' },
  { name: 'Environmental Audit', icon: 'leaf-outline' },
  { name: 'Facility Condition Audit', icon: 'business-outline' },
  { name: 'Compliance Audit', icon: 'document-text-outline' },
  { name: 'Operational Audit', icon: 'settings-outline' }
];

  

}
