import { Injectable }                                                        from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import                     'rxjs/add/operator/toPromise';

import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable()
export class DatabaseService {
    // Endpoint URLs
    private baseURL: string =           `https://polymer-1st-try.firebaseio.com`;
    private jobsURL: string =        `/jobs.json`;
    private db: any;

    constructor(private http: Http) {
    }

    // getDevices(requestParams?): Promise<Object> {
    getJobs() {
        console.log("GET JOBS");

        this.db = new AngularIndexedDB('ng4-pwa', 1);
        this.db.createStore(1, (evt) => {
            let objectStore = evt.currentTarget.result.createObjectStore(
                'people', { keyPath: "id", autoIncrement: true });

            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
        }).then(() => {
            this.db.add('people', { name: 'Eliad' + Math.random(), email: 'iliadmoosavi@gmail.com' + Math.random() }).then(() => {
                console.log("ADDED");

                this.db.getAll('people').then((result) => {
                    console.log(result);
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error);
            });
        });

        const url = this.baseURL.concat(this.jobsURL);

        // const params: URLSearchParams = new URLSearchParams();
        // params.set('_limit',    requestParams ? requestParams.limit    : '10');
        // params.set('_sort',     requestParams ? requestParams.orderBy  : 'deviceId');
        // params.set('_bookmark', requestParams ? requestParams.bookmark : '');

        // return this.http.get(url, {params: params}}
        return this.http.get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only

        return Promise.reject(error.message || error);
    }
}