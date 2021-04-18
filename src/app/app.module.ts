import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreviewCanvasComponent } from './preview-canvas/preview-canvas.component';
import { JeelizFaceFilterComponent } from './jeeliz-face-filter/jeeliz-face-filter.component';
import { MediapipeFilterComponent } from './mediapipe-filter/mediapipe-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewCanvasComponent,
    JeelizFaceFilterComponent,
    MediapipeFilterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
