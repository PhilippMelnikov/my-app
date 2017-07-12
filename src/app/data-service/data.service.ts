import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  // Get all categories from the API
  getAllCategories() {
    return this.http.get('/api/categories')
      .map(res => res.json());
  }

}
