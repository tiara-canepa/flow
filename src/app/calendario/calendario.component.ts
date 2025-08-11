import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
    selector: 'app-calendario',
    imports: [RouterOutlet, RouterModule],
    standalone: true,
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
