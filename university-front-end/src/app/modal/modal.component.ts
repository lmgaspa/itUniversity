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
  @Output() confirm = new EventEmitter<void>(); // Evento para confirmar a ação
  @Output() cancel = new EventEmitter<void>(); // Evento para cancelar

  confirmSelection(): void {
    this.confirm.emit(); // Emite o evento de confirmação
  }

  cancelSelection(): void {
    this.cancel.emit(); // Emite o evento de cancelamento
  }
}
