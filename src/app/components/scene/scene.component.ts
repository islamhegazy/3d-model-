import { EngineService } from './../../engine.service';
import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, NgZone, OnInit } from '@angular/core';
//import file from '../../../assets/body/skineBlack'

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;


  constructor(private engServ: EngineService) { }

  ngOnInit() {
    this.engServ.getCanvas(this.rendererCanvas);
    this.engServ.createRenderer();
    this.engServ.createScene();
    this.engServ.createCamera();
    this.engServ.createLight();
    this.engServ.animate();
    this.engServ.addControls();
    this.engServ.loadModel('assets/body/body.gltf');
    this.engServ.loadModel('assets/body/man_hair_black.gltf');
    this.engServ.loadModel('assets/body/eays.gltf');
    this.engServ.loadModel('assets/accessories/black-shoes.gltf');
    this.engServ.loadModel('assets/accessories/tshirt.gltf');
    this.engServ.loadModel('assets/accessories/man_trouser_blue.gltf');
    this.engServ.render()
  }
  change() {
    this.engServ.loadSkin('skinBlack');
    this.engServ.render()
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
