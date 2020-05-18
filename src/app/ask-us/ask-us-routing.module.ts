import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskUsPage } from './ask-us.page';

const routes: Routes = [
  {
    path: '',
    component: AskUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskUsPageRoutingModule {}
