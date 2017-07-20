import { NgModule }             from "@angular/core";
import { AppComponent }         from "./app.component";
import { BrowserModule }        from "@angular/platform-browser";
import { FormsModule }          from "@angular/forms";
import { HttpModule }           from "@angular/http";

// Routing
import { ROUTING }              from "./app.routing";

// Components
import { HomeComponent }        from "./_components/home/home.component";
import { JobDetailsComponent }  from "./_components/jobDetails/jobDetails.component";

// Services
import { DatabaseService }      from './_services/database/database.service'

// Providers
import { AngularIndexedDB }     from 'angular2-indexeddb';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        ROUTING
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        JobDetailsComponent
    ],
    providers: [
        DatabaseService,
        AngularIndexedDB
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}