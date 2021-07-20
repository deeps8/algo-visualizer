import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgoVisualComponent } from './algo-visual/algo-visual.component';
import { RouterModule, Routes } from '@angular/router';

const sortRoutes:Routes = [
  {
    path:'',
    component:AlgoVisualComponent
  }
]

@NgModule({
  declarations: [
    AlgoVisualComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(sortRoutes)
  ]
})
export class SortingModule { }
