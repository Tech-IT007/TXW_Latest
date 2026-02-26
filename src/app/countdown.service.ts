// countdown.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubject: BehaviorSubject<number>;

  constructor() {
    this.countdownSubject = new BehaviorSubject<number>(60); // Initial countdown value
  }

  startCountdown(): Observable<number> {
    return interval(1000).pipe(
      map(() => {
        let currentValue = this.countdownSubject.value;
        if (currentValue > 0) {
          currentValue--;
          this.countdownSubject.next(currentValue);
        }
        return currentValue;
      }),
      takeWhile(value => value >= 0) // Ensure the countdown doesn't go negative
    );
  }
}
