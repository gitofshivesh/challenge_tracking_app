import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenge-detail',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './challenge-detail.component.html',
  styleUrl: './challenge-detail.component.css'
})
export class ChallengeDetailComponent {
  activities: any[] = [];
  loading: boolean = true;
  error: string = '';
  challengeId: number = 0;
  updatingActivityId: number | null = null;
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private challengesService: ChallengeService,
    private router: Router
  ) {}

  navigateToChallenges() {
    this.router.navigate(['/challenge-list']);
  }

  ngOnInit(): void {
    this.challengeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadActivities();
  }

  loadActivities(): void {
    this.challengesService.getChallengeActivities(this.challengeId).subscribe({
      next: (response) => {
        if (response.success) {
          this.activities = response.data.activities;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load activities. Please try again later.';
        this.loading = false;
      }
    });
  }

  updateStatus(activity: any, newStatus: string): void {
    this.updatingActivityId = activity.id;
    this.error = '';
    this.successMessage = '';

    this.challengesService.updateActivityStatus(activity.id, newStatus).subscribe({
      next: (response) => {
        if (response.success) {
          activity.status = newStatus;
          this.successMessage = 'Activity status updated successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        }
        this.updatingActivityId = null;
      },
      error: (error) => {
        this.error = 'Failed to update activity status. Please try again.';
        this.updatingActivityId = null;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success';
      case 'missed':
        return 'bg-danger';
      case 'pending':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  isDatePassed(date: string): boolean {
    return new Date(date) < new Date();
  }
}
