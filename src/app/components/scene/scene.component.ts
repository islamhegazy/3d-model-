import { EngineService } from './../../engine.service';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
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

    // this.engServ.loadModel('assets/body/man/body.gltf');
    // this.engServ.loadModel('assets/body/man/man_hair_black.gltf');
    // this.engServ.loadModel('assets/body/man/eays.gltf');

    // this.engServ.loadModel('assets/accessories/man/shoes/black-shoes.gltf');
    // this.engServ.loadModel('assets/accessories/man/tshirt/tshirt.gltf');
    // this.engServ.loadModel('assets/accessories/man/trouser/man_trouser_blue.gltf');

    this.engServ.loadModel('assets/body/women/women-body.gltf');
    this.engServ.loadModel('assets/body/women/wHair.gltf');
    this.engServ.loadModel('assets/body/women/weays.gltf');
    this.engServ.loadModel('assets/accessories/women/shoes/Wshoes.glb');
    this.engServ.loadModel('assets/accessories/women/wshirt/wshirt.gltf');

    this.engServ.render()
  }
  change() {
    this.engServ.loadSkin([], [], 1);
    this.engServ.render()
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
