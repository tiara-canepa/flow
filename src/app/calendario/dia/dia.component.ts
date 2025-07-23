import { Component, inject } from '@angular/core';
import { TareasService } from '../../tareas.service';
import { Tarea, Estado } from '../../tarea';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dia',
  standalone: true,
  imports: [],
  templateUrl: './dia.component.html',
  styleUrl: './dia.component.scss'
})
export class DiaComponent {
  private activatedRoute = inject(ActivatedRoute);

  dia: Date = new Date();
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

    this.activatedRoute.params.subscribe(params => {
      this.dia = new Date(params['anno'], params['mes'], params['dia']);
    })
  }
}
