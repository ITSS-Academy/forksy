
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { authReducer } from './ngrx/auth/auth.reducer';
import * as authEffects from './ngrx/auth/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      auth: authReducer
    }),
    provideEffects(
      authEffects
    ),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'recipe-cook-af395',
        appId: '1:313640689578:web:59afeb0d276035f05195d3',
        storageBucket: 'recipe-cook-af395.firebasestorage.app',
        apiKey: 'AIzaSyAKrQhd9JSMPBmUU281pf4juQGJJMJj0BU',
        authDomain: 'recipe-cook-af395.firebaseapp.com',
        messagingSenderId: '313640689578',
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
