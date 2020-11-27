import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrigaComponent } from './origa/origa.component';
import { FakeService } from './services/fake.service';

const routes: Routes = [
  {
    path:'',
    component:OrigaComponent,
    resolve:{
      data:FakeService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
