import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './otp-auth.component.html',
  styleUrl: './otp-auth.component.css'
})
export class OtpAuthComponent {
  user_id?: string = '';
  mobile: string = '';
  otp: string = '';
  showOtpInput: boolean = false;
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  sendOtp(): void {
    if (!this.mobile) {
      this.error = 'Please enter mobile number';
      return;
    }

    // validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(this.mobile)) {
      this.error = 'Please enter a valid 10-digit mobile number';
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.authService.sendOtp(this.mobile).subscribe({
      next: (response) => {
        this.showOtpInput = true;
        this.successMessage = response.message;
        this.user_id = response.data?.user_id;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to send OTP';
        this.loading = false;
      }
    });
  }


  verifyOtp(): void {
    if (!this.otp) {
      this.error = 'Please enter OTP';
      return;
    }

    if (!this.user_id) {
      this.error = 'You are not authorized user';
      this.showOtpInput = false;
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';


    this.authService.verifyOtp(this.user_id, this.otp).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loading = false;
        
        // Storing Token to local storage
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to verify OTP';
        this.loading = false;
      }
    });
  }
  
}
