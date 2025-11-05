import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TournamentService } from '../tournament.service';
import { Discipline, Tournament } from '../tournament.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FileUploadComponent],
  templateUrl: './tournament-form.component.html',
  styleUrl: './tournament-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly tournamentService = inject(TournamentService);

  // --- Входные данные ---
  public tournamentId = input<string | undefined>(); // Принимаем только ID
  
  // --- Выходные события ---
  public formSubmitted = output<Partial<Tournament>>();

  // --- Состояние ---
  public tournament = signal<Tournament | undefined>(undefined);
  public isEditMode = computed(() => !!this.tournamentId());
  public disciplines = Object.values(Discipline);

  public tournamentForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.maxLength(200)],
    discipline: [Discipline.MMA, Validators.required],
    maxParticipants: [8, [Validators.required, Validators.min(2)]],
    startDate: ['', Validators.required],
    posterImage: [''], // Изменено на posterImage
  });

  constructor() {
    effect(() => {
      const id = this.tournamentId();
      if (id) {
        const existingTournament = this.tournamentService.getTournamentById(id);
        this.tournament.set(existingTournament);
      } else {
        this.tournament.set(undefined);
      }
    });
    
    effect(() => {
        const tournamentToEdit = this.tournament();
        if (tournamentToEdit) {
            this.tournamentForm.patchValue({
                ...tournamentToEdit,
                startDate: new Date(tournamentToEdit.startDate).toISOString().split('T')[0],
            });
        } else {
            this.tournamentForm.reset();
        }
    });
  }

  onPosterChanged(base64: string) {
    this.tournamentForm.patchValue({ posterImage: base64 });
  }

  onSubmit() {
    if (this.tournamentForm.invalid) return;

    const formValue = this.tournamentForm.getRawValue();
    const tournamentData: Partial<Tournament> = {
      name: formValue.name!,
      description: formValue.description!,
      discipline: formValue.discipline!,
      maxParticipants: Number(formValue.maxParticipants!),
      startDate: new Date(formValue.startDate!),
      posterImage: formValue.posterImage!,
    };

    if (this.isEditMode()) {
        this.tournamentService.updateTournament({ ...this.tournament()!, ...tournamentData });
    } else {
        this.tournamentService.addTournament(tournamentData as Omit<Tournament, 'id'>);
    }

    this.router.navigate(['/']);
  }
}
