import { Injectable, signal } from '@angular/core';
import { nanoid } from 'nanoid';
import { Discipline, Tournament } from './tournament.model';
import { toObservable } from '@angular/core/rxjs-interop';

const TOURNAMENTS_STORAGE_KEY = 'tournaments';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private readonly tournaments = signal<Tournament[]>([]);

  constructor() {
    this.loadState();
  }

  // --- Публичные методы для работы с турнирами ---

  getTournaments() {
    return toObservable(this.tournaments);
  }

  getTournamentById(id: string): Tournament | undefined {
    return this.tournaments().find(t => t.id === id);
  }

  addTournament(tournament: Omit<Tournament, 'id'>) {
    const newTournament = { ...tournament, id: nanoid(5) } as Tournament;
    this.tournaments.update(current => [...current, newTournament]);
    this.saveState();
  }

  updateTournament(updatedTournament: Tournament) {
    this.tournaments.update(current => 
      current.map(t => t.id === updatedTournament.id ? updatedTournament : t)
    );
    this.saveState();
  }

  deleteTournament(id: string) {
    this.tournaments.update(current => current.filter(t => t.id !== id));
    this.saveState();
  }

  // --- Приватные методы для управления состоянием ---

  private saveState() {
    localStorage.setItem(TOURNAMENTS_STORAGE_KEY, JSON.stringify(this.tournaments()));
  }

  private loadState() {
    const savedState = localStorage.getItem(TOURNAMENTS_STORAGE_KEY);
    if (savedState) {
      this.tournaments.set(JSON.parse(savedState));
    } else {
      this.tournaments.set(this.getInitialTournaments());
      this.saveState();
    }
  }

  private getInitialTournaments(): Tournament[] {
    return [
      {
        id: nanoid(5),
        name: 'Вечер Воинских Искусств',
        description: 'Лучшие бойцы города сойдутся в поединках по правилам MMA.',
        discipline: Discipline.MMA,
        maxParticipants: 32,
        startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        posterImage: 'assets/images/mma-poster-1.webp',
      },
      {
        id: nanoid(5),
        name: 'Чемпионат по Рукопашному Бою',
        description: 'Открытый чемпионат для всех желающих, демонстрация силы и техники.',
        discipline: Discipline.HandToHandCombat,
        maxParticipants: 64,
        startDate: new Date(new Date().setDate(new Date().getDate() + 25)),
        posterImage: 'assets/images/h2h-poster-1.webp',
      },
      {
        id: nanoid(5),
        name: 'Ночь Нокаутов',
        description: 'Только самые зрелищные бои, только нокауты!',
        discipline: Discipline.MMA,
        maxParticipants: 16,
        startDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        posterImage: 'assets/images/mma-poster-2.webp',
      },
    ];
  }
}
