import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'sorting',
    loadChildren: ()=>import('./sorting/sorting.module').then(m=>m.SortingModule)
  },
  {
    path:'',
    redirectTo:'sorting',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
