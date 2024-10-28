import { Component } from '@angular/core';
import { ActivityService, ActivityStats } from '../../services/activity.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  providers:[
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  activityStats: ActivityStats = {
    data: {
      activity_stats: {
        activities_summary: {
          completed_activities: 0,
          completion_rate: 0,
          pending_activities: 0,
          total_activities: 0
        },
        date: '',
        total_active_challenges: 0
      }
    }
  };

  pendingActivities: any[] = [];

  totalPendingCount: string = '';
  onDate: string = '';

  date: string = '';
  total_active_challenges: string = '';
  total_activities: string = '';
  pending_activities: string = '';
  completed_activities: string = '';
  completion_rate: string = '';

  
  loading = true;
  error = '';

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}

  navigateToChallenges() {
    this.router.navigate(['/challenge-list']);
  }

  ngOnInit() {
    this.loadActivityStats();
    this.loadTodaysPendingActivity();
  }

  loadActivityStats() {
    this.loading = true;
    this.activityService.getActivityStats().subscribe({
      next: (data) => {
        this.activityStats        = data;
        this.loading              = false;

        this.total_active_challenges  = data.data.activity_stats.total_active_challenges.toString() ?? '0';
        this.date                     = data.data.activity_stats.date ?? new Date();
        this.total_activities         = data.data.activity_stats.activities_summary.total_activities.toString() ?? '0';
        this.completed_activities     = data.data.activity_stats.activities_summary.completed_activities.toString() ?? '0';
        this.pending_activities       = data.data.activity_stats.activities_summary.pending_activities.toString() ?? '0';
        this.completion_rate          = data.data.activity_stats.activities_summary.completion_rate.toString() ?? '0';

        // console.log(data);
        console.log(this.activityStats);        
      },
      error: (error) => {
        this.error = 'Failed to load activity statistics';
        this.loading = false;
        console.error('Error loading activity stats:', error);
      }
    });
  }

  loadTodaysPendingActivity(): void {
    this.activityService.getTodaysPendingActivityCount().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.pendingActivities = response.data.activity_stats;
          this.totalPendingCount = response.data.activity_stats.pending_activities
          this.onDate = response.data.activity_stats.date
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to get pending activty for today. Please try again later.';
        this.loading = false;
      }
    });
  }

  navigateToPendingActivities() {
    this.router.navigate(['/pending-activities']);
  }

}
