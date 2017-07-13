import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data-service/data.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('addCategoryModal')
   addCategoryModalComponent: AddCategoryModalComponent;

   @ViewChild('addItemModal')
    addItemModalComponent: AddItemModalComponent;

  categories: any = [];
  items: any = [];
  currentCategory: string;
  newCategoryTitle: string = "";
  constructor(private dataService: DataService){

  }

  ngOnInit(){
    // Retrieve categories from the API
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories[0].title);
      this.currentCategory = categories[0]._id;
      this.getItemsbyCategory(categories[0]._id);
    });

    // handling modals

    this.addCategoryModalComponent.myModal.onClose.subscribe(category => {
      this.addCategory(category);
    });

    this.addItemModalComponent.myModal.onClose.subscribe(item => {
      this.addItem(item);
    });
  }

  deleteCategory(id: number){
    this.dataService.deleteCategory(id).subscribe(res => {

    })
  }

  addCategory(newCategoryTitle: string){
    this.dataService.addCategory(newCategoryTitle).subscribe(category => {
      this.categories.push(category);
    });
  }

  getItemsbyCategory(categoryID: string){
      this.currentCategory = categoryID;
      this.dataService.getItemsbyCategory(categoryID).subscribe(items => {
        this.items = items;
      })
  }

  addItem(item: Item){
    this.dataService.addItem(item).subscribe(item => {
      if(item.category == this.currentCategory){
        this.items.push(item);
      }
    });
  }

  // Modal windows
  openAddCategoryModal(){
    this.addCategoryModalComponent.myModal.open();
  }
  openAddItemModal(){
    this.addItemModalComponent.myModal.open();
  }


}
