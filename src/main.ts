import { AppComponent } from './components/app/app.component';
import { appConfig } from './app.config';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
