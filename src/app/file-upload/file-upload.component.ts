import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  // --- Inputs & Outputs ---
  initialUrl = input<string | null | undefined>(null);
  fileChanged = output<string>();

  // --- State Signals ---
  previewUrl = signal<string | null>(null);
  isDragOver = signal(false);

  constructor() {
    // Эффект для синхронизации initialUrl с previewUrl
    effect(() => {
      this.previewUrl.set(this.initialUrl() || null);
    });
  }

  // --- Event Handlers ---
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  clearFile(event: Event): void {
    event.stopPropagation(); 
    this.previewUrl.set(null);
    this.fileChanged.emit('');
  }

  // --- Private Methods ---
  private handleFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type. Please select an image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const base64 = e.target?.result as string;
      this.previewUrl.set(base64);
      this.fileChanged.emit(base64);
    };
    reader.readAsDataURL(file);
  }
}
