import { Routes } from '@angular/router';
import { OtpAuthComponent } from './components/otp-auth/otp-auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { ChallengeDetailComponent } from './components/challenge-detail/challenge-detail.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'authenticate',
        pathMatch:'full'
    },

    {
        path:'authenticate',
        component:OtpAuthComponent
    },

    { 
        path: 'dashboard', 
        component: DashboardComponent
    },

    // { 
    //     path: 'pending-activities', 
    //     component: PendingActivitiesComponent
    // }

    {
        path: 'add-challenge',
        component: ChallengeComponent
    },

    {
        path: 'challenge-list',
        component: ChallengeListComponent
    },

    { 
        path: 'challenges/:id', 
        component: ChallengeDetailComponent 
    },

    { 
        path: '', 
        redirectTo: '/challenges', 
        pathMatch: 'full' 
    }
];
