import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.css']
})
export class EditItemModalComponent implements OnInit {
  @ViewChild('myModal')
    myModal: ModalComponent;

  @Input() categories: any[];


  editItemForm: FormGroup  = new FormGroup({
    category: new FormControl(null),
    title: new FormControl(),
    selling_price: new FormControl(),
    purchase_price: new FormControl(),
  });

  constructor() { }

  ngOnInit() {

  }

  assignForm(item){
    this.editItemForm.setValue({
      category: item.category,
      title: item.title,
      selling_price: item.selling_price,
      purchase_price: item.purchase_price,
    });
  }


}
