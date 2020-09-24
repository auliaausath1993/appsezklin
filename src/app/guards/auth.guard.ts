import { ServiceService } from './../servive/service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authstatus:any;

  constructor(
    private servicesService: ServiceService
  ) {}

  canActivate(): boolean {
    this.servicesService.authenticationState.subscribe((data) => {
      this.authstatus=data;
    });
    return true;
  }
  
}
