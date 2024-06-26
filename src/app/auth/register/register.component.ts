import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false ;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    email: ['', [Validators.required , Validators.email] ],
    password: ['' , Validators.required],
    req_password: ['' , Validators.required],
    terms: [ false, Validators.required ]

  }, {
    validators: this.passwordIguales('password','req_password') 
  })

  constructor(private fb: FormBuilder, 
              private userService : UserService,
              private router : Router
            ){}

  createUser(){
    this.formSubmitted = true ;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return
    } 

    this.userService.createUser( this.registerForm.value )
      .subscribe( resp => {
        this.router.navigateByUrl('/');
        
      }, (err) => {
        Swal.fire('Error', err.error.msg , 'error')
      })
    
  }

  campoNoValido( campo: string ): boolean {
    if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  aceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted
  }

  passwordNotValids(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('req_password')?.value

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    }else{
      return false;
    }
  }

  passwordIguales( pass1:string , pass2:string){
    return ( formGroup : FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual : true })
      }
    }
  }

}
