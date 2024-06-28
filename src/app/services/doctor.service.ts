import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Doctor } from '../models/doctor.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


const base_url = environment.base_url

interface DoctorResponse {
  ok:boolean,
  doctors: Doctor[]
}

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {headers:{'x-token':this.token}}
  }

  loadDoctors(){
    const url = `${base_url}/doctors/`;
    return this.http.get<DoctorResponse>(url , this.headers)
      .pipe(
        map( (resp:DoctorResponse) => resp.doctors )
      );
  }

  createDoctor( doctor: { name: string , hospital: string} ){
    const url = `${base_url}/doctors/`;
    return this.http.post(url, doctor ,this.headers);
  }

  updateDoctor( doctor: Doctor ){
    const url = `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor ,this.headers);
  }

  deleteDoctor( _id: string){
    const url = `${base_url}/doctors/${_id}`;
    return this.http.delete(url,this.headers);
  }

  getDoctorById(id: string){
    const url = `${base_url}/doctors/${id}`;
    return this.http.get<DoctorResponse>(url , this.headers)
      .pipe(
        map( (resp:DoctorResponse) => resp.doctors )
      );
  }

}
