import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // <--- ИМПОРТИРУЕМ

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations() // <--- ДОБАВЛЯЕМ ПРОВАЙДЕР АНИМАЦИЙ
  ]
};
