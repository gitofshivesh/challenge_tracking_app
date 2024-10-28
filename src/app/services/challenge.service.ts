import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Challenge, ChallengeResponse } from '../interface/challenge.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiUrl = 'http://localhost/activity_tracker_app/api';

  constructor(private http: HttpClient) { }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });    
  }

  createChallenge(challenge: Challenge): Observable<ChallengeResponse> {
    return this.http.post<ChallengeResponse>(this.apiUrl+'/challenges-add', challenge, { 
      headers: this.getHeaders() 
    });
  }

  generateActivities(challengeId: number): Observable<any> {    
    return this.http.post(this.apiUrl+'/challenges/'+challengeId+'/activities/generate',{}, {
      headers: this.getHeaders() 
    });
  }

  getChallenges(): Observable<any> {
    return this.http.get(this.apiUrl+'/challenges-list', {
      headers: this.getHeaders() 
    });
  }

  getChallengeActivities(challengeId: number): Observable<any> {    
    return this.http.get(this.apiUrl+'/challenges/'+challengeId+'/activities', {
      headers: this.getHeaders() 
    });
  }

  updateActivityStatus(activityId: number, status: string): Observable<any> {    
    return this.http.put(this.apiUrl+'/activities/'+activityId+'/status', { status }, {
      headers: this.getHeaders()
    });
  }
  
}
