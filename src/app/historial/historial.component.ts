import { Component, inject } from '@angular/core';
import { Estado, Tarea } from '../tarea';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  servicioTareas = inject(TareasService);
  tareasCompletadas: Tarea[] = [];

  constructor() {
    this.servicioTareas.getTareasSubject().subscribe((tareas) => {
      this.tareasCompletadas = tareas.filter(tarea => {
        return tarea.estado === Estado.Completada;
      })
    })
  }
}
