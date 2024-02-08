import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path:'home',
        loadChildren: () => import('../home/home.module').then(m=>m.HomePageModule)
      }, {
        path: 'games',
        loadChildren: () => import('../game-list/game-list.module').then(m=>m.GameListPageModule)
      }, {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m=>m.AboutPageModule)
      }, {
        path: 'functions',
        loadChildren: () => import('../function/function.module').then(m=>m.FunctionPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
