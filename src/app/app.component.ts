import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import 'svgxuse';

(function() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
})();

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