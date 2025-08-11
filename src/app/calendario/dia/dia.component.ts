import { Component, inject } from '@angular/core';
import { TareasService } from '../../tareas.service';
import { Tarea, Estado } from '../../tarea';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-dia',
    imports: [RouterModule],
    standalone: true,
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
  tareas: Array<Tarea> = [];
  tareasDelDia: Array<Tarea> = [];

  constructor(private servicioTareas: TareasService) {
    this.activatedRoute.params.subscribe(params => {
      this.dia = new Date(params['anno'], params['mes'], params['dia']);
    })

    servicioTareas.getTareasSubject().subscribe(tareas => {
      this.tareas = tareas;
      this.tareasDelDia = this.getTareasDelDia();
      this.tareasDelDia = this.tareasDelDia.filter(t => t.estado != 0)
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

  cambiarEstado(id: number, event: any) {
    this.servicioTareas.modificarEstado(id, event.value);
    let estado: Estado;
    switch (event.value) {
      case "0": estado = Estado.Completada; break;
      case "1": estado = Estado.EnProgreso; break;
      case "2": estado = Estado.Incompleta; break;
      default: estado = Estado.Incompleta; break;
    }

    this.servicioTareas.modificarEstado(id, estado);
  }

  deleteTarea(tarea: Tarea) {
    this.servicioTareas.eliminarTarea(tarea.id)
  }
}
