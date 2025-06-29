import { Component } from '@angular/core';
import { MesComponent } from './mes/mes.component';
import { SemanaComponent } from './semana/semana.component';
import { DiaComponent } from './dia/dia.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [MesComponent, SemanaComponent, DiaComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  rangoCalendario: string = 'mes';

  cambiarRango(event: any) {
    this.rangoCalendario = event.target.value;
  }
}
