import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute, private searchsService : SearchsService){}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({term}) => {
        this.searchGlobal(term)
        
      })
  }

  searchGlobal(term: string){
    this.searchsService.searchGlobal(term)
      .subscribe( (resp:any) => { 
        console.log(resp)
        this.users = resp.users;
        this.doctors = resp.doctors;
        this.hospitals = resp.hospitals;
      })
  }


}
