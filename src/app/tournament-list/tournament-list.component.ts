import { ChangeDetectionStrategy, Component, inject, signal, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


type DeletionState = { id: string; name: string } | null;

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ConfirmationDialogComponent],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.css', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentListComponent implements OnDestroy {
  private readonly tournamentService = inject(TournamentService);
  private subscription: Subscription;

  public tournaments = signal<Tournament[]>([]);


  public tournamentToDelete = signal<DeletionState>(null);

  constructor() {
    this.subscription = this.tournamentService.getTournaments().subscribe(tournaments => {
      this.tournaments.set(tournaments);
    });
  }


  requestDeleteTournament(id: string, name: string): void {
    this.tournamentToDelete.set({ id, name });
  }


  handleConfirmDelete(): void {
    const tournament = this.tournamentToDelete();
    if (tournament) {
      this.tournamentService.deleteTournament(tournament.id);
      this.tournamentToDelete.set(null); 
    }
  }


  handleCancelDelete(): void {
    this.tournamentToDelete.set(null); 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
