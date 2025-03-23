import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import AuthService from "@services/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const isLoggedGuardFn: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuthenticated()
    .pipe(
      map((isLoggedIn: boolean): boolean => {
        if (!isLoggedIn) {
          router.navigate(["/"]);
        }
        return isLoggedIn;
      })
    );
};
export default isLoggedGuardFn;
