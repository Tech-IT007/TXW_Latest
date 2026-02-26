import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.page.html',
  styleUrls: ['./kpi.page.scss'],
})
export class KPIPage implements OnInit {

  // Date Filters
  startDate: string = '';
  endDate: string = '';

  // KPI Data
  attendance: any[] = [];
  assignment: any[] = [];
  closing: any[] = [];

  // KPI Percentages
  attendancePercent = 0;
  assignmentPercent = 0;
  closingPercent = 0;

  // Employee & Salary Data
  employeeName: string = '';
  employeeSalary: number = 0;
  overallPerformance: number = 0;
  finalSalary: number = 0;
  employeeDesignation: string = '';
  isRestrictedRole: boolean = false;

 restrictedRoles = [
  'executive',
  'sr. executive',
  'senior helpdesk',
  'purchase executive',
  'web developer',
  'app developer',
  'mis',
  'hr executive',
  'hr',
  'finance',
  'office staff'
];

constructor(private http: HttpClient, private modalCtrl: ModalController) {
  // Get designation and normalize
  this.employeeDesignation = (localStorage.getItem("Designation") || '').trim().toLowerCase();

  // Check if designation includes any restricted keyword (partial match)
  this.isRestrictedRole = this.restrictedRoles.some(role => {
    const keyword = role.toLowerCase().split(' ')[0]; // take key word like 'executive'
    return this.employeeDesignation.includes(keyword);
  });

  console.log('Employee Designation:', this.employeeDesignation);
  console.log('Is Restricted Role:', this.isRestrictedRole);
}

ngOnInit() {
  if (this.isRestrictedRole) {
    console.log('Restricted Role matched → Attendance only');
    this.setDefaultDates();
    this.getSalaryDetails();
    this.getAttendance();
  } 
  else if (this.employeeDesignation.toLowerCase().includes('technician')) {
    console.log('Technician matched → Attendance + Closing');
    this.setDefaultDates();
    this.getSalaryDetails();
    this.getAttendance();
    this.getClosingDetails();
  } 
  else {
    console.log('Normal Role → All KPIs');
    this.setDefaultDates();
    this.getSalaryDetails();
    this.getAttendance();
    this.getAssignment();
    this.getClosingDetails();
  }
}

  // Set previous month by default
  setDefaultDates() {
    const today = new Date();
    const firstDayPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const toIso = (d: Date) => d.toISOString().split('T')[0];

    this.startDate = toIso(firstDayPrevMonth);
    this.endDate = toIso(lastDayPrevMonth);
  }

  // Get employee name & salary
  getSalaryDetails() {
    const data = { employee: localStorage.getItem('EmployeeID') };
    this.http.post('https://techxpertindia.in/api/dashboard/get_employee_salary_details.php', data)
      .subscribe((res: any) => {
        if (res && res.success && res.data) {
          this.employeeName = res.data.EmployeeName || '';
          this.employeeSalary = Number(res.data.SalaryBreakup?.TotalSalary) || 0;
          this.updateOverallPerformance();
        }
      });
  }

  // Calculate overall performance and salary adjustment
updateOverallPerformance() {
  const att = Number(this.attendancePercent) || 0;
  const assign = Number(this.assignmentPercent) || 0;
  const close = Number(this.closingPercent) || 0;

  console.log('Role:', this.employeeDesignation);
  console.log('Attendance:', att, 'Assignment:', assign, 'Closing:', close);

  if (this.isRestrictedRole) {
    // Restricted → Attendance only
    this.overallPerformance = att;
  } 
  else if (this.employeeDesignation === 'technician') {
    // Technician → Attendance + Closing average
    this.overallPerformance = (att + close) / 2;
  } 
  else {
    // Others → Average of all 3
    this.overallPerformance = (att + assign + close) / 3;
  }

  const baseSalary = this.employeeSalary || 0;

  if (this.overallPerformance >= 90) {
    this.finalSalary = baseSalary;
    this.launchConfetti();
  } else {
    this.finalSalary = (baseSalary * this.overallPerformance) / 100;
  }

  this.finalSalary = Number(this.finalSalary.toFixed(2));

  console.log('Overall Performance:', this.overallPerformance);
  console.log('Final Salary:', this.finalSalary);
}



  // Attendance API
  getAttendance() {
    const data = {
      EmployeeID: localStorage.getItem('EmployeeID'),
      date_from: this.startDate,
      date_to: this.endDate
    };

    this.http.post('https://techxpertindia.in/api/dashboard/get_detailed_attendance.php', data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.attendance = Array.isArray(res.data) ? res.data : [res.data];
          if (this.attendance.length > 0) {
            this.animatePercentage('attendance', this.attendance[0]['Performance%']);
          }
        }
      });
  }

  // Assignment API
  getAssignment() {
    const data = {
      EmployeeID: localStorage.getItem('EmployeeID'),
      date_from: this.startDate,
      date_to: this.endDate
    };

    this.http.post('https://techxpertindia.in/api/dashboard/get_detailed_assignment_kpi.php', data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.assignment = Array.isArray(res.data) ? res.data : [res.data];
          if (this.assignment.length > 0) {
            this.animatePercentage('assignment', this.assignment[0]['Performance%']);
          }
        }
      });
  }

  // Closing KPI API
  getClosingDetails() {
    const data = {
      EmployeeID: localStorage.getItem('EmployeeID'),
      date_from: this.startDate,
      date_to: this.endDate
    };

    this.http.post('https://techxpertindia.in/api/dashboard/get_detailed_close.php', data)
      .subscribe((res: any) => {
        if (res && res.data) {
          this.closing = Array.isArray(res.data) ? res.data : [res.data];
          if (this.closing.length > 0) {
            this.animatePercentage('closing', this.closing[0]['Performance%']);
          }
        }
      });
  }

  // Animate KPI %
  animatePercentage(type: 'attendance' | 'assignment' | 'closing', value?: any) {
    let target = Number(value) || 0;
    let current = 0;
    const step = target / 50;

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      if (type === 'attendance') this.attendancePercent = current;
      if (type === 'assignment') this.assignmentPercent = current;
      if (type === 'closing') this.closingPercent = current;

      this.updateOverallPerformance(); // update dynamically
    }, 20);
  }

  // Dynamic color for KPI values
  getColor(value: number | string | undefined): string {
    const v = Number(value) || 0;
    if (v >= 80) return '#00C853'; // green
    if (v >= 50) return '#FFD600'; // yellow
    return '#D50000'; // red
  }

  // Apply date filter
  applyDateFilter() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    this.getAttendance();
    if (!this.isRestrictedRole) {
      this.getAssignment();
      this.getClosingDetails();
    }
  }

  // Confetti animation when 90%+ performance
  launchConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
