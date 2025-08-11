import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { TareasService } from '../../tareas.service';
import { Tarea } from '../../tarea';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-semana',
    imports: [NgClass, RouterLink],
    standalone: true,
    templateUrl: './semana.component.html',
    styleUrl: './semana.component.scss'
})
export class SemanaComponent {

  hoy = new Date();
  dias = ["L", "M", "Mi", "J", "V", "S", "D"];
  diasSemana: number[];
  fechaVisual = new Date();
  horas: number[] = [];

  tareas: Tarea[] = [];
  tareasDeLaSemana: Tarea[] = [];
  celdasActivas: Celda[][] = [];

  constructor(servicioTareas: TareasService) {
    this.diasSemana = this.getDias(this.fechaVisual);

    for (var i = 0; i <= 24; i++) {
      this.horas[i] = i;
    }

    servicioTareas.getTareasSubject().subscribe(tareas => {
      this.tareas = tareas;
      this.tareasDeLaSemana = this.getTareasDeLaSemana();
      this.tareasDeLaSemana = this.tareasDeLaSemana.filter(t => t.estado != 0)
      this.celdasActivas = this.getCeldasActivas();
    })
  }

  // Entrega un arreglo de las tareas que corresponden a la semana que se está
  // mostrando
  getTareasDeLaSemana(): Tarea[] {
    let fecha = new Date(
      this.fechaVisual.getFullYear(),
      this.fechaVisual.getMonth(),
      this.fechaVisual.getDate()
    );

    if (fecha.getDay() == 0) {
      fecha.setDate(fecha.getDay() - 6);
    } else {
      fecha.setDate(fecha.getDate() - (fecha.getDay() - 1));
    }

    let fechaFin = new Date(fecha.getTime());
    fechaFin.setDate(fechaFin.getDate() + 7);

    return this.tareas.filter(tarea => {
      if (tarea.fechaInicio) {
        return (tarea.fechaInicio >= fecha && tarea.fechaInicio < fechaFin)
          || (tarea.fechaTermino >= fecha && tarea.fechaTermino < fechaFin)
      } else {
        return tarea.fechaTermino >= fecha && tarea.fechaTermino < fechaFin
      }
    })
  }

  // Entrega una matriz que describe los bloques horarios del calendario que
  // tienen tareas
  getCeldasActivas(): Celda[][] {
    let celdasActivas: Celda[][] = [];

    for (const hora of this.horas) {
      let row: Celda[] = [];

      for (const dia of this.diasSemana) {
        let tareas = this.getTareasEntreHoras(hora, dia);

        if (tareas.length > 0) {
          row.push({
            activo: true,
            id: tareas[0].id,
          })
        } else {
          row.push({
            activo: false,
          })
        }
      }

      celdasActivas.push(row);
    }

    return celdasActivas;
  }

  // Filtra el arreglo de tareas y entrega otro con las que están dentro de un
  // rango de una hora en un día dado
  getTareasEntreHoras(hora: number, dia: number): Tarea[] {
    let tareas = this.tareasDeLaSemana.filter(tarea => {
      let diaTermino = tarea.fechaTermino.getDate();
      let horaTermino = tarea.fechaTermino.getHours();

      if (tarea.fechaInicio) {
        let diaInicio = tarea.fechaInicio.getDate();
        let horaInicio = tarea.fechaInicio.getHours();

        return ((diaInicio === dia) && (horaInicio >= hora && horaInicio < hora + 1))
          || ((diaTermino === dia) && (horaTermino >= hora && horaTermino < hora + 1))
      } else {
        return (diaTermino === dia) && (horaTermino >= hora && horaTermino < hora + 1)
      }
    });

    return tareas;
  }

  stringMes(date: Date): string {
    let mes = date.getMonth();

    switch (mes) {
      case 0: return "ENE";
      case 1: return "FEB";
      case 2: return "MAR";
      case 3: return "ABR";
      case 4: return "MAY";
      case 5: return "JUN";
      case 6: return "JUL";
      case 7: return "AGO";
      case 8: return "SEP";
      case 9: return "OCT";
      case 10: return "NOV";
      case 11: return "DIC";
      default: return "";
    }
  }

  // Actualiza la interfaz con los días de la semana anterior o siguiente
  cambiarSemana(valor: number): void {
    this.fechaVisual.setDate(this.fechaVisual.getDate() + valor);

    this.diasSemana = this.getDias(this.fechaVisual);

    this.tareasDeLaSemana = this.getTareasDeLaSemana();
    this.celdasActivas = this.getCeldasActivas();
  }

  getDias(date: Date): Array<number> {
    let dias: number[] = [];

    let annoFecha = date.getFullYear();
    let mesFecha = date.getMonth();
    let diaFecha = date.getDate();

    let fecha = new Date(annoFecha, mesFecha, diaFecha);

    if (fecha.getDay() == 0) {
      fecha.setDate(fecha.getDate() - 6);
    } else {
      fecha.setDate(fecha.getDate() - (fecha.getDay() - 1));
    }

    for (let i = 0; i < 7; i++) {
      let dia = fecha.getDate();

      dias.push(dia);

      fecha.setDate(dia + 1);
    }

    return dias;
  }
}

interface Celda {
  activo: boolean,
  id?: number,
}
