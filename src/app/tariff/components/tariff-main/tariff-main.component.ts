import { Component } from '@angular/core';
import { TariffListComponent } from '../tariff-list/tariff-list.component';
import { TariffComparisonListComponent } from '../tariff-comparison-list/tariff-comparison-list.component';

@Component({
  selector: 'app-tariff-main',
  standalone: true,
  imports: [TariffListComponent, TariffComparisonListComponent],
  templateUrl: './tariff-main.component.html',
  styleUrl: './tariff-main.component.scss'
})
export class TariffMainComponent {

  public readonly labels={
    title:"Tariff Comparison App"
  }
}
