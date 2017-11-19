import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InitialComponent} from "./initial/initial.component";
import {ResultsComponent} from "./results/results.component";

const appRoutes: Routes = [
  {path: '', component: InitialComponent},
  {path: 'results', component: ResultsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
