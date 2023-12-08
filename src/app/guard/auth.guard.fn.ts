import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

export const isLoggedGuardFn: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuthenticated()
    .pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          router.navigate(["/"]);
        }
        return isLoggedIn;
      })
    );
};
