import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
     protected BASE_URL = 'http://localhost:5223/api';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(protected http: HttpClient) {}

  // 🔹 GET
  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${endpoint}`);
  }

  // 🔹 POST
  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${this.BASE_URL}/${endpoint}`,
      body,
      this.httpOptions
    );
  }

  // 🔹 PUT
  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(
      `${this.BASE_URL}/${endpoint}`,
      body,
      this.httpOptions
    );
  }

  // 🔹 DELETE
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}/${endpoint}`);
  }
}
