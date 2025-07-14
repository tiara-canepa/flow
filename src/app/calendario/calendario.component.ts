import { Component, inject } from '@angular/core';
import { MesComponent } from './mes/mes.component';
import { SemanaComponent } from './semana/semana.component';
import { DiaComponent } from './dia/dia.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [MesComponent, SemanaComponent, DiaComponent, RouterOutlet],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  rangoCalendario: string = 'mes';
  private router = inject(Router);

  constructor() {
    this.router.navigate(['/mes']);
  }

  cambiarRango(event: any) {
    // this.rangoCalendario = event.target.value;
    this.router.navigate([`/${event.target.value}`]);
  }
}
