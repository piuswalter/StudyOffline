import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { StudySmarterService } from './study-smarter.service';

@Injectable({ providedIn: 'root' })
export class StudySmarterGuard implements CanActivate {
  constructor(
    private router: Router,
    private studySmarter: StudySmarterService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.studySmarter.isLoggedIn) {
      return true;
    }
    void this.router.navigate(['/login'], {
      queryParams: {
        redirect: state.url
      }
    });
    return false;
  }
}
