import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  modalTitle = input.required();
  modalState = output<string>();

  closeModal({ target }: Event): void {
    const element = target as HTMLElement;
    if (element.classList.contains('modal-overlay') || element.id == 'close-btn') {
      this.modalState.emit('closed');
    }
  }
}
