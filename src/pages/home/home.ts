import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var THREE: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scene: any;
    camera: any;
    renderer: any;
    cube: any;
    render: any;
    controls: any;
    action: string;

    constructor(private nav: NavController) {
    	
    }

}
