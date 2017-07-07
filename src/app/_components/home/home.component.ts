import { Component, OnInit }        from "@angular/core";
import { DatabaseService }          from '../../_services/database/database.service';

@Component({
    selector: "em-home",
    templateUrl: "./home.component.html",
    styleUrls: [ "./home.component.scss" ]
})

export class HomeComponent implements OnInit {
    jobsData: any;

    constructor (private databaseService: DatabaseService) { }

    ngOnInit() {
        this.databaseService.getJobs().then(
            jobs => {
                this.toArray(jobs);
            },
            error => {
                console.error(error);
            }
        );
    }

    // Convert Firebase data object to an array
    toArray(obj) {
        console.log("toArray");

        var finalArray = Object.keys(obj).map(function(key) {
            return {
                name: key,
                value: obj[key]
            };
        });

        this.jobsData = finalArray.sort(function (a, b) {
            return a.value.priority - b.value.priority;
        });
        
        console.log(this.jobsData);
    }
}