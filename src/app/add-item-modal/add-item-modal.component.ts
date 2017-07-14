import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.css']
})
export class AddItemModalComponent implements OnInit{
  @ViewChild('myModal')
    myModal: ModalComponent;

  @Input() categories: any[];

  newItemForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.resetForm();
  }

 resetForm(){
   this.newItemForm = new FormGroup({
     category: new FormControl(null),
     title: new FormControl(),
     selling_price: new FormControl(),
     purchase_price: new FormControl(),
   });
 }

}
