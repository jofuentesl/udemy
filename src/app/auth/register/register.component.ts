import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {


  public formSubmitted = false;

  public resgisterForm = this.fb.group( { 
    nombre: ['', [ Validators.required, Validators.minLength(3)]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    password2: ['', [ Validators.required ]],
    terminos: [false, [ Validators.required ]],
  }, {
    validators: this.passwordsIguales('password','password2')
  });
  
  
  constructor(  private fb: FormBuilder, 
                private usuarioService: UsuarioService,
                private router: Router) { }


  createUser() {
    this.formSubmitted = true;
    if ( this.resgisterForm.invalid ) {
      return;
    }

    //crear usuario
    this.usuarioService.crearUsuario( this.resgisterForm.value )
      .subscribe( resp => {
        this.router.navigateByUrl('/');
        console.log('Usuario creado');
        console.log(resp);
      }, (err)=> {
        //si sucede error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido( campo: string ):boolean {

    if ( this.resgisterForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.resgisterForm.get('password')?.value;
    const pass2 = this.resgisterForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTernimnos() {
    return !this.resgisterForm.get('terminos')?.value && this.formSubmitted
  }

  passwordsIguales( pass1Name:string, pass2Name:string ) {

    return ( formGroup:FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors( {noEsIgual: true} );
      }

    }
  }
 
}
