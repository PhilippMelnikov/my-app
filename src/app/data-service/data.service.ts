import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Item } from '../models/item'

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  // Get all categories from the API
  getAllCategories() {
    return this.http.get('/api/categories')
      .map(res => res.json());
  }



  deleteCategory(id: string) {
    return this.http.delete(`/api/categories/${id}`)
      .map(res => res.json());
  }

  addCategory(newCategoryTitle: string) {
    let body = JSON.stringify({title: newCategoryTitle});
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    let options = new RequestOptions({ headers: headers });
    console.log(newCategoryTitle);
    return this.http.post(`/api/categories`, body, options)
      .map(res => res.json());
  }

  getItemsbyCategory(category: string) {
    return this.http.get(`/api/items/${category}`)
      .map(res => {
        return res.json();
      });
  }

  addItem(item: Item){
    let body = JSON.stringify(item);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/items`, body, options)
      .map(res => res.json());
  }

  editItem(id: string, item: Item){
    let body = JSON.stringify(item);
    let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    let options = new RequestOptions({ headers: headers });
    return this.http.put(`/api/items/${id}`, body, options)
      .map(res => res.json());
  }

  deleteItem(id: string){
    return this.http.delete(`/api/items/${id}`)
      .map(res => res.json());
  }

}
