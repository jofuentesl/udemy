import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements AfterViewInit {
  
  

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  
  public formSubmitted = false;

  public loginForm = this.fb.group( { 
  
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    remember: [false]
  });

  constructor(  private router:Router,
                private fb: FormBuilder, 
                private usuarioService: UsuarioService ) { }


  ngAfterViewInit(): void {
    
    this.googleInit();

  } 
  
  googleInit() {

    google.accounts.id.initialize({
      client_id: "543773099021-sbec95774fbo9s14pmegjjtcnopfhapp.apps.googleusercontent.com",
      callback: (response:any) =>this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt();

  }

  handleCredentialResponse( response: any) {

   // console.log("Encoded JWT ID token!!: " + response.credential);
    this.usuarioService.logingGoogle(response.credential).subscribe( 
      resp => {
        this.router.navigateByUrl('/');
      }
    )

  }

  login() {
    console.log("hola");
    
    this.usuarioService.login( this.loginForm.value as LoginForm )
    .subscribe({
      
      next: (resp) => {
        console.log(resp);
        if( this.loginForm.get('remember')?.value ) {
          
          localStorage.setItem('email', this.loginForm.get('email')?.value as string )

        } else {
          localStorage.removeItem('email')
        }

        this.router.navigateByUrl('/');
      },
      error: (err) => {
         //si sucede error
         console.log(err);
         Swal.fire('Error', err.error.msg, 'error')
        }
    });            
  }
}

