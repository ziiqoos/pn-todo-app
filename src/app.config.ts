import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { TaskEffects } from './store/task/effects';
import { taskReducer } from './store/task/reducers';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ tasks: taskReducer }),
    provideAnimationsAsync(),
    provideEffects([TaskEffects]), // Add effects here if needed
    provideStoreDevtools({ maxAge: 25, logOnly: true }), // To use Redux DevTools
  ]
};
