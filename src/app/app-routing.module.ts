import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { BuilderComponent } from './components/builder/builder.component';

const routes: Routes = [
  { path: '', redirectTo: '/builder', pathMatch: 'full' },
  { path: 'builder', component: BuilderComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
