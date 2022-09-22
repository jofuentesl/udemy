import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme')!;
  public links;

  constructor( private settingService:SettingsService) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme( theme: string ) {

    this.settingService.changeTheme(theme);

    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

    this.links.forEach( elem => {

      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme'); 
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if( btnThemeUrl === currentTheme ) {
        elem.classList.add('working')
      }

    })

  }


}
