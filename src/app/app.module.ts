import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// Routing
import { ROUTING } from "./app.routing";

// Components
import { HomeComponent } from "./_components/home/home.component";

// Services
import { DatabaseService }      from './_services/database/database.service'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ROUTING
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
        DatabaseService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}