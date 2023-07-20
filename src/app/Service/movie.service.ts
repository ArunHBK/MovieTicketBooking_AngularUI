import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../Models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  loadMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${environment.apiBaseUrl}/Movie/Reterive/All`);
  }
  getMovie(_id: string): Observable<Movie> {
    return this.http.get<Movie>(`${environment.apiBaseUrl}/Movie/Reterive/${_id}`);
  }
  deleteMovie(_id: string): Observable<Movie> {
    return this.http.delete<Movie>(`${environment.apiBaseUrl}/Movie/Delete/${_id}`);
  }
}
