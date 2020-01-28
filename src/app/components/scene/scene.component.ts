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
  fun() {
    this.engServ.loadSkin('skinWhite');
    this.engServ.loadAccessories('assets/body/man_hair_black.png', 'man_hair_blac', 0);
    this.engServ.loadAccessories(['assets/accessories/Polyester_Viscose_Mens_Trouser.jpg'], ["trouser_0", "trouser_1", "trouser_2", "trouser_3"], 2)
    this.engServ.loadAccessories(['assets/accessories/teal-fabric-texture.jpg', "assets/accessories/Marvelous Desinger_emblem.png"], ["tshirt_0", "tshirt_1"], 1)
    this.engServ.loadAccessories('assets/accessories/running_shoes_c_4952.jpg', 'shoes', 1)
  }
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

    let x = this.engServ.getEventEmitter()
    x.subscribe(event => {
      console.log("event", event)
      this.fun()
    })




  }
}
