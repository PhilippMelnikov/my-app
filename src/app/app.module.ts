import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { DataService } from './data-service/data.service';
import { AddCategoryModalComponent } from './add-category-modal/add-category-modal.component';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { EditItemModalComponent } from './edit-item-modal/edit-item-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { DeleteItemModalComponent } from './delete-item-modal/delete-item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryModalComponent,
    AddItemModalComponent,
    EditItemModalComponent,
    DeleteCategoryModalComponent,
    DeleteItemModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Bs3ModalModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
