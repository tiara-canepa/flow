import { Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { MesComponent } from './calendario/mes/mes.component';
import { SemanaComponent } from './calendario/semana/semana.component';
import { DiaComponent } from './calendario/dia/dia.component';
import { RegistrarTareaComponent } from './registrar-tarea/registrar-tarea.component';
import { HomeComponent } from './home/home.component';
import { ModificarTareaComponent } from './modificar-tarea/modificar-tarea.component';
import { VerTareasComponent } from './ver-tareas/ver-tareas.component';
import { HistorialComponent } from './historial/historial.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  }, 
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
    path: 'ver-tareas',
    component: VerTareasComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
  },
  {
    path: 'registrar',
    component: RegistrarTareaComponent,
  },
  {
    path: 'modificar/:id',
    component: ModificarTareaComponent,
  }
];
