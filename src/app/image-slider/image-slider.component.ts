import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  images: Array<String> = [
    '../../assets/1.jpg',
    '../../assets/2.jpg',
    '../../assets/3.jpg',
    '../../assets/4.jpg',
    '../../assets/5.jpg',
    '../../assets/6.jpg',
    '../../assets/7.jpg',
    '../../assets/8.jpg',
    '../../assets/9.jpg',
    '../../assets/10.jpg',
  ];

  currentIndex = 0;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    interval(3000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
