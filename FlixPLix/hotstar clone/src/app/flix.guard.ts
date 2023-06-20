import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class FlixGuard implements CanActivate {
  constructor(private userService : UserServiceService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject)=>{
        if(this.userService.userDetails.logedIn==1){

          setTimeout(()=>resolve(true),1000);
            
        }
        else{
          this.router.navigate(['']);
        }
        
    });
  }
  
}

