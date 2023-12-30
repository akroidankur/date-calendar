import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TimeComponent } from './time/time.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CalendarComponent, TimeComponent, ImageSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log('Clock App by akroid');
  }
}

