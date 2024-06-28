import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription, delay } from 'rxjs';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: ``
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs?: Subscription;

  constructor(private hospitalService : HospitalService , 
              private modalImageService: ModalImageService , 
              private searchService : SearchsService ){}
 

  ngOnInit(): void {
    this.loadHospitals()
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe(img => this.loadHospitals())
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  loadHospitals(){
    this.loading = true ; 
    this.hospitalService.loadHospitals()
      .subscribe( hospitals => {
        this.loading = false ;
        this.hospitals = hospitals
      })
  }

  saveChanges(hospital: Hospital){
    console.log(hospital);

    this.hospitalService.updateHospital( hospital._id!, hospital.name)
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.name , 'success')
      })
    
  }

  deleteHospital(hospital: Hospital){
    console.log(hospital);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto no se podrá revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then( (result) => {
      if (result.value){
        this.hospitalService.deleteHospital( hospital._id!)
        .subscribe( resp => {
          this.loadHospitals();
          Swal.fire('Eliminado', hospital.name , 'success')
        })
      }
    })
    
  }

  async openSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if( value!.trim().length > 0 ){
      this.hospitalService.createHospital(value!)
        .subscribe( (resp:any) => {
          console.log(resp);
          this.hospitals.push(resp.hospitals)
        })
    }
  }

  openModal(hospital: Hospital){
    this.modalImageService.openModal('hospitals', hospital._id!, hospital.img! )
  }

  search ( term: string ){

    if (term.length === 0) {
      return this.loadHospitals()
    }

    return this.searchService.search('hospitals',term)
      .subscribe( results => {
        this.hospitals = results
      })
  }



}
