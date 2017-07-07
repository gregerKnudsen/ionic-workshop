import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

declare let cordova: any;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public items = [];
 
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {
      this.dataService.getData().then((todos) => {
 
      if(todos){
        this.items = JSON.parse(todos);
      }
 
    });
  }
 
  ionViewDidLoad(){

  }
 
  scanQRCode() {
  cordova.plugins.barcodeScanner.scan(
  function (result) {
    if(!result.cancelled)
    {
      alert("Barcode type is: " + result.format);
      alert("Decoded text is: " + result.text);
    }
    else
    {
      alert("You have cancelled scan");
    }
  },
  function (error) {
      alert("Scanning failed: " + error);
  });
}
}