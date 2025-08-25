import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MaterialModule} from './shared/material.module';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from './ngrx/auth/auth.state';
import * as AuthActions from './ngrx/auth/auth.actions';
import { AuthModel } from './models/auth.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Forksy';
    constructor(
    private auth: Auth,
    private store:Store<{
    auth: AuthState
  }>) {
    // Initialization logic can go here if needed
    this.auth.onAuthStateChanged(async (auth:any) =>{
      if (auth) {

        let idToken = await auth.getIdToken()
        const user:AuthModel = {
          uid: auth.uid,
          displayName: auth.displayName,
          email: auth.email,
          photoURL: auth.photoURL,
          phoneNumber: auth.phoneNumber
        }
        console.log('User is signed in.', user);
        this.store.dispatch(AuthActions.storeCurrentUser({currentUser:user, idToken: idToken}))
      } else {
        console.log('No user is signed in.');
      }
    })
  }
}
