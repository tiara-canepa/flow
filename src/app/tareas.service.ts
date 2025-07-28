import { Injectable } from '@angular/core';
import { Tarea, Estado } from './tarea';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {

  tareas: Array<Tarea>;
  tareasSubject$: BehaviorSubject<Tarea[]>;

  constructor() {
    this.tareas = [
      {
        id: 1,
        fechaTermino: new Date(2025, 7, 15),
        titulo: "Hola",
        estado: Estado.Incompleta,
      },
      {
        id: 2,
        fechaTermino: new Date(2025, 6, 15),
        titulo: "Adiós",
        estado: Estado.Incompleta,
      },
      {
        id: 3,
        fechaInicio: new Date(2025, 6, 12),
        fechaTermino: new Date(2025, 6, 13),
        titulo: "Meh",
        estado: Estado.Incompleta,
      },
      {
        id: 4,
        fechaInicio: new Date(),
        fechaTermino: new Date(),
        titulo: "Test",
        estado: Estado.Incompleta,
      }
    ];

    this.tareasSubject$ = new BehaviorSubject(this.tareas);
  }

  addTarea(tarea: Tarea): void {
    this.tareas.push(tarea);
    this.tareasSubject$.next(this.tareas);
  }

  modificarEstado(id: number, estado: number): void {
    let tarea = this.tareas.find(tarea => tarea.id === id);
    if (tarea) {
      tarea.estado = estado;
    }

    this.tareasSubject$.next(this.tareas);
  }

  eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    this.tareasSubject$.next(this.tareas);
  }

  getTareas(): Array<Tarea> {
    return this.tareas;
  }

  getTareasSubject(): Subject<Tarea[]> {
    return this.tareasSubject$;
  }

  // Entrega las tareas que estén dentro de un rango de fechas; si la tarea no
  // tiene fecha de inicio, entonces solo se devuelve si es que está entre un
  // mes antes y antes de la fecha de término dada.
  getTareasEntreFechas(fechaInicio: Date, fechaTermino: Date): void {
    this.tareas = this.tareas.filter(tarea => {
      if (tarea.fechaInicio) {
        return tarea.fechaInicio > fechaInicio && tarea.fechaTermino < fechaTermino;
      } else {
        let fechaRango = new Date(
          tarea.fechaTermino.getFullYear(),
          tarea.fechaTermino.getMonth() - 1,
          tarea.fechaTermino.getDate());
        return tarea.fechaTermino > fechaRango && tarea.fechaTermino < fechaTermino;
      }
    });

    this.tareasSubject$.next(this.tareas);
  }

  // Develve las tareas que empiecen o terminen en un mes dado
  // Meses están 0-indexados (Enero es 0)
  getTareasDelMes(mes: number): void {
    this.tareas = this.tareas.filter(tarea => {
      if (tarea.fechaInicio) {
        return tarea.fechaInicio.getMonth() === mes || tarea.fechaTermino.getMonth() === mes;
      } else {
        return tarea.fechaTermino.getMonth() === mes;
      }
    });

    // this.tareasSubject$.next(this.tareas);
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
