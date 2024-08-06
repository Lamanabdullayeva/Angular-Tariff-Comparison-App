import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TariffListComponent } from './tariff/components/tariff-list/tariff-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TariffListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
