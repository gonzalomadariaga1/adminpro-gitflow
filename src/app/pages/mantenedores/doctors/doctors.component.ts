import { Component, OnDestroy, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { Subscription, delay } from 'rxjs';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchsService } from '../../../services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: ``
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  public loading: boolean = true;
  private imgSubs?: Subscription;

  constructor(private doctorService : DoctorService, private modalImageService: ModalImageService, private searchService : SearchsService){}
  
  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  
  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadDoctors())
  }

  loadDoctors(){
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe( doctors => {
        this.loading = false;
        this.doctors = doctors
      })
  }

  search ( term: string){
    if(term.length === 0){
      return this.loadDoctors()
    }

    return this.searchService.search('doctors',term)
      .subscribe( results => {
        this.doctors = results
      })
  }

  openModal(doctor: Doctor){
    this.modalImageService.openModal('doctors', doctor._id!, doctor.img! )
  }

  deleteDoctor(doctor: Doctor){

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto no se podrá revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then( (result) => {
      if (result.value){
        this.doctorService.deleteDoctor( doctor._id!)
        .subscribe( resp => {
          this.loadDoctors();
          Swal.fire('Eliminado', doctor.name , 'success')
        })
      }
    })
    
  }


}
