import { Injectable } from '@angular/core';
import { Tarea, Estado } from './tarea';

@Injectable({
  providedIn: 'root',
})
export class TareasService {

  tareas: Array<Tarea> = [];

  constructor() {

  }

  addTarea(tarea: Tarea): void {
    this.tareas.push(tarea);
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(tarea => { tarea.id != id })
  }

  getTareas(): Array<Tarea> {
    return this.tareas;
  }

  tareasDePrueba: Array<Tarea> = [
    {
      id: 0,
      fechaTermino: new Date(2025, 6, 5, 10),
      titulo: "Tarea 1",
      descripcion: "Descripción de la tarea 1",
      estado: Estado.Incompleta
    },
    {
      id: 1,
      fechaTermino: new Date(2025, 6, 5, 4),
      titulo: "Tarea 2",
      descripcion: "Descripción de la tarea 2",
      estado: Estado.Incompleta
    },
    {
      id: 2,
      fechaTermino: new Date(2025, 6, 6),
      titulo: "Tarea 3",
      descripcion: "Descripción de la tarea 3",
      estado: Estado.Incompleta
    },
    {
      id: 3,
      fechaTermino: new Date(2025, 6, 8),
      titulo: "Tarea 4",
      descripcion: "Descripción de la tarea 4",
      estado: Estado.Incompleta
    },
    {
      id: 4,
      fechaTermino: new Date(2025, 6, 2),
      titulo: "Tarea 5",
      descripcion: "Esto es una tarea completa",
      estado: Estado.Completada
    },
    {
      id: 5,
      fechaTermino: new Date(2025, 6, 3, 10),
      titulo: "Tarea 6",
      descripcion: "Esto es una tarea en progreso",
      estado: Estado.EnProgreso,
    },
    {
      id: 6,
      fechaInicio: new Date(2025, 6, 3, 2),
      fechaTermino: new Date(2025, 6, 3, 4),
      titulo: "Tarea 7",
      descripcion: "Esto es una tarea con un intervalo de tiempo",
      estado: Estado.Incompleta,
    }
  ]

  getTareasDePrueba(): Array<Tarea> {
    return this.tareasDePrueba;
  }
}
