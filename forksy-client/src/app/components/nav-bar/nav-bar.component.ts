import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MaterialModule} from '../../shared/material.module';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MaterialModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedIn = true;
    alert('Đăng nhập thành công!');
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.isLoggedIn = false;
    alert('Đã đăng xuất!');
  }
}
