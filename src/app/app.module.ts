import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceneComponent } from './components/scene/scene.component';
import { MainComponent } from './components/main/main.component';
import { FemaleComponent } from './components/female/female.component';
import { FemaleKidComponent } from './components/female-kid/female-kid.component';
import { MaleKidComponent } from './components/male-kid/male-kid.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    MainComponent,
    FemaleComponent,
    FemaleKidComponent,
    MaleKidComponent,
    CharacterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
