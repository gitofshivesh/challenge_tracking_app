import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggingOut = false;

  isLoginPage: boolean = false;
  private routerSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        this.isLoginPage = event.urlAfterRedirects === '/authenticate';
      });
  }

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

  ngOnDestroy(): void {    
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
