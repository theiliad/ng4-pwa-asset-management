import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "em-app",
    templateUrl: "./app.component.html",
    styleUrls: [ "./app.component.scss" ],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
    
    public constructor() {}
    
    public ngOnInit(): void {}
    
}