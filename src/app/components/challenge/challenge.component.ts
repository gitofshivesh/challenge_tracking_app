import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../interface/challenge.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.css'
})
export class ChallengeComponent {
  challengeForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    frequency: new FormControl('weekly')
  });

  loading = false;
  error = '';
  success = '';

  frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  navigateToChallenges() {
    this.router.navigate(['/challenge-list']);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      frequency: ['daily', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.challengeForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const challenge: Challenge = this.challengeForm.value;

    this.challengeService.createChallenge(challenge).subscribe({
      next: (response) => {
        console.log(response.data?.challenge);
        this.success = response.message;       
        
        if (response.data?.challenge.id) {
          // Call the generate activities API for newly created challenge
          this.challengeService.generateActivities(parseInt(response.data?.challenge.id)).subscribe({
            next: (activitiesResponse) => {
              console.error(activitiesResponse);        
              this.success += ' Activities generated successfully.';
            },
            error: (activitiesError) => {
              this.error = activitiesError.error.message || 'Error generating activities';
            }
          });
        }
    
        this.challengeForm.reset({
          frequency: 'daily'
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'An error occurred while creating the challenge';
        this.loading = false;
      }
    });
  }
}
