import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeComponent } from '../../components/challenge/challenge.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChallengeComponent
  ],
  exports: [
    ChallengeComponent
  ]
})
export class ChallengeModule { }
