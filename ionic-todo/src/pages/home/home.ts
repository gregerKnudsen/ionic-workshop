import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad(){
    this.items = [
        {title: 'Pick up dry clearners', description: 'test1'},
      	{title: 'Order flight tickets', description: 'test2'},
      	{title: 'Book hotel reservations', description: 'test3'}
    ];
  }
 
	addItem(){
  }
 
  viewItem(){
  }
}
