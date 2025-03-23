import { Routes } from "@angular/router";
import isLoggedGuardFn from "@app/guard/auth.guard.fn";
import LoginComponent from "@modules/pages/login/login.component";

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
    canActivate: [isLoggedGuardFn],
  },
  {
    path: "new-project",
    loadComponent: () =>
      import("src/app/modules/pages/project/project.component"),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: "project/:id/:slug",
    loadComponent: () =>
      import("src/app/modules/pages/project/project.component"),
    canActivate: [isLoggedGuardFn],
  },
  {
    path: "settings",
    loadComponent: () =>
      import("src/app/modules/pages/settings/settings.component"),
    canActivate: [isLoggedGuardFn],
  },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];
export default routes;
