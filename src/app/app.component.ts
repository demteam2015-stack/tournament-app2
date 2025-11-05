import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // <-- УДАЛЯЕМ ПРЯМЫЕ ИМПОРТЫ КОМПОНЕНТОВ
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-tournament-app';
}
