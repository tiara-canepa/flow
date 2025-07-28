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
  private servicioTareas;

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
  tareas: Array<Tarea> = [];
  tareasDelDia: Array<Tarea> = [];

  constructor(servicioTareas: TareasService) {
    this.servicioTareas = servicioTareas;

    this.activatedRoute.params.subscribe(params => {
      this.dia = new Date(params['anno'], params['mes'], params['dia']);
    })

    servicioTareas.getTareasSubject().subscribe(tareas => {
      this.tareas = tareas;
      this.tareasDelDia = this.getTareasDelDia();
    });
  }

  getTareasDelDia(): Array<Tarea> {
    return this.tareas.filter(tarea => {
      if (tarea.fechaInicio) {
        return (tarea.fechaInicio.getFullYear() === this.dia.getFullYear()
          && tarea.fechaInicio.getMonth() === this.dia.getMonth()
          && tarea.fechaInicio.getDate() === this.dia.getDate())
          ||
          (tarea.fechaTermino.getFullYear() === this.dia.getFullYear()
            && tarea.fechaTermino.getMonth() === this.dia.getMonth()
            && tarea.fechaTermino.getDate() === this.dia.getDate());
      } else {
        return tarea.fechaTermino.getFullYear() === this.dia.getFullYear()
          && tarea.fechaTermino.getMonth() === this.dia.getMonth()
          && tarea.fechaTermino.getDate() === this.dia.getDate();
      }
    });
  }

  eliminarTarea(id: number) {
    this.servicioTareas.eliminarTarea(id);
  }
}
