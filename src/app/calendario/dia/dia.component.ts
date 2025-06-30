import { Component } from '@angular/core';
import { TareasService } from '../../tareas.service';
import { Tarea, Estado } from '../../tarea';

@Component({
  selector: 'app-dia',
  standalone: true,
  imports: [],
  templateUrl: './dia.component.html',
  styleUrl: './dia.component.scss'
})
export class DiaComponent {
  dia: Date = new Date(Date.now());
  diasStrings: string[] = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  tareasDelDia: Array<Tarea>;

  constructor(servicioTareas: TareasService) {
    this.tareasDelDia = servicioTareas.getTareasDePrueba();
  }

  // cambiarEstado(id: number, estado: Estado): void {
  //
  // }
}
