import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { User } from '../models/user.model';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(private http : HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers:{'x-token':this.token}}
  }

  private transformUser ( results : any[] ): User[] {
    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)

    )
  }

  search (type: 'users'|'doctors'|'hospitals' , term: string){

    const url = `${base_url}/search/collection/${type}/${term}`;
    return this.http.get<any[]>(url , this.headers)
      .pipe(
        map((resp: any) => {
          switch (type) {

            case 'users':
            return this.transformUser(resp.results)
            
          
            default:
            return [];
          }
        })
      )

  }
}
