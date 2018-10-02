import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Environment } from './environment';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

private baseUrl = environment.baseUrl;  // URL to web api
//private baseUrl = 'http://localhost:3000/environments';  // URL to web api
  
  constructor(private http: HttpClient) { }
  
    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //console.log('Service: ' + message);
    //console.log('baseURL -->' + this.baseUrl);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    /** POST: add a new env to the server */
  addEnvironment (env: Environment): Observable<Environment> {
    return this.http.post<Environment>(this.baseUrl, env, httpOptions).pipe(
      tap((env: Environment) => this.log(`added env w/ id=${env.id}`)),
      tap((env: Environment) => console.log(`added env w/ id=${env.id}`)),
      catchError(this.handleError<Environment>('addEnvironment'))
    );
  }

  /** DELETE: delete the env from the server */
  deleteEnvironment (env: Environment | number): Observable<Environment> {
    const id = typeof env === 'number' ? env : env.id;
    const url = `${this.baseUrl}/${id}`;
    //console.log('Delete URL :' + url);

    return this.http.delete<Environment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted env id=${id}`)),
      catchError(this.handleError<Environment>('deleteEnvironment'))
    );
  }

  getEnvironments(): Observable<Environment[]> {
    //console.log('baseURL ->' + this.baseUrl);
    return this.http.get<Environment[]>(this.baseUrl)
      .pipe(
        tap(envs => this.log('fetched environments')),
        catchError(this.handleError('getEnvironments', []))
      );
  }

  /** GET env by id. Will 404 if id not found */
  getEnvironment(id: string): Observable<Environment> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Environment>(url).pipe(
      tap(_ => this.log(`fetched env id=${id}`)),
      catchError(this.handleError<Environment>(`getEnvironment id=${id}`))
    );
  }

  /* GET environments whose name contains search term */
//  searchHeroes(term: string): Observable<Environment[]> {
//    if (!term.trim()) {
//      // if not search term, return empty env array.
//      return of([]);
//    }
//    return this.http.get<Environment[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//      tap(_ => this.log(`found heroes matching "${term}"`)),
//      catchError(this.handleError<Environment[]>('searchHeroes', []))
//    );
//  }

  /** PUT: update the env on the server */
  updateEnvironment (env: Environment): Observable<any> {
    const url = `${this.baseUrl}/${env.id}`;
    //console.log('Update URL :' + url);
    return this.http.put(url, env, httpOptions).pipe(
      tap(_ => this.log(`updated env id=${env.id}`)),
      catchError(this.handleError<any>('updateEnvironment'))
    );
  }
}
