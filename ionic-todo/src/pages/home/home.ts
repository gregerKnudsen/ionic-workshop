import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail'
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
 
  addItem(){
 
    let addModal = this.modalCtrl.create(AddItemPage);
 
    addModal.onDidDismiss((item) => {
 
          if(item){
            this.saveItem(item);
          }
 
    });
 
    addModal.present();
 
  }
 
  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }
 
  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
    		item: item
 	  });
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