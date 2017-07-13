import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data-service/data.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { EditItemModalComponent } from './edit-item-modal/edit-item-modal.component';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('addCategoryModal')
  addCategoryModalComponent: AddCategoryModalComponent;

  @ViewChild('deleteCategoryModal')
  deleteCategoryModalComponent: DeleteCategoryModalComponent;

  @ViewChild('addItemModal')
  addItemModalComponent: AddItemModalComponent;

  @ViewChild('editItemModal')
  editItemModalComponent: EditItemModalComponent;

  categories: any = [];
  items: any = [];
  currentCategory: any = {};
  currentItem: any;
  newCategoryTitle: string = "";
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    // Retrieve categories from the API
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories[0].title);
      this.currentCategory = categories[0];
      this.getItemsbyCategory(categories[0]);
    });

    // handling modals

    this.addCategoryModalComponent.myModal.onClose.subscribe(category => {
      this.addCategory(category);
    });

    this.addItemModalComponent.myModal.onClose.subscribe(item => {
      this.addItem(item);
    });

    this.editItemModalComponent.myModal.onClose.subscribe(item => {
      this.editItem(this.currentItem._id, item);
    });
  }


  addCategory(newCategoryTitle: string) {
    this.dataService.addCategory(newCategoryTitle).subscribe(category => {
      this.categories.push(category);
    });
  }

  getItemsbyCategory(category: any) {
    this.currentCategory = category;
    this.dataService.getItemsbyCategory(category._id).subscribe(items => {
      this.items = items;
    })
  }

  addItem(item: Item) {
    this.dataService.addItem(item).subscribe(item => {
      if (item.category == this.currentCategory) {
        this.items.push(item);
      }
    });
  }

  editItem(id: string, item: Item) {
    this.dataService.editItem(id, item).subscribe(newItem => {
      this.items.forEach((item, i, arr) => {
        if (item._id == id) {
          if (newItem.category != this.currentCategory._id) {
            arr.splice(i, 1);
          } else {
            arr.splice(i, 1, newItem);
            console.log(newItem);
          }
        }
      })
    });
  }

  setCurrentItem(item: Item) {
    this.currentItem = item;
  }

  // Modal windows

  openDeleteCategoryModal(id: string) {
    this.deleteCategoryModalComponent.myModal.open();
    this.deleteCategoryModalComponent.myModal.onClose.subscribe(res => {
      this.dataService.deleteCategory(id).subscribe(res => {
        this.categories.forEach((category, i, arr) => {
          if (category._id == id) {
            arr.splice(i, 1);
          }
        })
      })
    })
  }

  openAddCategoryModal() {
    this.addCategoryModalComponent.myModal.open();
  }
  openAddItemModal() {
    this.addItemModalComponent.myModal.open();
  }

  openEditItemModal(item: Item) {
    this.setCurrentItem(item);
    this.editItemModalComponent.myModal.open();
  }


}
