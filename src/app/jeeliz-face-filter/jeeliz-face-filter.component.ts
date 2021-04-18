import { Component, AfterViewInit, Input } from '@angular/core';
import { JEEFACEFILTERAPI, NN_4EXPR } from 'facefilter'
import * as THREE from 'three';
//@ts-ignore
import JeelizThreeHelper from '../../helpers/JeelizThreeHelper';
//@ts-ignore
import JeelizResizer from '../../helpers/JeelizResizer';

window.THREE = THREE;
class JeelizHelper {
	canvasId: string;
	maxFaceDetected: number;
	faceFollowers: any;	
  threeCamera: any;
  canvasEl: any;

	constructor( id: any ){
		this.threeCamera     = null;
		this.canvasId        = id;
		this.faceFollowers   = null;
		this.maxFaceDetected = 1 ;
		this.setOption();
		console.info("JeelizHelper initialized:" + this.canvasId);
	}

	setOption(){
		this.maxFaceDetected = 1;
		this.faceFollowers   = new Array( this.maxFaceDetected );
	}

	onDetected (faceIndex:number, isDetected:boolean) {
	  if (isDetected) {
	    console.log('INFO in detect_callback(): DETECTED');
	  } else {
	    console.log('INFO in detect_callback(): LOST');
	  }
	}



	async loadModel(){
		let bestVideoSettings = await this.setupCanvas();
		let spec:any = await this.initFilter( bestVideoSettings );
		this.initThreeScene( spec );
	}

	async setupCanvas(){
		var that = this;
  	this.canvasEl = document.getElementById( this.canvasId );

	  return new Promise( function( resolve:any, reject:any ) {
		  JeelizResizer.size_canvas({
		  	overSamplingFactor: 1,
		    canvas: that.canvasEl,
		    callback: function(isError:boolean, bestVideoSettings:any){
		      resolve(bestVideoSettings);
		    }
		  });
	  }.bind(this));
	}

  onTrack( detectStatesArg: any ){
    const detectStates = Array.isArray( detectStatesArg ) ? detectStatesArg : [detectStatesArg];
    
    // update recognition
    JeelizThreeHelper.updateDetectStatus(detectStates, this.threeCamera);
    // render the video texture on the faceFilter canvas:
    JEEFACEFILTERAPI.render_video();
	  // update video and THREE faceFollowers poses:
		JeelizThreeHelper.render(detectStates, this.threeCamera);

  }

	initThreeScene( spec: any ){
		spec.alpha = true;
	  const threeStuffs = JeelizThreeHelper.init(spec, this.onDetected.bind(this) );

	   // CREATE A CUBE
	  const cubeGeometry = new THREE.BoxGeometry(1,1,1);
	  const cubeMaterial = new THREE.MeshNormalMaterial();
	  const threeCube    = new THREE.Mesh(cubeGeometry, cubeMaterial);
	  threeCube.frustumCulled = false;
	  threeStuffs.faceObject.add(threeCube);
	  // // CREATE LIGHT
	  // const ambientLight = new THREE.AmbientLight(0XFFFFFF, 0.8);
	  // threeStuffs.scene.add(ambientLight);

	  //CREATE THE CAMERA
	  this.threeCamera = JeelizThreeHelper.create_camera();

	}

	async initFilter( preferedVideoSetting: any ){
		var that = this;
		return new Promise( function( resolve:any, reject:any ) {

		    JEEFACEFILTERAPI.init({
		      canvas: that.canvasEl,
		      NNC: NN_4EXPR,
          followZRot: true,
		      maxFacesDetected: that.maxFaceDetected,
		      //followZRot: true,
		      callbackReady: function(errCode:any, spec:any){
			      if (errCode){
			        console.log('AN ERROR HAPPENS. ERR =', errCode);
			        return;
			      }
			      console.log('INFO: JEEFACEFILTERAPI IS READY');
			      resolve(spec);
			  	},
		      callbackTrack: that.onTrack.bind(that)
		    });
		}.bind(this) );
	}

	static initialize( id : any  ){
		const inst = new JeelizHelper( id );
		return inst;
	}
}




@Component({
  selector: 'app-jeeliz-face-filter',
  templateUrl: './jeeliz-face-filter.component.html',
  styleUrls: ['./jeeliz-face-filter.component.sass']
})
export class JeelizFaceFilterComponent  implements AfterViewInit  {

  private _canvasId: string;
  private jeelizHelper: any;

  constructor() { 
  	this._canvasId = '';
  }

  @Input()
  get canvasId(): string { return this._canvasId; }
  set canvasId( canvasId: string ) {  
    this._canvasId = canvasId;
  }

  ngAfterViewInit(): void {
  	var that = this;
  	this.jeelizHelper = JeelizHelper.initialize( this.canvasId );
  	setTimeout( function(){
  		console.info('------------- Setting up');
  		that.load();
  	}, 1000);
  }

  load():void {
	  this.jeelizHelper.loadModel();
  }

}
