import { Component } from '@angular/core';

@Component({
  selector: 'app-mes',
  standalone: true,
  imports: [],
  templateUrl: './mes.component.html',
  styleUrl: './mes.component.scss'
})
export class MesComponent {
  hoy = new Date(2025, 5, 30);
  fechaVisual = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1);

  semanas: Array<Semana>;

  dias = ["L", "M", "Mi", "J", "V", "S", "D"];

  mes = this.hoy.getMonth();

  test = new Date(2000, 1, 1);

  constructor() {
    this.semanas = this.getSemanas(this.fechaVisual);
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

  cambiarMes(valor: number): void {
    this.fechaVisual.setMonth(this.fechaVisual.getMonth() + valor);

    this.semanas = this.getSemanas(this.fechaVisual);
  }

  getSemanas(date: Date): Array<Semana> {
    let semanas: Array<Semana> = [];

    let annoFecha = date.getFullYear();
    let mesFecha = date.getMonth();
    let diaFecha = date.getDate();

    let fecha = new Date(annoFecha, mesFecha, diaFecha);

    if (fecha.getDay() - 1 == -1) {
      fecha.setDate(fecha.getDate() - 6);
    } else {
      fecha.setDate(fecha.getDate() - (fecha.getDay() - 1));
    }

    for (let i = 0; i < 6; i++) {
      let diasSemana: Array<Dia> = [];

      for (let j = 0; j < 7; j++) {
        let dia = fecha.getDate();

        diasSemana.push({
          tieneTarea: false,
          diaDelMes: dia,
          activo: false,
        });

        fecha.setDate(dia + 1);
      }

      semanas.push({
        id: i,
        dias: diasSemana,
      })
    }

    return semanas;
  }
}

interface Dia {
  tieneTarea: boolean,
  diaDelMes: number,
  activo: boolean,
}

interface Semana {
  id: number,
  dias: Dia[],
}
