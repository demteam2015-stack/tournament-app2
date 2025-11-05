
import { Routes } from '@angular/router';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentFormComponent } from './tournament-form/tournament-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: TournamentListComponent,
    title: 'Календарь турниров' 
  },
  { 
    path: 'new', 
    component: TournamentFormComponent,
    title: 'Создать турнир' 
  },
  { 
    path: 'edit/:id', 
    component: TournamentFormComponent,
    title: 'Редактировать турнир' 
  },
  {
    path: '**',
    redirectTo: ''
  }
];
