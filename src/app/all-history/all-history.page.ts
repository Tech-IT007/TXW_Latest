import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-history',
  templateUrl: './all-history.page.html',
  styleUrls: ['./all-history.page.scss'],
  providers: [DatePipe] // ensure DatePipe is provided
})
export class AllHistoryPage implements OnInit {
  assetHistory: any;
  length: any;
  history: boolean;
  history_not_show: boolean;

  constructor(
    public router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    private datePipe: DatePipe
  ) {}

  assets_id = {
    asset_id: localStorage.getItem('branch_tickets_history_id')
  };

  ngOnInit() {
    this.all_history();
  }

  all_history() {
    const api =
      'https://techxpertindia.in/admin/branch-assets-qr-code/api/getAssetTicketHistory.php';
    this.http.post(api, this.assets_id).subscribe(
      (response: any) => {
        console.log('API response:', response);

        // keep original assignment as you had
        this.assetHistory = response;
        // normalize response.data to array
        const raw = response?.data ?? [];
        const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];

        // map data and format dates/times safely
        this.assetHistory = arr.map((item: any) => {
          return {
            ...item,
            // CreatedDate: show date + time (if available)
            CreatedDate: this.formatDateTime(item.CreatedDate,),

            // DueDate: show date only
            DueDate: this.formatDateOnly(item.DueDate),

            // CloseDate: show date only
            CloseDate: this.formatDateOnly(item.CloseDate),

            // CloseTime: show time only (will parse time-only strings like "14:38:31")
            CloseTime: this.formatTimeOnly(item.CloseTime, item.CloseDate)
          };
        });

        // preserve your existing length/flag logic
        this.length = response;
        this.length = this.length.data.length;
        if (this.length == '0') {
          this.history = true;
          this.history_not_show = false;
        } else {
          this.history = false;
          this.history_not_show = true;
        }
      },
      (err) => {
        console.error('API error:', err);
        this.history = true;
        this.history_not_show = false;
      }
    );
  }

  // ---------- helper functions ----------

  private isTimeOnly(str?: string): boolean {
    if (!str) return false;
    return /^\d{1,2}:\d{2}(:\d{2})?$/.test(str.trim());
  }

  /**
   * Build a Date object from a date string and/or a time-only string.
   * - If dateStr contains time or is ISO, parse it directly.
   * - If dateStr is date-only and timeStr is provided, set the hours from timeStr.
   * - If only timeStr is provided (e.g. "14:38:31"), use today's date with that time.
   */
  private parseDateFromParts(dateStr?: string, timeStr?: string): Date | null {
    try {
      // 1) dateStr with time or ISO-like strings
      if (dateStr) {
        // quick check for time inside dateStr or T separator
        if (dateStr.includes('T') || /\d{2}:\d{2}/.test(dateStr)) {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) return d;
        }

        // date-only (e.g. "2025-09-11")
        const dOnly = new Date(dateStr);
        if (!isNaN(dOnly.getTime())) {
          if (timeStr && this.isTimeOnly(timeStr)) {
            const parts = timeStr.split(':').map((p) => Number(p));
            dOnly.setHours(parts[0] || 0, parts[1] || 0, parts[2] || 0, 0);
          }
          return dOnly;
        }
      }

      // 2) time-only string provided, use today's date
      if (timeStr && this.isTimeOnly(timeStr)) {
        const now = new Date();
        const parts = timeStr.split(':').map((p) => Number(p));
        now.setHours(parts[0] || 0, parts[1] || 0, parts[2] || 0, 0);
        return now;
      }

      // 3) last try: parse dateStr as fallback
      if (dateStr) {
        const dFallback = new Date(dateStr);
        if (!isNaN(dFallback.getTime())) return dFallback;
      }
    } catch (e) {
      // parsing failed
    }
    return null;
  }

  formatDateTime(dateStr?: string, timeStr?: string): string {
    const dt = this.parseDateFromParts(dateStr, timeStr);
    return dt ? this.datePipe.transform(dt, 'd MMM y') || '' : '';
  }

  formatDateOnly(dateStr?: string, timeStr?: string): string {
    const dt = this.parseDateFromParts(dateStr, timeStr);
    return dt ? this.datePipe.transform(dt, 'd MMM y') || '' : '';
  }

  formatTimeOnly(timeStr?: string, dateStr?: string): string {
    const dt = this.parseDateFromParts(dateStr, timeStr);
    return dt ? this.datePipe.transform(dt, 'h:mm a') || '' : '';
  }
}
