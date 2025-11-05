import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  /**
   * Вопрос, отображаемый в диалоговом окне.
   */
  message = input.required<string>();

  /**
   * Событие, которое срабатывает при подтверждении действия.
   */
  confirm = output<void>();

  /**
   * Событие, которое срабатывает при отмене действия.
   */
  cancel = output<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // Позволяет закрыть диалог по клику на фон
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
