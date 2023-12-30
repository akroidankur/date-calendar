import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  monthNames: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  days: Array<string> = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  calendarDays: Array<number> = []

  newDate: Date = new Date();
  currentDate: number = this.newDate.getDate();
  currentMonth: number = this.newDate.getMonth();
  currentYear: number = this.newDate.getFullYear();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCurrentDate());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateCurrentDate(): void {
    this.newDate = new Date();
    this.currentDate = this.newDate.getDate();
    this.currentMonth = this.newDate.getMonth();
    this.currentYear = this.newDate.getFullYear();
    this.calendarDays = this.generateCalendar(this.currentMonth, this.currentYear)
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
  }

  getFebDays(year: number): number {
    return this.isLeapYear(year) ? 29 : 28;
  }

  generateCalendar(month: number, year: number): number[] {
    let daysOfMonth = [31, this.getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let firstDay = new Date(year, month, 1);
    let calendarDays: Array<number> = [];

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
      if (i >= firstDay.getDay()) {
        calendarDays.push(i - firstDay.getDay() + 1);
      } else {
        calendarDays.push(null!);
      }
    }
    return calendarDays;
  }
}
