import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estado } from '../tarea';
import { TareasService } from '../tareas.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
    selector: 'app-registrar-tarea',
    imports: [FormsModule],
    templateUrl: './registrar-tarea.component.html',
    styleUrl: './registrar-tarea.component.scss',
    standalone: true
})
export class RegistrarTareaComponent {
  private router = inject(Router);

  esIntervalo = false;

  formTitulo: string = '';
  formDescripcion: string = '';
  formNotas: string = '';

  fechaInicio: string = '';
  horaInicio: string = '';

  fechaTermino: string = '';
  horaTermino: string = '';

  constructor(private servicioTareas: TareasService, private location: Location) {
    
  }

  registrarTarea() {
    let inicioTarea;

    if (this.esIntervalo) {
      inicioTarea = new Date(`${this.fechaInicio}T${this.horaInicio}`);
    }

    this.servicioTareas.addTarea({
      id: this.servicioTareas.getTareas().length + 1,
      fechaInicio: inicioTarea,
      fechaTermino: new Date(`${this.fechaTermino}T${this.horaTermino}`),
      titulo: this.formTitulo,
      descripcion: this.formDescripcion,
      notas: this.formNotas,
      estado: Estado.Incompleta,
      notifDay: false,
      notifStart: false,
      notifEnd: false
    })

    this.location.back()
  }
}
