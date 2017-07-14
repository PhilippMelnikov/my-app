import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
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
  @Input() itemToEdit: any;


  constructor() { }

  ngOnInit() {

  }

}
