import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TareasService } from '../tareas.service'
import { Tarea } from '../tarea'
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { Location } from '@angular/common';


@Component({
    selector: 'app-modificar-tarea',
    imports: [FormsModule],
    standalone: true,
    templateUrl: './modificar-tarea.component.html',
    styleUrl: './modificar-tarea.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModificarTareaComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  tareaId = Number(this.route.snapshot.paramMap.get('id'));

  esIntervalo = false;
  servicioTareas: TareasService;
  tarea: Tarea | undefined

  formTitulo: string = '';
  formDescripcion: string = '';
  formNotas: string = '';

  fechaInicio: string = '';
  horaInicio: string = '';

  fechaTermino: string = '';
  horaTermino: string = '';

  constructor(servicioTareas: TareasService, private location: Location) {

    this.servicioTareas = servicioTareas
    this.tarea = servicioTareas.getTarea(this.tareaId)
    if (this.tarea) {
      this.formTitulo = this.tarea.titulo

      if (this.tarea.descripcion) {
        this.formDescripcion = this.tarea.descripcion
      }
      if (this.tarea.notas) {
        this.formNotas = this.tarea.notas
      }
      
      if (this.tarea.fechaInicio) {
        this.esIntervalo = true
        this.fechaInicio = this.IsoToString(this.tarea.fechaInicio.toISOString())[0]
        this.horaInicio = this.IsoToString(this.tarea.fechaInicio.toISOString())[1]
      }

      this.fechaTermino = this.IsoToString(this.tarea.fechaTermino.toISOString())[0]
      this.horaTermino = this.IsoToString(this.tarea.fechaTermino.toISOString())[1]
    } else {
      throwError('Task not found')
      this.tarea = undefined
    }

    

  }

  IsoToString(date : String) {

    let list = date.split("T")
    let fecha = list[0]
    let hora = list[1].substring(0,5)
    return [fecha, hora]

  }

  modificarTarea() {
    if (this.tarea) {
      if (this.esIntervalo) {
        this.tarea.fechaInicio = new Date(`${this.fechaInicio}T${this.horaInicio}`);
      }

      this.tarea.titulo = this.formTitulo
      this.tarea.descripcion = this.formDescripcion
      this.tarea.notas = this.formNotas
      this.tarea.fechaTermino = new Date(`${this.fechaTermino}T${this.horaTermino}`)
    }

    this.location.back();
  }
}

