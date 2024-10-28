import { Component } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './challenge-list.component.html',
  styleUrl: './challenge-list.component.css'
})
export class ChallengeListComponent {

  challenges: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private challengesService: ChallengeService, private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  addNewChallenge() {
    this.router.navigate(['/add-challenge']);
  }

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.challengesService.getChallenges().subscribe({
      next: (response) => {
        if (response.success) {
          this.challenges = response.data.challenges;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load challenges. Please try again later.';
        this.loading = false;
      }
    });
  }

  navigateToDetails(challengeId: number): void {
    this.router.navigate(['/challenges', challengeId]);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

}
