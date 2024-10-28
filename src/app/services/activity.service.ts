import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ActivitiesSummary {
    completed_activities: number;
    completion_rate: number;
    pending_activities: number;
    total_activities: number;
}
  
interface ActivityStatsDetail {
    activities_summary: ActivitiesSummary;
    date: string;
    total_active_challenges: number;
}

export interface ActivityStats {
    data: {
        activity_stats: ActivityStatsDetail;
    }
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost/activity_tracker_app/api';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getActivityStats(): Observable<ActivityStats> {
    return this.http.get<ActivityStats>(this.apiUrl+'/activities/stats', {
      headers: this.getHeaders()
    });
  }

  getPendingActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/activities/pending', {
      headers: this.getHeaders()
    });
  }

  getTodaysPendingActivityCount(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/activities/pending-count', {
        headers: this.getHeaders()
    });
  }
}