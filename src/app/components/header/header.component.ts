import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggingOut = false;

  constructor(
    private authService: AuthService
  ) {}

  logout(event: Event): void {
    event.preventDefault();
    
    if (this.isLoggingOut) return;
    
    this.isLoggingOut = true;
    
    this.authService.logout().subscribe({
      next: () => {        
        this.isLoggingOut = false;
      },
      error: (error) => {
        console.error('Logout failed:', error);
        this.isLoggingOut = false;       
        
        localStorage.clear();
        window.location.href = '/authenticate';
      }
    });
  }
}
