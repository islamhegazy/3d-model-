import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SceneComponent } from './components/scene/scene.component';
import { FemaleComponent } from './components/female/female.component';
import { FemaleKidComponent } from './components/female-kid/female-kid.component';
import { MaleKidComponent } from './components/male-kid/male-kid.component';


const routes: Routes = [
<<<<<<< HEAD

=======
  { path: '', redirectTo: '/main', pathMatch: "full" },
  { path: 'main', component: MainComponent },
  { path: 'male', component: SceneComponent },
  { path: 'female', component: FemaleComponent },
  { path: 'female-kid', component: FemaleKidComponent },
  { path: 'male-kid', component: MaleKidComponent }
>>>>>>> ba7bd612d5d3aaf1b361f0f71e09fad944a07797
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
