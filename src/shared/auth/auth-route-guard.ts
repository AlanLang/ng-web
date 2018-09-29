import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _router: Router,
        private sessionService: SessionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // 如果系统未登录
        if (!this.sessionService.user) {
            this._router.navigate(['/login']);
            return false;
        }
        // 如果此页面无权限限制
        if (!route.data || !route.data["permission"]) {
            return true;
        }
        // 如果权限验证通过
        if (this.sessionService.hasPermission(route.data["permission"])) {
            return true;
        }

        this._router.navigate(['/page/403']);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}