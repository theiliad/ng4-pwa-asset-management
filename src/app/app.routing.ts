import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders }  from "@angular/core";

import { HomeComponent }        from "./_components/home/home.component";
import { JobDetailsComponent }  from "./_components/jobDetails/jobDetails.component";

const APP_ROUTES: Routes = [
    { path: "", component: HomeComponent },
    { path: "job/:jobID", component: JobDetailsComponent },
    { path: "**", redirectTo: "" }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);