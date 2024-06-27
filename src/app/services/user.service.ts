import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.development';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoadUsers } from '../interfaces/load-users.interface';

declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor( private http: HttpClient, private router: Router) { }
  
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user?.uid || ''
  }

  get headers() {
    return {headers:{'x-token':this.token}}
  }

  tokenValidation(): Observable<boolean>{

    return this.http.get(`${ base_url }/login/renew`, {
      headers: { 'x-token' : this.token }
    }).pipe(
      map( (resp:any) => {

        const { email, google, name, role, uid, img = '' } = resp.user 
        this.user = new User( name, email, '', img, google, role, uid )
        localStorage.setItem('token' , resp.token );
        return true;

      }),
      catchError(error => of(false))
    );
  }

  createUser ( formData: RegisterForm){
    
    return this.http.post(`${ base_url }/users`, formData )
      .pipe(
        tap( (resp:any) => {
          localStorage.setItem('token' , resp.token)
        })
      )
    
  }

  updateUser( data: {email:string, name:string, role:string} ){
    data = {
      ...data,
      role: this.user!.role!
    }
    return this.http.put(`${ base_url }/users/${this.uid}`, data, this.headers);
  }

  login ( formData: LoginForm ){
    return this.http.post(`${ base_url }/login`, formData )
      .pipe(
        tap( (resp:any) => {
          localStorage.setItem('token' , resp.token)
        })
      )
  }

  loginGoogle ( token: string ){
    return this.http.post(`${ base_url }/login/google`, {token} )
    .pipe(
      tap( (resp:any) => {
        localStorage.setItem('token' , resp.token)
      })
    )
  }

  logout(){
    localStorage.removeItem('token')
    google.accounts.id.revoke( 'gonxxamd@gmail.com', () => {
      this.router.navigateByUrl('/login')
    })
  }

  loadUsers( desde: number = 0 ){
    const url = `${base_url}/users/?desde=${desde}`;
    return this.http.get<LoadUsers>(url , this.headers)
      .pipe(
        map( resp => {
          const users = resp.users.map(
            user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
          );
          return {
            total: resp.total,
            users
          }
        })
      );
  }

  deleteUser( user: User ){
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url , this.headers)
    
  }

  updateAndSaveUser( user: User ){

    return this.http.put(`${ base_url }/users/${user.uid}`, user, this.headers);
  }
}
