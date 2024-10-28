import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { OtpResponse } from '../interface/auth.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost/activity_tracker_app/api/auth';
  private logoutUrl = 'http://localhost/activity_tracker_app/api';

  constructor(private http: HttpClient, private router: Router) {}

  

  sendOtp(mobile: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.baseUrl}/send-otp`, { mobile });
  }

  verifyOtp(user_id: string, otp: string): Observable<OtpResponse> {
    console.log(user_id);
    return this.http.post<OtpResponse>(`${this.baseUrl}/verify-otp`, { user_id, otp });
  }


  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(this.logoutUrl+'/logout', {}, { headers }).pipe(
      tap(() => {
        // Clear local storage token
        localStorage.removeItem('token');
        localStorage.clear();

        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}