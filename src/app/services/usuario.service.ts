import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url; 


declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioDB!: Usuario;

  constructor(  private http: HttpClient,
                private router: Router,
                private ngZone: NgZone ) { }

  //logout
  logout() {
    localStorage.removeItem('token');
    
    //borrar sesión si esta logeado con Google
    google.accounts.id.revoke('inimardi.reprodisseny@gmail.com', ()=> {

        this.router.navigateByUrl('/login');
      
    })

  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    //peticion backend para verificar el token
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        const {
          email,
          google,
          nombre,
          role,
          img,
          uid
        } = resp.usuario;

        this.usuarioDB = new Usuario( nombre, email, img, google, role, uid);
        
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true ),
      catchError( error => of(false))
    );
  }

  crearUsuario (formData: RegisterForm) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token)
              })
            )
  }


  login ( formData: LoginForm) {

    return this.http.post(`${ base_url }/login`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token);
                })
              )
  }

  logingGoogle( token: string ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    )
    
  }
}
