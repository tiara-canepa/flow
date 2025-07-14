import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estado } from '../tarea';
import { TareasService } from '../tareas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-tarea',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar-tarea.component.html',
  styleUrl: './registrar-tarea.component.scss'
})
export class RegistrarTareaComponent {
  private router = inject(Router);

  esIntervalo = false;
  servicioTareas: TareasService;

  formTitulo: string = '';
  formDescripcion: string = '';
  formNotas: string = '';

  fechaInicio: string = '';
  horaInicio: string = '';

  fechaTermino: string = '';
  horaTermino: string = '';

  constructor(servicioTareas: TareasService) {
    this.servicioTareas = servicioTareas;
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
    })

    this.router.navigate(['']);
  }
}
