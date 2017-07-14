import { Component, OnInit,  ViewChild  } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})
export class AddCategoryModalComponent implements OnInit {
  @ViewChild('myModal')
    myModal: ModalComponent;

  newCategoryTitle: string = "";


  constructor() { }

  ngOnInit() {
  }

  resetCategoryTitle(){
    this.newCategoryTitle = "";
  }

}
