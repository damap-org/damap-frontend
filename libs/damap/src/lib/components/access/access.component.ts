import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Access } from '../../domain/access';
import { BackendService } from '../../services/backend.service';
import { FunctionRole } from '../../domain/enum/function-role.enum';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonCardComponent } from '../../widgets/person-card/person-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Dmp } from '../../domain/dmp';
import { MatButtonModule } from '@angular/material/button';
import { InfoMessageModule } from '../../widgets/info-message/info-message.module';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../../widgets/tooltip/tooltip.module';

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
    InfoMessageModule,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    TooltipModule,
  ],
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  standalone: true,
})
export class AccessComponent implements OnInit {
  accesses$: Observable<Access[]>;
  isOwner$: Observable<boolean>;
  dmp$: Observable<Dmp>;
  id: number;
  protected readonly FunctionRole = FunctionRole;
  roles = Object.values(FunctionRole);
  userId: string;

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
          .filter(access => access.universityId === this.userId)
          .some(access => access.access === FunctionRole.OWNER),
      ),
    );
  }

  private getAccess(id: number) {
    this.accesses$ = this.backendService.getAccess(id).pipe(
      map(accesses => {
        return accesses.map(access => {
          // Frontend extension to deal with no access entities, since the backend doesnt have a no rights field
          if (access.access === null || access.access === undefined) {
            access.access = FunctionRole.NO_RIGHTS;
          }
          return access;
        });
      }),
    );
  }

  toggleAccess($event: MatRadioChange, access: Access): void {
    if ($event.value === FunctionRole.NO_RIGHTS && access.id) {
      // No_Rights is not in the backend, therefore we just delete the access
      this.backendService.deleteAccess(access.id).subscribe();
    } else {
      access.dmpId = this.id;
      access.access = $event.value;
      this.backendService
        .createAccess(access)
        .subscribe({ next: response => (access.id = response.id) });
    }
  }
}
