import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { DoctorService } from '../../../../services/doctor.service';
import { Doctor } from '../../../../models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: ``
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup
  public hospitals : Hospital[] = [];

  public hospitalSelected?: Hospital;
  public doctorSelected?: Doctor;


  constructor(private fb : FormBuilder, 
              private hospitalService : HospitalService,
              private doctorService: DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute  
            ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => this.loadDoctor(id))

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.loadHospital()

    this.doctorForm.get('hospital')?.valueChanges
      .subscribe( hospitalId => {
        this.hospitalSelected = this.hospitals.find( h => h._id === hospitalId)
        
      })
  }

  loadHospital(){
    this.hospitalService.loadHospitals()
      .subscribe( (hospitales: Hospital[] )  => {
        this.hospitals = hospitales;
        
      })
  }

  saveDoctor(){

    const { name } = this.doctorForm.value;

    if ( this.doctorSelected ){
      //update
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      this.doctorService.updateDoctor(data)
        .subscribe( resp => {
          Swal.fire('Doctor actualizado', `${ name } actualizado correctamente`, 'success');
        })
    }else{
      //create

      this.doctorService.createDoctor( this.doctorForm.value )
      .subscribe( (resp:any) => {
        console.log(resp);
        Swal.fire('Bien hecho', `${name} creado correctamente`,'success')
        this.router.navigateByUrl(`/dashboard/doctors/${resp.doctors._id}`)
        
      })

    }

    
  }

  loadDoctor(id: string ){

    if ( id === 'nuevo'){
      return
    }

    this.doctorService.getDoctorById(id)
      .pipe(delay(100))
      .subscribe( (doctor:any) => {
        console.log(doctor);

        if (!doctor){         
          this.router.navigateByUrl('dashboard/doctors')
        }else{
          const { name, hospital: {_id}} = doctor;
          this.doctorSelected = doctor
          this.doctorForm.setValue({ name, hospital: _id });
        }        
      },
      error => {
        this.router.navigateByUrl('dashboard/doctors')
      })
      
  }


}
