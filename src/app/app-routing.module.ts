import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "src/app/modules/pages/login/login.component";
import { isLoggedGuardFn } from "./guard/auth.guard.fn";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "register",
    loadComponent: () =>
      import("src/app/modules/pages/register/register.component"),
  },
  {
    path: "main",
    loadComponent: () => import("src/app/modules/pages/main/main.component"),
    canActivate: ["CanActivateFn"],
  },
  {
    path: "new-project",
    loadComponent: () =>
      import("src/app/modules/pages/project/project.component"),
    canActivate: ["CanActivateFn"],
  },
  {
    path: "project/:id/:slug",
    loadComponent: () =>
      import("src/app/modules/pages/project/project.component"),
    canActivate: ["CanActivateFn"],
  },
  {
    path: "settings",
    loadComponent: () =>
      import("src/app/modules/pages/settings/settings.component"),
    canActivate: ["CanActivateFn"],
  },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: "CanActivateFn", useFactory: isLoggedGuardFn }],
})
export class AppRoutingModule {}
