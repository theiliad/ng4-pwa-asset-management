import { Injectable }                                                        from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import                     'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseService {    
    // Endpoint URLs
    private baseURL: string =           `https://polymer-1st-try.firebaseio.com`;
    private jobsURL: string =        `/jobs.json`;

    constructor(private http: Http) {}

    // getDevices(requestParams?): Promise<Object> {
    getJobs() {
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