import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data-service/data.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { DeleteItemModalComponent } from './delete-item-modal/delete-item-modal.component';
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

  @ViewChild('deleteItemModal')
  deleteItemModalComponent: DeleteItemModalComponent;

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
      this.currentCategory = categories[0];
      this.getItemsbyCategory(categories[0]);
    });

    // handling modals

    this.addCategoryModalComponent.myModal.onClose.subscribe(category => {
      this.addCategory(category);
      this.addCategoryModalComponent.resetCategoryTitle();
    });

    this.addCategoryModalComponent.myModal.onDismiss.subscribe(() => {
      this.addCategoryModalComponent.resetCategoryTitle();
    });

    this.addItemModalComponent.myModal.onClose.subscribe(item => {
      this.addItem(item);
      this.addItemModalComponent.resetForm();
    });

    this.addItemModalComponent.myModal.onDismiss.subscribe(() => {
      this.addItemModalComponent.resetForm();
    });

    this.editItemModalComponent.myModal.onClose.subscribe(item => {
      this.editItem(this.currentItem._id, item);
    });

    this.deleteItemModalComponent.myModal.onClose.subscribe(() => {
      this.deleteItem(this.currentItem._id);
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

  getItemsbyCategoryNoName() {
    this.currentCategory = { title: 'Без категории' };
    this.dataService.getItemsbyCategoryNoName().subscribe(items => {
      this.items = items;
    })
  }

  addItem(item: Item) {
    this.dataService.addItem(item).subscribe(item => {
      if (item.category == this.currentCategory._id) {
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
          }
        }
      })
    });
  }

  deleteItem(id: string) {
    this.dataService.deleteItem(id).subscribe(res => {
      this.items.forEach((item, i, arr) => {
        if (item._id == id) {
          arr.splice(i, 1);
        }
      })
    })
  }

  setCurrentItem(item: any) {
    this.currentItem = item;
  }

  // Modal windows

  openDeleteCategoryModal(id: string) {
    this.deleteCategoryModalComponent.myModal.open();
    this.deleteCategoryModalComponent.myModal.onClose.subscribe(res => {
      this.dataService.deleteCategory(id).subscribe(result => {
        this.categories.forEach((category, i, arr) => {
          if (category._id == id) {
            arr.splice(i, 1);
          }
        })
        if (this.currentCategory._id == id) {
          this.getItemsbyCategory(this.categories[0]);
        }
        // if array of objects returned / items updated
        if(result[0]){
          // if noname category is currentCategory
          if (!this.currentCategory._id) {
            result.forEach((item) => {
              this.items.push(item);
            })
          }
        }
      })
    })
  }

  openAddCategoryModal() {
    this.addCategoryModalComponent.myModal.open();
  }

  openAddItemModal() {
    this.addItemModalComponent.myModal.open();
  }

  openDeleteItemModal(item: any) {
    this.setCurrentItem(item);
    this.deleteItemModalComponent.myModal.open();
  }

  openEditItemModal(item: any) {
    this.setCurrentItem(item);
    this.editItemModalComponent.assignForm(item);
    this.editItemModalComponent.myModal.open();
  }


}
