import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() courses: any[] = [];
  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() select = new EventEmitter<any>();

  selectedCourse: any | null = null;

  selectCourse(course: any): void {
    this.selectedCourse = course;
    this.select.emit(course);
  }

  confirmSelection(): void {
    if (this.selectedCourse) {
      this.confirm.emit(this.selectedCourse);
    }
  }

  cancelSelection(): void {
    this.cancel.emit();
  }
}
