import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-delete-item-modal',
  templateUrl: './delete-item-modal.component.html',
  styleUrls: ['./delete-item-modal.component.css']
})
export class DeleteItemModalComponent implements OnInit {
  @ViewChild('myModal')
    myModal: ModalComponent;

  @Input() itemToDelete: any;

  itemId: string;

  constructor() { }

  ngOnInit() {
    this.myModal.onOpen.subscribe(() => {
      this.itemId = this.itemToDelete ? this.itemToDelete._id : null;
    });
  }

}
