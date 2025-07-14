import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent {
  private router = inject(Router);

  constructor() {
    this.router.navigate(['/mes']);
  }

  cambiarRango(event: any) {
    this.router.navigate([`/${event.target.value}`]);
  }
}
