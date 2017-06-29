# To-do app Accenture Summer Internship 2017

Let's create a todo-app together!

## Useful links

* [Ionic Docs](http://ionicframework.com/docs/intro/installation/)
* [Original Tutorial](https://www.joshmorony.com/build-a-todo-app-from-scratch-with-ionic-2-video-tutorial/) 

## Prerequisites

### Install Chrome

Install [Chrome](https://www.google.com/chrome/browser/desktop/index.html)

### Join Github

Register at [Github](https://github.com/join):

1. Use your Accenture email, _my.name@accenture.com_.
2. Plan: Unlimited public repositories for free.
3. Click "skip this step".

### Clone the project

1. Open Command Prompt. ```Windows Button``` ```Command Prompt```
2. Navigate to “C:\Users<your.accenture.id>\Desktop\Repos” or desired location.```cd Repos```
3. Clone the repository by typing: ```git clone https://github.com/gregerKnudsen/ionic-workshop.git```
4. Navigate to repository folder by typing the command:```cd ionic-workshop```

### Install Node

Install [Node.js Current / Latest](https://nodejs.org/en/)

Verify Node installation:

* ```node -v```

* ```npm -v```

### Install Ionic2

Install Ionic2:

```
npm install ionic -g
```

Install Cordova:

```
npm install cordova -g
```

### Install Visual Studio Code

Install [Visual Studio Code](https://nodejs.org/en/) or your favorite IDE

## Creating a simple To-Do app
### Step 1: Creating the home page

1. Generate a new project with a blank template by typing: ```ionic start ionic-todo blank --type ionic-angular```
2. Open Visual Studio Code. Tip: write the command ```code .``` If this works, skip 3-5.
3. Click “File”
4. Click “Open folder”
5. Select the folder named “ionic-todo” located in “C:\Users\<your.accenture.id\Desktop\repos\ionic-workshop”
6. Open the file “src/pages/home/home.html”. Tip for opening file, inside VSCode press:```CTRL+P``` and write ```home.html``` 
7. Open the command line again, and navigate to the folder ionic-todo: ```cd ionic-todo```
8. Start the application by running: ```ionic serve```. Do not terminate this process, let it run.
This will open your default browser, if this is not Chrome, copy the URL and visit it in Chrome.
To view the app in Mobile-view in Chrome: ```F12``` ```CTRL+SHIFT+M``` ```Select Iphone 6 as device```
9. Go back to Visual Studio Code rename the page title in the ```<ion-title>```-tag to “My Simple ToDo App”:
```html
<ion-title>
    My Simple ToDo App
</ion-title>
```
10. Add the following under the ```</ion-title>```-tag:
```html
<ion-buttons end>
    <button ion-button icon-only (click)="addItem()">
        <ion-icon name="add-circle"></ion-icon>
    </button>
</ion-buttons>
```
11. Replace the ```<ion-content padding>```-tag and its contents with the following to-dos container:
```html
<ion-content>
    <ion-list>
        <ion-item *ngFor="let item of items" (click)="viewItem(item)">
            {{item.title}}
        </ion-item>
    </ion-list>
</ion-content>
```
12. Open “src/pages/home/home.ts” and under the line “export class HomePage {“, add the following:
```ts
public items;
```
13. In the same file, add the following under the constructor:
```ts
ionViewDidLoad(){
    this.items = [
            {title: 'hi1', description: 'test1'},
            {title: 'hi2', description: 'test2'},
            {title: 'hi3', description: 'test3'}
        ];
}
 
addItem(){
}
 
viewItem(){
}
```
14. Save changes, refresh the browser and observe the new to-dos.

### Step 2: Adding items

Stash local changes and checkout branch Step-one_Creating-the-home-page, run the following command in terminal:

```
git stash && git checkout Step-one_Creating-the-home-page
```

1. Create the page for adding items to the ToDo list by typing the following commands in your Terminal: 
```cd ionic-workshop\ionic-todo\src\pages```
```ionic g page AddItem```
2. Open “src/app/app.module.ts” and add the following import: 
```ts
import { AddItemPage } from '../pages/add-item/add-item';
```
3. In the same file, add “AddItemPage” in the declarations and entryComponents array.
4. Open “src/pages/add-item/add-item.html” and replace its content with the following:
```html
<ion-header>
  <ion-toolbar color="secondary">
    <ion-title>
      Add Item
    </ion-title>
      <ion-buttons end>
        <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>
      </ion-buttons>
    </ion-toolbar>
</ion-header>
 
<ion-content>
  <ion-list>
 
    <ion-item>
      <ion-label floating>Title</ion-label>
      <ion-input type="text" [(ngModel)]="title"></ion-input>
    </ion-item>
 
    <ion-item>
      <ion-label floating>Description</ion-label>
      <ion-input type="text" [(ngModel)]="description"></ion-input>
    </ion-item>
 
  </ion-list>
 
  <button full ion-button color="secondary" (click)="saveItem()">Save</button> 
 
</ion-content>
```
5. Open “add-item.ts” and add the following fields, under export class AddItemPage: 
```ts
title;
description;
```
6. In the same file, rename the class name (name appearing after “export class” to ```AddItemPage```
7. Replace the import statement "import { IonicPage, NavController, NavParams } from 'ionic-angular';" with:
```ts
import { NavController, ViewController } from 'ionic-angular';
```
8. In the same file, replace “public navParams: NavParams” parameter in the constructor with:
```ts
public view: ViewController
```
9. Remove “@IonicPage()” annotation.
10. Under the constructor, add the following functions:
```ts
saveItem(){
    let newItem = {
    title: this.title,
    description: this.description
    };

    this.view.dismiss(newItem);
}
 
close(){
    this.view.dismiss();
}
```
11. Remove “@IonicPage()” annotation.
12. Open the file “src/pages/home/home.ts”. ```CTRL+P``` then ```home.ts```
13. Replace its content with the following (we are now replacing the dummy data with logic for adding data dynamically):
```ts
import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
 
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
 
  	public items = [];
 
  	constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
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
  	}
 
  	viewItem(item){
  	}
}
```
14. Tip: change app color by modifying hexadecimal color variables in the file “variables.scss”. Default variable is “secondary”.

### Step 3: Viewing items

We want to be able to click on an item in the list and see its description. This is what we are going to implement next.

Stash local changes and checkout branch Step-two_Adding-items, run the following command in terminal:

```
git stash && git checkout Step-two_Adding-items
```

1. Create an item-detail page by typing the following command: ```ionic g page ItemDetail```
2. In the file “app.module.ts”, add the following import statement:
```ts
import { ItemDetailPage } from '../pages/item-detail/item-detail';
```
3. In the same file, add “ItemDetailPage” to the declarations and entryComponents arrays.
4. Open the file “item-detail.html” and replace its content with the following:
```html
<ion-header>
    <ion-navbar color="secondary">
        <ion-title>
            {{title}}
        </ion-title>
    </ion-navbar>
</ion-header>
 
<ion-content>
    <ion-card>
        <ion-card-content>
            {{description}}
        </ion-card-content>
    </ion-card>
</ion-content>
```
5. Open “item-detail.ts” and add the following fields above the constructor:
```ts
 title;
 description”;
```
6. In the same file, replace the function body of “ionViewDidLoad()” with the following:
```ts
this.title = this.navParams.get('item').title;
this.description = this.navParams.get('item').description;
```
7. Remove annotation “@IonicPage()” in the file
8. Rename class name to “ItemDetailPage”
9. Open the file “home.ts” and add the following to the function body of “viewItem()”:
```ts
this.navCtrl.push(ItemDetailPage, {
    item: item
});
```
10. In the same file, add the following import statement: 
```ts
import { ItemDetailPage } from '../item-detail/item-detail';
```
### Step 4: Saving data permanently to storage

Now, the items in the todo-list will be cleared every time the application is closed. We are now going to improve this behavior by instead storing the items permanently. A data service will help us achieve this..

Stash local changes and checkout branch Step-three_Viewing-items, run the following command in terminal:

```
git stash && git checkout Step-three_Viewing-items
```

1. Install storage plugin by typing the following command in the terminal:
```npm install --save @ionic/storage```
2. Create a data service by typing the command:
```ionic g provider Data```
3. Open the file “data.ts” and replace its content with the following:
```ts
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Data {

    constructor(public storage: Storage){
    }

    getData() {
        return this.storage.get('todos');  
    }

    save(data){
        let newData = JSON.stringify(data);
        this.storage.set('todos', newData);
    }
}
```
4. Open the file “app.module.ts” and add the following import statements:
```ts
import { IonicStorageModule } from '@ionic/storage';
import { Data } from '../providers/data';
```
5. In the same file, add the following to the imports array:
```ts
IonicStorageModule.forRoot()
```
6. Add the following to the providers array:
```ts
Data
```
7. Open the file “home.ts” and add the following import statement: 
```ts
import { Data } from '../../providers/data';
```
8. In the same file, add the following to the constructor: 
```ts
public dataService: Data
```
9. Add the following to the body of the constructor:
```ts
this.dataService.getData().then((todos) => {
    if(todos){
            this.items = JSON.parse(todos); 
    }
});
```
10. Add the following to the body of the “saveItem()” function:
```ts
this.dataService.save(this.items);
```
11. Refresh browser and try to add some items.

### Step 5: Deploy to your own phone

Now we would like to see the real application on our own phone!

Stash local changes and checkout branch Step-four_Saving-data-permanently-to-storage, run the following command in terminal:

```
git stash && git checkout Step-four_Saving-data-permanently-to-storage
```

* Register for [Ionic View](https://apps.ionic.io/login)
* Download [Ionic View](http://view.ionic.io/) from App Store or Google Play on your mobile device.
* Deploy your app to Ionic View:
* Preferably use the windows command-line.
* Navigate to the root of the project, be inside the folder "ionic-todo"
* ```ionic login```
* ```ionic link```
* ```ionic login```
* Select Create new App
* From the web-site, click "Create App"
* Give the application a name, i.e "ToDoUka"
* Go back to Terminal:
* ```ionic link```
* Select the newly created app, "ToDoUka"
* ```ionic upload```
* Open Ionic View app on mobile and login.
* Find App.
* Click "View App".










## Authors

[Greger Siem Knudsen](https://github.com/gregerKnudsen) &
[Anders Langseth](https://github.com/langz)
