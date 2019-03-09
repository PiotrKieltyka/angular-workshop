import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate() : boolean {
    if (!this.auth.isAuthenticated$.value) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
