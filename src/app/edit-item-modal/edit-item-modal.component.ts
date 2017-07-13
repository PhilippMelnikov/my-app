import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../models/item';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.css']
})
export class EditItemModalComponent implements OnInit {
  @ViewChild('myModal')
    myModal: ModalComponent;

  @Input() categories: any[];
  @Input() currentItem: Item;

  newItemForm: FormGroup = new FormGroup({
    category: new FormControl(),
    title: new FormControl(),
    selling_price: new FormControl(),
    purchase_price: new FormControl(),
  });

  constructor() { }

  ngOnInit() {
    this.myModal.onOpen.subscribe(() => {

      // this.newItemForm = new FormGroup({
      //   category: new FormControl(this.currentItem ? this.currentItem.category : null),
      //   title: new FormControl(this.currentItem ? this.currentItem.title : null),
      //   selling_price: new FormControl(this.currentItem ? this.currentItem.selling_price : null),
      //   purchase_price: new FormControl(this.currentItem ? this.currentItem.purchase_price : null),
      // });
      this.newItemForm.setValue({
        category: this.currentItem ? this.currentItem.category : null,
        title: this.currentItem ? this.currentItem.title : null,
        selling_price: this.currentItem ? this.currentItem.selling_price : null,
        purchase_price: this.currentItem ? this.currentItem.purchase_price : null,
       })
    })
  }

}
