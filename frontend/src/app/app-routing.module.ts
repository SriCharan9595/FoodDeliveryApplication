import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"", loadChildren:()=>import('./public/component/component.module').then(m=>m.ComponentModule)
  },
  {
    path:"", loadChildren:()=>import('./private/component/component.module').then(m=>m.ComponentModule)
  },
  {
    path:"", loadChildren:()=>import('./admin/component/component.module').then(m=>m.ComponentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
