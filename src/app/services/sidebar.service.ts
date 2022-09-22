import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Main menu',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: ''},
        { title: 'ProgressBar', url: 'progress'},
        { title: 'Grafica', url: 'grafica1'},
      ]
    }
  ]

  constructor() { }
}
