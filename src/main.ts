/**
 * Это самый первый файл, который выполняется при запуске вашего приложения.
 * Его задача — "загрузить" (bootstrap) корневой компонент приложения (AppComponent)
 * со всеми необходимыми конфигурациями.
 */

// `bootstrapApplication` — это функция из Angular, которая инициирует запуск всего приложения.
import { bootstrapApplication } from '@angular/platform-browser';

// `appConfig` — это объект с конфигурацией нашего приложения, который мы импортируем из соседнего файла.
// Он говорит Angular, какие роуты, сервисы и функции нужно подключить на старте.
import { appConfig } from './app/app.config';

// `AppComponent` — это наш корневой компонент, который мы хотим отобразить.
import { AppComponent } from './app/app.component';

/**
 * `bootstrapApplication(AppComponent, appConfig)` — главный вызов.
 * Мы говорим Angular: "Пожалуйста, запусти приложение, используя `AppComponent` как главный компонент
 * и примени к нему вот эту конфигурацию `appConfig`".
 */
bootstrapApplication(AppComponent, appConfig)
  // `.catch((err) => console.error(err));`
  // Это стандартная обработка ошибок в JavaScript. Если во время загрузки приложения произойдет
  // какая-то критическая ошибка, мы не хотим, чтобы все просто "молча" сломалось.
  // Вместо этого мы "ловим" (`catch`) эту ошибку (`err`) и выводим ее в консоль разработчика,
  // чтобы ее можно было увидеть и исправить.
  .catch((err) => console.error(err));
