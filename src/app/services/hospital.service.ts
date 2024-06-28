import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url

interface HospitalResponse {
  ok: boolean;
  hospitals: Hospital[];
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor( private http: HttpClient, private router: Router) { }
  
  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers:{'x-token':this.token}}
  }

  loadHospitals(){
    const url = `${base_url}/hospitals/`;
    return this.http.get<HospitalResponse>(url , this.headers)
      .pipe(
        map( (resp:HospitalResponse) => resp.hospitals )
      );
  }

  createHospital(name: string){
    const url = `${base_url}/hospitals/`;
    return this.http.post<HospitalResponse>(url, {name} ,this.headers);
  }

  updateHospital( _id: string ,name: string){
    const url = `${base_url}/hospitals/`;
    return this.http.put<HospitalResponse>(url, { name} ,this.headers);
  }

  deleteHospital( _id: string){
    const url = `${base_url}/hospitals/${_id}`;
    return this.http.delete<HospitalResponse>(url,this.headers);
  }


}
