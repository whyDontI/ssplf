import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
const BASE_URL = env.url

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public httpClient: HttpClient) { }

  public options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    console.log(BASE_URL + path)
    return this.httpClient.get(BASE_URL + path, { params }).pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public patch(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .patch(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(BASE_URL + path).pipe(catchError(this.formatErrors));
  }

  public customPathGet(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(path, { params }).pipe(catchError(this.formatErrors));
  }

  public customPathPost(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error);
  }

}
