import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@workshop/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular Core & Reactive Workshop';
  links = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/customers', icon: 'face', label: 'Customers' },
    { path: '/projects', icon: 'work', label: 'Projects' },
  ];
  isLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$;
  isLoggedIn;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$.subscribe(
      loggedIn => {
        const path = (loggedIn) ? '' : 'login';
        this.isLoggedIn = loggedIn;
        this.router.navigate([path]);
      }
    )
  }

  logout() {
    this.authService.logout();
  }

  isSidenavOpen(component, authentication) {
    return component.opened && authentication;
  }
}
