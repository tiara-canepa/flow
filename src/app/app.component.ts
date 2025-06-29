import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flow';
}
