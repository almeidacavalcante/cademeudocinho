import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user/user.service';
import { Observable } from "rxjs/Observable";
import { CanActivate } from "@angular/router";
import 'rxjs/add/operator/map'

@Injectable()
export class AdminAuthGuardService {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.map(appUser => appUser.isAdmin)
  }

}
