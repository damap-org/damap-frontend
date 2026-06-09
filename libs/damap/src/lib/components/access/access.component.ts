import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Access, UserDo } from '../../domain/access';
import { BackendService } from '../../services/backend.service';
import { FunctionRole } from '../../domain/enum/function-role.enum';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonCardComponent } from '../../widgets/person-card/person-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Dmp } from '../../domain/dmp';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../auth/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormField, MatInputModule } from '@angular/material/input';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { SearchFieldComponent } from '../../shared/search-field/search-field.component';

import { InfoMessageComponent } from '../../widgets/info-message/info-message.component';
import { TooltipComponent } from '../../widgets/tooltip/tooltip.component';

@Component({
  selector: 'damap-access',
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    PersonCardComponent,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    InfoMessageComponent,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    TooltipComponent,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatInputModule,
    SearchFieldComponent
],
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  standalone: true,
})
export class AccessComponent implements OnInit {
  private accessesSubject = new BehaviorSubject<Access[]>([]);
  accesses$ = this.accessesSubject.asObservable();
  isOwner$: Observable<boolean>;
  dmp$: Observable<Dmp>;
  id: number;
  protected readonly FunctionRole = FunctionRole;
  roles = Object.values(FunctionRole);
  userId: string;

  userSearchControl = new FormControl('');
  searchResult$: Observable<UserDo[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dmp$ = this.backendService.getDmpById(this.id);
      this.getAccess(this.id);
    } else {
      this.router.navigate(['/']);
    }

    this.userId = this.authService.getId();

    this.isOwner$ = this.accesses$.pipe(
      map(accesses =>
        accesses
          .filter(access => access.identifier === this.userId)
          .some(access => access.role === FunctionRole.OWNER),
      ),
    );

    this.searchResult$ = this.userSearchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term) {
          return this.backendService.searchAccessUsers(term).pipe(
            map(users => {
              const currentList = this.accessesSubject.getValue();
              return users.filter(
                user =>
                  !currentList.some(
                    existing => existing.identifier === user.identifier,
                  ),
              );
            }),
          );
        }
        return of([]);
      }),
    );
  }

  private getAccess(id: number) {
    this.backendService.getAccess(id).subscribe(accesses => {
      const formattedAccesses = accesses.map(access => {
        if (access.role === null || access.role === undefined) {
          access.role = FunctionRole.NO_RIGHTS;
        }
        return access;
      });
      this.accessesSubject.next(formattedAccesses);
    });
  }

  toggleAccess($event: MatRadioChange, access: Access): void {
    if ($event.value === FunctionRole.NO_RIGHTS && access.id) {
      // No_Rights is not in the backend, therefore we just delete the access
      this.backendService.deleteAccess(access.id).subscribe();
    } else {
      access.dmpId = this.id;
      access.role = $event.value;
      this.backendService
        .createAccess(access)
        .subscribe({ next: response => (access.id = response.id) });
    }
  }

  addNewAccess(event: MatAutocompleteSelectedEvent): void {
    const user: UserDo = event.option.value;
    this.userSearchControl.setValue('');

    let firstName = user.firstName;
    let lastName = user.lastName;

    const newAccess: Access = {
      id: 0,
      dmpId: this.id,
      identifier: user.identifier,
      firstName: firstName,
      lastName: lastName,
      mbox: user.email,
      role: FunctionRole.NO_RIGHTS,
    };

    const currentList = this.accessesSubject.getValue();
    this.accessesSubject.next([...currentList, newAccess]);
  }
}
