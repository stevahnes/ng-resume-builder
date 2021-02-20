import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BuilderComponent } from './components/builder/builder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileDropDirective } from './components/builder/directives/file-drop.directive';

@NgModule({
  declarations: [AppComponent, AboutComponent, BuilderComponent, FileDropDirective],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
