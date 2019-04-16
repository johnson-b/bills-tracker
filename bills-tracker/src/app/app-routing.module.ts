import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillsComponent } from './bills/bills.component';

const routes: Routes = [
  { path: '', redirectTo: 'bills', pathMatch: 'full' },
  { path: 'bills', component: BillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
