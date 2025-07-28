import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from '../tarea/tareas.service';
import { Estado, Tarea } from '../tarea/tarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-tarea',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modificar-tarea.component.html',
  styleUrl: './modificar-tarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModificarTareaComponent {
  private router = inject(Router);

  esIntervalo = false;
  servicioTareas: TareasService;
  tarea: Tarea 

  formTitulo: string = '';
  formDescripcion: string = '';
  formNotas: string = '';

  fechaInicio: string = '';
  horaInicio: string = '';

  fechaTermino: string = '';
  horaTermino: string = '';

  constructor(servicioTareas: TareasService) {
    this.servicioTareas = servicioTareas
    this.tarea = servicioTareas.getTareas()[0]   //CHANGE THIS

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

  }

  IsoToString(date : String) {

    let list = date.split("T")
    let fecha = list[0]
    let hora = list[1].substring(0,5)
    return [fecha, hora]

  }

  modificarTarea() {
    
    if (this.esIntervalo) {
      this.tarea.fechaInicio = new Date(`${this.fechaInicio}T${this.horaInicio}`);
    }

    this.tarea.titulo = this.formTitulo
    this.tarea.descripcion = this.formDescripcion
    this.tarea.notas = this.formNotas
    this.tarea.fechaTermino = new Date(`${this.fechaTermino}T${this.horaTermino}`)

    this.router.navigate(['']);
  }
}

