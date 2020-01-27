import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Injectable, ElementRef, OnDestroy, NgZone } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EngineService implements OnDestroy {

    private canvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private gltfLoader: GLTFLoader
    private model: THREE.Object3D;
    private frameId: number = null;
    private controls;

    constructor(private ngZone: NgZone) { }

    ngOnDestroy() {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
        }
    }

    getCanvas(canvas: ElementRef<HTMLCanvasElement>): void {
        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas.nativeElement;

    }
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.autoClear = true;
    }

    createScene(): void {
        // create the scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xddddddd)
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 3)
        this.scene.add(this.camera);
    }

    createLight() {

        // Add lights
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene   
        this.scene.add(hemiLight);

        let dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // Add directional Light to scene    
        this.scene.add(dirLight);
        //pointLight    
        let dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight2.position.set(8, 12, -8);
        dirLight2.castShadow = false;
        dirLight2.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // Add directional Light to scene    
        this.scene.add(dirLight2);
    }

    addControls() {
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.rotateSpeed = 2;
        this.controls.zoomSpeed = 1.2;
        //this.controls.addEventListener('change', this.render.bind(this));

        // this.controls.maxPolarAngle = Math.PI / 2;
        // this.controls.minPolarAngle = Math.PI / 3;
        // this.controls.enableDamping = true;
        // this.controls.enablePan = false;
        // this.controls.dampingFactor = 0.1;
        // this.controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
        // this.controls.autoRotateSpeed = 0.5; // 30
    }

    animate(): void {
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => {
            if (document.readyState !== 'loading') {
                this.render();
            } else {
                window.addEventListener('DOMContentLoaded', () => {
                    this.render();
                });
            }

            window.addEventListener('resize', () => {
                this.resize();
            });
        });
    }

    render() {
        this.frameId = requestAnimationFrame(() => {
            this.render();
        });
        this.renderer.render(this.scene, this.camera);

    }

    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }


    loadModel(fileURl: string) {
        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.load(fileURl, (gltf) => {
            this.model = gltf.scene.children[0];
            this.model.scale.set(0.01, 0.01, .01);
            this.model.position.set(0, -1, 0);
            // for (let object of this.INITIAL_MAP_BODy) {
            //   this.initColor(this.model, object.childID, object.mtl);
            // }
            this.scene.add(this.model);
            this.loadSkin('skinWhite');
            this.loadAccessories('assets/body/man_hair_black.png', 'man_hair_blac', 0);
            this.loadAccessories(['assets/accessories/Polyester_Viscose_Mens_Trouser.jpg'], ["trouser_0", "trouser_1", "trouser_2", "trouser_3"], 2)
            this.loadAccessories(['assets/accessories/teal-fabric-texture.jpg', "assets/accessories/Marvelous Desinger_emblem.png"], ["tshirt_0", "tshirt_1"], 1)
            this.loadAccessories('assets/accessories/running_shoes_c_4952.jpg', 'shoes', 1)
            this.model.traverse((o) => {
                if (o instanceof THREE.Mesh) {
                    //console.log(o.material)
                    o.material['shininess'] = 5;
                }
            });
            console.log(this.scene)
            this.render();

        }, undefined, undefined);

    };

    loadSkin(skinType) {
        //skinTextures is loaded from server via skinUrl
        let skinTextures = ["face.jpg", "west.jpg", "leg.jpg"];
        let textureLoader = new THREE.TextureLoader()
        let face = textureLoader.load("assets/body/" + skinType + "/" + skinTextures[0]);
        let west = textureLoader.load("assets/body/" + skinType + "/" + skinTextures[1]);
        let leg = textureLoader.load("assets/body/" + skinType + "/" + skinTextures[2]);
        face.flipY = west.flipY = leg.flipY = false;
        let faceMatreial = new THREE.MeshPhongMaterial({ map: face });
        let westMatreial = new THREE.MeshPhongMaterial({ map: west });
        let legMatreial = new THREE.MeshPhongMaterial({ map: leg });
        faceMatreial.map.minFilter = westMatreial.map.minFilter = legMatreial.map.minFilter = THREE.LinearFilter;

        this.scene.traverse((o) => {
            if (o instanceof THREE.Mesh) {
                if (o.name === "body.001_2") {
                    o.material = faceMatreial;
                } else if (o.name === "body.001_1") {
                    o.material = westMatreial;
                } else if (o.name === "body.001_0") {
                    o.material = legMatreial
                }
            }
        });

    };

    loadAccessories(image, names, textureRepeat) {
        let textureLoaderM = new THREE.TextureLoader()
        let textureM;
        let textureMTLM;
        if (Array.isArray(image)) {
            image.forEach((element, index) => {
                textureM = textureLoaderM.load(element);
                textureM.wrapS = textureM.wrapT = THREE.RepeatWrapping;
                textureM.repeat.x = textureRepeat;
                textureM.repeat.y = textureRepeat;
                textureM.flipY = false;
                textureMTLM = new THREE.MeshPhongMaterial({
                    map: textureM, color: 0xffffff,
                    skinning: true,
                });
                textureMTLM.map.minFilter = THREE.LinearFilter;
                this.scene.traverse((o) => {
                    if (o instanceof THREE.Mesh) {
                        if (o.name === names[index]) {
                            o.material = textureMTLM;
                            console.log(o.material)
                        }
                    }
                });
            });

        } else {
            textureM = textureLoaderM.load(image);
            textureM.wrapS = textureM.wrapT = THREE.RepeatWrapping;
            textureM.repeat.x = textureRepeat;
            textureM.repeat.y = textureRepeat;
            textureM.flipY = false;
            textureMTLM = new THREE.MeshPhongMaterial({
                map: textureM, color: 0xffffff,
                skinning: true,
            });
            textureMTLM.map.minFilter = THREE.LinearFilter;
            this.scene.traverse((o) => {
                if (o instanceof THREE.Mesh) {
                    if (o.name === names) {
                        o.material = textureMTLM;
                    }
                }
            });
        }

    }

}