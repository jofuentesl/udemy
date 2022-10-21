import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public resgisterForm = this.fb.group( { 
    nombre: ['Jordi', [ Validators.required, Validators.minLength(3)]],
    email: ['jordi@reprodisseny.com', [ Validators.required ]],
    password: ['123456', [ Validators.required ]],
    password2: ['123456', [ Validators.required ]],
    terminos: [false, [ Validators.required ]],
  })
  
  
  constructor( private fb: FormBuilder) { }


  createUser() {
    console.log( this.resgisterForm.value );
  }

 
}
