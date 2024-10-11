import { Component, inject } from '@angular/core';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ErrorService } from './shared/error.service';
import { ErrorModalComponent } from './shared/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent],
})
export class AppComponent {
  private errorService = inject(ErrorService);

  // take value string by: error = this._error.asReadonly(); 
  error = this.errorService.error; 
}
 
// 1. pse nuk shfaqet mesashi i <p> kur vlera eshte zero: } @else if (places().length === 0) { ne user-places
// 2. me kreyesorja, si e updeton nje array bosh ne file: 'user-places.json' libraris express kur shtojme ose kur fshim nje objekt??? 
