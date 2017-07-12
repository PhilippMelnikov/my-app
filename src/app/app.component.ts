import { Component, OnInit } from '@angular/core';
import { DataService } from './data-service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: any = [];
  constructor(private dataService: DataService){

  }

  ngOnInit(){
    // Retrieve categories from the API
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

  deleteCategory(id: number){
    this.dataService.deleteCategory(id).subscribe(res => {
      console.log(res);
    })
  }

  addCategory(title: string){

  }
}
