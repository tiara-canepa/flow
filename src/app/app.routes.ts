import { Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { MesComponent } from './calendario/mes/mes.component';
import { SemanaComponent } from './calendario/semana/semana.component';
import { DiaComponent } from './calendario/dia/dia.component';
import { RegistrarTareaComponent } from './registrar-tarea/registrar-tarea.component';

export const routes: Routes = [
  {
    path: '',
    component: CalendarioComponent,
    children: [
      {
        path: 'mes',
        component: MesComponent,
      },
      {
        path: 'semana',
        component: SemanaComponent,
      },
      {
        path: 'dia/:anno/:mes/:dia',
        component: DiaComponent,
      },
      {
        path: 'dia',
        redirectTo: () => {
          const fecha = new Date();
          const anno = fecha.getFullYear();
          const mes = fecha.getMonth();
          const dia = fecha.getDate();

          return `dia/${anno}/${mes}/${dia}`
        },
      },
    ]
  },
  {
    path: 'registrar',
    component: RegistrarTareaComponent,
  }
];
