import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

declare var THREE: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = HomePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
        
      var win: any = window;
      //this.initCube();

      if (win.ezar) {
        var ezar: any = win.ezar;
        ezar.initializeVideoOverlay(
          function() {
            ezar.getBackCamera().start();
            let self = this;
            setTimeout(()=> {

              const scene = new THREE.Scene();

              const cam = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
              const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true });
              renderer.setClearColor(0xffffff,0);
              renderer.setSize(window.innerWidth - 100, window.innerHeight - 100);
              document.body.appendChild(renderer.domElement);
                  
              const geometry = new THREE.BoxGeometry(500, 500, 500, 10, 10, 10);
              const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
              const cube = new THREE.Mesh(geometry, material);
                  
              scene.add(cube);
              cam.position.z = 2000; 

              var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
              scene.add( ambientLight );

              var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
              cam.add( pointLight );
              scene.add( cam );

              var human;
              var loader = new THREE.OBJLoader();

              loader.load(
                'https://threejs.org/examples/obj/male02/male02.obj',
                function ( object ) {
                  console.log(object);
                  human = object;
                  object.scale.x = 10;
                  object.scale.y = 10;
                  object.scale.z = 10;

                  object.traverse( function ( child ) {
                   if ( child instanceof THREE.Mesh ) {
                        child.material.color.setHex(0x00FF00);
                       }
                   } );
                  
                  scene.add( object );
                },
                function ( xhr ) {
                  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                function ( error ) {
                  console.log( 'An error happened' );
                }
              );       

              let cont = 0;

              function render() {
                  requestAnimationFrame(render);
                  cube.rotation.x += 0.01;
                  cube.rotation.y += 0.01;
                  if(human){
                    human.rotation.y += 0.01;
                    human.rotation.x += 0.01;
                    console.log(cont);
                    cont++;
                    if(cont > 50){
                      human.traverse( function ( child ) {
                       if ( child instanceof THREE.Mesh ) {
                            child.material.color.setHex(0xFF0000);
                           }
                       });
                    }
                  }
                  renderer.render(scene, cam);
              };
                      
              render();

              
              
            }, 3000);
          },
          function(err) {
            alert('unable to init ezar: ' + err);
          });
      } else {
        //alert('Unable to detect the ezAR plugin');
      }

      
    });
  }

  initCube(){
    
  }
}
