import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TareasService } from '../tareas.service';
import { Estado, Tarea } from '../tarea'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-tareas',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './ver-tareas.component.html',
  styleUrl: './ver-tareas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerTareasComponent {

  tareas: Array<Tarea> = [];
  tareasPendientes: Array<Tarea> = []
  days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]

  constructor(private servicioTareas: TareasService) {
    servicioTareas.getTareasSubject().subscribe(tareas => {
      this.tareas = tareas;
      this.tareasPendientes = this.tareas.filter(t => t.estado != 0)
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
