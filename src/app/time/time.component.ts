import { Component } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  numbers: Array<string> = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  hoursHand: number = 0;
  minutesHand: number = 0;
  secondsHand: number = 0;

  hours: string = '';
  minutes: string = '';
  seconds: string = '';
  ampm: string = ''

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    interval(1000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateClock());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private updateClock(): void {
    const now = new Date();
    const hh = now.getHours() * 30;
    const mh = now.getMinutes() * 6;
    const sh = now.getSeconds() * 6;

    let h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();

    this.ampm = h >= 12 ? 'PM' : 'AM';
    h = h > 12? h - 12 : h;

    this.hoursHand = hh + mh / 12;
    this.minutesHand = mh;
    this.secondsHand = sh;

    this.hours = (h < 10) ? ('0' + h).toString() : h.toString();
    this.minutes = (m < 10) ? ('0' + m).toString() : m.toString();
    this.seconds = (s < 10) ? ('0' + s).toString() : s.toString();
  }
}
