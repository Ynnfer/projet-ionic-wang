import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunctionPage } from './function.page';

const routes: Routes = [
  {
    path: '',
    component: FunctionPage
  },
  {
    path: 'photos',
    loadChildren: () => import('../photos/photos.module').then( m => m.PhotosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FunctionPageRoutingModule {}
