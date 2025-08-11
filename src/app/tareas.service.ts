import { Injectable } from '@angular/core';
import { Tarea, Estado } from './tarea';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { NotificationService } from './notificacion/notificacion.service';

@Injectable({
  providedIn: 'root',
})
export class TareasService {

  tareas: Array<Tarea>;
  tareasSubject$: BehaviorSubject<Tarea[]>;

  constructor(private notificationService: NotificationService) {
    this.tareas = [
      {
        id: 1,
        fechaTermino: new Date(2025, 7, 15),
        titulo: "Hola",
        estado: Estado.Incompleta,
        notifDay: false,
        notifStart: false,
        notifEnd: false
      },
      {
        id: 2,
        fechaTermino: new Date(2025, 6, 15),
        titulo: "Adiós",
        estado: Estado.Incompleta,
        notifDay: false,
        notifStart: false,
        notifEnd: false
      },
      {
        id: 3,
        fechaInicio: new Date(2025, 6, 12),
        fechaTermino: new Date(2025, 6, 13),
        titulo: "Meh",
        estado: Estado.Incompleta,
        notifDay: false,
        notifStart: false,
        notifEnd: false
      },
      {
        id: 4,
        fechaInicio: new Date(),
        fechaTermino: new Date(),
        titulo: "Test",
        estado: Estado.Incompleta,
        notifDay: false,
        notifStart: false,
        notifEnd: false
      }
    ];

    this.tareasSubject$ = new BehaviorSubject(this.tareas);

    setInterval(() => this.checkTareasTerminadas(), 60_000);
    this.checkTareasTerminadas();
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
    this.tareas = this.tareas.filter(tarea => tarea.id != id )
    this.tareasSubject$.next(this.tareas);
  }
  
  getTarea(id: number): Tarea | undefined {
    return this.tareas.find(t => t.id === id);
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

  private checkTareasTerminadas() {
    const now = new Date();
    this.tareas.forEach(tarea => {
      if (tarea.fechaTermino < new Date(now.getTime() + 24 * 60 * 60 * 1000) && tarea.estado != 0 && !tarea.notifEnd) {
        this.notificationService.sendNotification(`La tarea "${tarea.titulo}" terminará en un dia`);
        tarea.notifDay = true;
      }
      if (tarea.fechaInicio) {
        if (tarea.fechaInicio < now && tarea.estado != 0 && !tarea.notifStart) {
          this.notificationService.sendNotification(`La tarea "${tarea.titulo}" ha empezado`);
          tarea.notifStart = true;
        }
      }
      if (tarea.fechaTermino < now && tarea.estado != 0 && !tarea.notifEnd) {
        this.notificationService.sendNotification(`La tarea "${tarea.titulo}" ha terminado`);
        tarea.notifEnd = true;
      }
    });
  }
}
