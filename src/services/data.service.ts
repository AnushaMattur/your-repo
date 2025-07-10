import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7040';

  // Default headers for all requests
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Generic POST method with default headers
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, {
      headers: this.defaultHeaders
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Network error (ProgressEvent)
    if (error.error instanceof ProgressEvent) {
      return throwError(() => 'Could not connect to the server. Please check your network connection or try again later.');
    }

    // API returned an error response
    if (error.error && typeof error.error === 'string') {
      console.error('API Error:', error.error || error.message);
      return throwError(() => error.error || 'Something went wrong');
    }
    
    // Fallback
    return throwError(() => 'An unexpected error occurred. Please try again.')
  }
}
