import { Component, OnInit }        from "@angular/core";
import { DatabaseService }          from '../../_services/database/database.service';

import { Http, Response }           from "@angular/http";

import { Observable }               from 'rxjs/Observable';

import { ActivatedRoute, Router }   from '@angular/router';

@Component({
    selector: "em-home",
    templateUrl: "./jobDetails.component.html",
    styleUrls: [ "./jobDetails.component.scss" ]
})

export class JobDetailsComponent implements OnInit {
    jobsData: any;
    job: any;
    online: Observable<boolean>;

    constructor (private databaseService: DatabaseService, private http: Http, private route: ActivatedRoute, private router: Router) {
        this.online = databaseService.internetConnection;
    }

    ngOnInit() {
        this.databaseService.getJobs().then(
            jobs => {
                this.toArray(jobs);
            },
            error => {
                console.error(error);
            }
        );

        this.route.params.subscribe(params => {
            console.log("PARAMS", params);

            if (params.jobID) {
                this.databaseService.getJob(params.jobID).then(
                    job => {
                        console.log("JOB", job);

                        this.job = {
                            name: params.jobID,
                            value: job
                        };
                    },
                    error => {
                        console.error(error);
                    }
                );
            }
        });
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
        
        console.log("jobsData", this.jobsData);
    }

    updateStatus(index, name, status, completed) {
        this.jobsData[index]["value"]["status"] = status;
        this.jobsData[index]["value"]["inProgress"] = status === "in-progress";

        this.http.post(`https://polymer-1st-try.firebaseio.com/jobs/${name}/.json`, {
            "status":       status,
            "inProgress":   status === "in-progress",
            "completed":    completed
        })
            .map((res: Response) => {
                if (res && res.status === 200) {
                    console.log(res.json());
                }
            })
            .catch((error: any) => void {
                if (error) {
                    console.error(error);
                }
            })
            .subscribe();
    }

    startJob(index) {        
        console.log("You clicked START", index);

        this.updateStatus(index, this.jobsData[index]["name"], "in-progress", false);
    }

    stopJob(index) {
        console.log("You clicked STOP", index);

        this.jobsData[index]["stopClicked"] = true;
    }

    stopOnly(index) {
        console.log("You clicked STOPONLY");

        this.updateStatus(index, this.jobsData[index]["name"], "approved", false);
        this.jobsData[index]["stopClicked"] = false;
    }

    completeJob(index) {
        console.log("You clicked COMPLETEJOB");

        this.updateStatus(index, this.jobsData[index]["name"], "completed", true);
        
        this.jobsData[index]["stopClicked"] = false;
    }
}