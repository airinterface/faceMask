import {Component, ElementRef, AfterViewInit,Input } from '@angular/core';
import MediapipeHelper from '../../helpers/MediapipeHelper';
import lottie from 'lottie-web';
import animationData from './loadingLottie.json';
@Component({
  selector: 'app-mediapipe-filter',
  templateUrl: './mediapipe-filter.component.html',
  styleUrls: ['./mediapipe-filter.component.scss']
})
export class MediapipeFilterComponent  implements AfterViewInit  {

  private _canvasId: string = "";
  private el: Element;
  private loadingAnim: any;

  @Input()
  get canvasId(): string { return this._canvasId; }
  set canvasId( canvasId: string ) {  
    this._canvasId = canvasId;
  }

  constructor(private elRef:ElementRef) {
    this.el = elRef.nativeElement;
  }

  detectedCallback(): void {
    var loadingElement = this.el.querySelector(".loading");
    this.loadingAnim.pause();
    loadingElement.classList.add("loaded");
  }


  setLoading(): void {
    var loadingElement = this.el.querySelector(".loading .spinner");

    this.loadingAnim = lottie.loadAnimation({
    container: loadingElement, // the dom element
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animationData // the animation data
    // rendererSettings: {
    //   context: canvasContext, // the canvas context
    //   scaleMode: 'noScale',
    //   clearCanvas: false,
    //   progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
    //   hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
    // }
    });

  }

  ngAfterViewInit(): void {
    this.setLoading();
  	MediapipeHelper.prepare();
  	MediapipeHelper.loadMeiapipe();
		MediapipeHelper.start( this.detectedCallback.bind(this) );

  }

}
