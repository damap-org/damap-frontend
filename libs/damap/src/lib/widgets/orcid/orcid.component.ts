import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orcid',
  templateUrl: './orcid.component.html',
  styleUrls: ['./orcid.component.css'],
  standalone: false,
})
export class OrcidComponent {
  @Input() orcidId: string;
}
