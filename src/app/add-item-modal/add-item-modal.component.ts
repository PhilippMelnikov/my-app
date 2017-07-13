import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../models/item'

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.css']
})
export class AddItemModalComponent implements OnInit {
  @ViewChild('myModal')
    myModal: ModalComponent;

  @Input() categories: any[];
  // newItem: Item = {
  //   title: "",
  //   purchase_price: 0,
  //   selling_price: 0,
  //   category: "",
  // };

  newItemForm: FormGroup = new FormGroup({
    category: new FormControl(),
    title: new FormControl(),
    selling_price: new FormControl(),
    purchase_price: new FormControl(),
  });
  constructor() { }

  ngOnInit() {
  }

}
