import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { filter, switchMap, take } from 'rxjs/operators';

import { BackendService } from '../../../services/backend.service';
import { DeleteRepositoryWarningDialogComponent } from './delete-repository-warning-dialog.component';
import { FeedbackService } from '../../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecommendedRepository } from '../../../domain/recommended-repository';

import { RepositoryDetails } from '../../../domain/repository-details';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { RepoTableComponent } from '../../dmp/repo/repo-table/repo-table.component';

@Component({
  selector: 'app-edit-repositories-page',
  templateUrl: './edit-repositories-page.component.html',
  styleUrls: ['./edit-repositories-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    RepoTableComponent,
    TranslatePipe,
  ],
})
export class EditRepositoriesPageComponent implements OnInit {
  private readonly backendService = inject(BackendService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly recommendedRepositories = signal<RecommendedRepository[]>([]);
  // Repo table needs repository objects and not recommend repositories
  readonly mappedRepositories = computed(() =>
    this.recommendedRepositories().map((repo) => {
      return {
        id: undefined,
        repositoryId: repo.repositoryId,
        title: repo.name,
      };
    }),
  );

  ngOnInit(): void {
    this.loadRepositories();
  }

  async loadRepositories(): Promise<void> {
    const repositories = await firstValueFrom(
      this.backendService.getAdminRecommendedRepositories(),
    );
    this.recommendedRepositories.set(repositories);
  }

  async addRepository(repository: RepositoryDetails): Promise<void> {
    const repositoryData: RecommendedRepository = {
      id: 0,
      repositoryId: repository.id,
    };

    try {
      await firstValueFrom(this.backendService.createAdminRecommendedRepository(repositoryData));
      this.feedbackService.success('Repository "' + repository.name + '" added successfully');
      await this.loadRepositories();
    } catch (error: any) {
      console.error('Error adding repository:', error);
      if (error.error?.message) {
        this.feedbackService.error(error.error.message);
      } else {
        this.feedbackService.error('http.error.recommended-repositories.save');
      }
    }
  }

  async deleteRepository(repository: RecommendedRepository): Promise<void> {
    this.dialog
      .open(DeleteRepositoryWarningDialogComponent, {
        data: { repository },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((confirmed): confirmed is true => confirmed === true),
        switchMap(() => this.backendService.deleteAdminRecommendedRepository(repository.id)),
      )
      .subscribe({
        next: () => {
          this.feedbackService.success('http.success.recommended-repositories.delete');
          void this.loadRepositories();
        },
        error: (error: any) => {
          if (error.error?.message) {
            this.feedbackService.error(error.error.message);
          } else {
            this.feedbackService.error('http.error.recommended-repositories.delete');
          }
        },
      });
  }

  navigateBack(): void {
    this.router.navigate(['/admin']);
  }
}
