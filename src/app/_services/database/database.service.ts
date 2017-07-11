import { Injectable }                                                        from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import                     'rxjs/add/operator/toPromise';

import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable()
export class DatabaseService {
    internetConnection: Observable<boolean>;
    
    // Endpoint URLs
    private baseURL: string =        `https://polymer-1st-try.firebaseio.com`;
    private jobsURL: string =        `/jobs.json`;
    private db: any;

    constructor(private http: Http) {
        this.internetConnection = Observable.merge(
            Observable.of(navigator.onLine),
            Observable.fromEvent(window, 'online').mapTo(true),
            Observable.fromEvent(window, 'offline').mapTo(false)
        );

        console.log("Initializing DB");
        this.db = new AngularIndexedDB('ng4-pwa', 1);
    }

    // getDevices(requestParams?): Promise<Object> {
    getJobs() {
        console.log("GET JOBS");

        return new Promise (resolve => {
            this.internetConnection.subscribe(connected => {
                if (connected) {
                    console.log("CONNECTED");
                    
                    const url = this.baseURL.concat(this.jobsURL);

                    // const params: URLSearchParams = new URLSearchParams();
                    // params.set('_limit',    requestParams ? requestParams.limit    : '10');
                    // params.set('_sort',     requestParams ? requestParams.orderBy  : 'deviceId');
                    // params.set('_bookmark', requestParams ? requestParams.bookmark : '');

                    // return this.http.get(url, {params: params}}
                    return this.http.get(url)
                            .toPromise()
                            .then(res => {
                                let jobs = res.json();

                                this.db.createStore(1, (evt) => {
                                    let objectStore = evt.currentTarget.result.createObjectStore(
                                        'jobs', { keyPath: "id", autoIncrement: true });

                                    objectStore.createIndex("name", "name", { unique: false });
                                    objectStore.createIndex("value", "value", { unique: true });
                                })
                                .then(() => {
                                    Object.keys(jobs).map(key => {
                                        this.db.add('jobs', jobs[key]).then(() => {
                                            console.log("ADDED");

                                            this.db.getAll('jobs').then((result) => {
                                                console.log(result);
                                            }, (error) => {
                                                console.log(error);
                                            });
                                        }, (error) => {
                                            console.log(error);
                                        });
                                    });

                                    // this.db.add('jobs', { name: 'Eliad' + Math.random(), value: 'iliadmoosavi@gmail.com' + Math.random() }).then(() => {
                                    //     console.log("ADDED");

                                    //     this.db.getAll('jobs').then((result) => {
                                    //         console.log(result);
                                    //     }, (error) => {
                                    //         console.log(error);
                                    //     });
                                    // }, (error) => {
                                    //     console.log(error);
                                    // });
                                });

                                resolve(res.json())
                            })
                            .catch(() => {
                                resolve(false);
                            });
                } else {
                    console.log("Not Connected");

                    return this.db.createStore(1, (evt) => {
                        let objectStore = evt.currentTarget.result.createObjectStore(
                            'jobs', { keyPath: "id", autoIncrement: true });

                        objectStore.createIndex("name", "name", { unique: false });
                        objectStore.createIndex("value", "value", { unique: true });
                    }).then(() => {
                        this.db.getAll('jobs').then((result) => {
                            console.log(result);

                            resolve(result);
                        }, (error) => {
                            console.log(error);

                            resolve(false);
                        });
                    });
                }

                // this.db = new AngularIndexedDB('ng4-pwa', 1);
                // this.db.createStore(1, (evt) => {
                //     let objectStore = evt.currentTarget.result.createObjectStore(
                //         'people', { keyPath: "id", autoIncrement: true });

                //     objectStore.createIndex("name", "name", { unique: false });
                //     objectStore.createIndex("email", "email", { unique: true });
                // }).then(() => {
                //     this.db.add('people', { name: 'Eliad' + Math.random(), email: 'iliadmoosavi@gmail.com' + Math.random() }).then(() => {
                //         console.log("ADDED");

                //         this.db.getAll('people').then((result) => {
                //             console.log(result);
                //         }, (error) => {
                //             console.log(error);
                //         });
                //     }, (error) => {
                //         console.log(error);
                //     });
                // });
            });
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only

        return Promise.reject(error.message || error);
    }
}