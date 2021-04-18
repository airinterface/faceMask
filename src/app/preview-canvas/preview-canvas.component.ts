import { Component, AfterViewInit  } from '@angular/core';
@Component({
  selector: 'app-preview-canvas',
  templateUrl: './preview-canvas.component.html',
  styleUrls: ['./preview-canvas.component.scss']
})
export class PreviewCanvasComponent implements AfterViewInit  {

  constructor() { }
  canvasId = "jeeFaceFilterCanvas";
  ngAfterViewInit(): void {
    this.canvasId = "jeeFaceFilterCanvas";
  	console.info('canvas in the view.')
  }

}
