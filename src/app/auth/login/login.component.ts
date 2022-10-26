import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group( { 
  
    email: ['Maria', [ Validators.required, Validators.email ]],
    password: ['maria@gmail.com', [ Validators.required ]],
    remember: [false]
  });

  constructor(  private router:Router,
                private fb: FormBuilder, 
                private usuarioService: UsuarioService ) { }


  login() {
    
    //console.log( this.loginForm.value );
    
    //this.router.navigateByUrl('/');
    this.usuarioService.login( this.loginForm.value as LoginForm )
    .subscribe({
      next: resp => console.log(resp),
      error: (err) => {
         //si sucede error
         console.log(err);
         Swal.fire('Error', err.error.msg, 'error')
        }
    });            
  }
}

