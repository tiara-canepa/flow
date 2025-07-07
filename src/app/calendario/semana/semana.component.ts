import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-semana',
  standalone: true,
  imports: [NgClass],
  templateUrl: './semana.component.html',
  styleUrl: './semana.component.scss'
})
export class SemanaComponent {

  hoy = new Date(Date.now());
  dias = ["L", "M", "Mi", "J", "V", "S", "D"];
  diasSemana: number[];
  fechaVisual = new Date(Date.now());
  horas: number[] = [];

  constructor() {
    this.diasSemana = this.getDias(this.fechaVisual);

    for (var i = 0; i <= 24; i++) {
      this.horas[i] = i;
    }
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

  cambiarSemana(valor: number): void {
    this.fechaVisual.setDate(this.fechaVisual.getDate() + valor);

    this.diasSemana = this.getDias(this.fechaVisual);
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
