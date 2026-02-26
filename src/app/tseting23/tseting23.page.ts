import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

/* Chart.js */
import { Chart } from 'chart.js';
import {
  PieController,
  BarController,
  LineController,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

/* Register all */
Chart.register(
  PieController,
  BarController,
  LineController,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-tseting23',
  templateUrl: './tseting23.page.html',
  styleUrls: ['./tseting23.page.scss'],
})
export class Tseting23Page implements OnInit {

  impact: any = {};
  ppm: any = {};

  corporatePie: any;
  corporateBar: any;
  ppmPie: any;
  ppmBar: any;
  corporateDoughnut: any;
  corporateGradientBar: any;
  corporateLine: any;
  ppmMiniBar: any;

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.getDashboard();
  }

  payload = {
    EmployeeID: localStorage.getItem('EmployeeID'),
    Status: ''
  };

  getDashboard() {
    this.ngxService.start();

    const url =
      'https://techxpertindia.in/api/dashboard/get_employee_dashboard_stats.php';

    this.http.post<any>(url, this.payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(res => {
      this.ngxService.stop();

      this.impact = res.data.Corporate;
      this.ppm = res.data.PPM;

      setTimeout(() => {
        this.loadCharts();
      }, 300);
    });
  }

  loadCharts() {
    this.loadCorporate();
    this.loadPPM();
    this.loadAdvanced();
  }

  loadCorporate() {
    this.corporatePie?.destroy();
    this.corporateBar?.destroy();

    this.corporatePie = new Chart('corporatePie', {
      type: 'pie',
      data: {
        labels: ['Pending', 'Closed', 'Cancel'],
        datasets: [{
          data: [this.impact.Pending, this.impact.Closed, this.impact.Cancel],
          backgroundColor: ['#017dc0', '#40b056', '#d12e27']
        }]
      }
    });

    this.corporateBar = new Chart('corporateBar', {
      type: 'bar',
      data: {
        labels: ['Pending', 'Closed', 'Assigned', 'Cancel'],
        datasets: [{
          data: [
            this.impact.Pending,
            this.impact.Closed,
            this.impact.Assigned,
            this.impact.Cancel
          ],
          backgroundColor: '#017dc0',
          borderRadius: 6
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });
  }

  loadPPM() {
    this.ppmPie?.destroy();
    this.ppmBar?.destroy();

    this.ppmPie = new Chart('ppmPie', {
      type: 'pie',
      data: {
        labels: ['Pending', 'Closed', 'Cancel'],
        datasets: [{
          data: [this.ppm.Pending, this.ppm.Closed, this.ppm.Cancel],
          backgroundColor: ['#017dc0', '#40b056', '#d12e27']
        }]
      }
    });

    this.ppmBar = new Chart('ppmBar', {
      type: 'bar',
      data: {
        labels: ['Pending', 'Closed', 'Assigned', 'Cancel'],
        datasets: [{
          data: [
            this.ppm.Pending,
            this.ppm.Closed,
            this.ppm.Assigned,
            this.ppm.Cancel
          ],
          backgroundColor: '#d12e27',
          borderRadius: 6
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });
  }

  loadAdvanced() {
    this.corporateDoughnut?.destroy();
    this.corporateLine?.destroy();
    this.ppmMiniBar?.destroy();

this.corporateGradientBar?.destroy();

this.corporateGradientBar = new Chart('corporateGradientBar', {
  type: 'bar',
  data: {
    labels: ['Pending', 'Closed', 'Assigned', 'Cancel'],
    datasets: [{
      label: 'Corporate Tickets',
      data: [
        this.impact.Pending || 0,
        this.impact.Closed || 0,
        this.impact.Assigned || 0,
        this.impact.Cancel || 0
      ],
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          return '#017dc0'; // fallback during initial render
        }

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );

        gradient.addColorStop(0, '#d12e27');
        gradient.addColorStop(1, '#017dc0');

        return gradient;
      },
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});


    this.corporateLine = new Chart('corporateLine', {
      type: 'line',
      data: {
        labels: ['Pending', 'Assigned', 'WIP', 'Closed'],
        datasets: [{
          data: [
            this.impact.Pending,
            this.impact.Assigned,
            this.impact['Work In Progress'],
            this.impact.Closed
          ],
          borderColor: '#017dc0',
          pointBackgroundColor: '#d12e27',
          pointRadius: 5,
          tension: 0.4
        }]
      }
    });

    this.ppmMiniBar = new Chart('ppmMiniBar', {
      type: 'bar',
      data: {
        labels: ['Pending', 'Closed', 'Cancel'],
        datasets: [{
          data: [this.ppm.Pending, this.ppm.Closed, this.ppm.Cancel],
          backgroundColor: ['#017dc0', '#40b056', '#d12e27'],
          borderRadius: 6
        }]
      },
      options: {
        plugins: { legend: { display: false } }
      }
    });
    this.corporateDoughnut?.destroy();

this.corporateDoughnut = new Chart('corporateDoughnut', {
  type: 'doughnut',
  data: {
    labels: ['Pending', 'Closed', 'Cancel'],
    datasets: [{
      data: [
        this.impact.Pending || 0,
        this.impact.Closed || 0,
        this.impact.Cancel || 0
      ],
      backgroundColor: ['#017dc0', '#40b056', '#d12e27']
    }]
  },
  options: {
    responsive: true,
    cutout: '65%',   // ✅ correct location
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

  }



  
}
