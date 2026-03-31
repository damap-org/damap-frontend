import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, switchMap, take } from 'rxjs/operators';

import { BackendService } from '../../../services/backend.service';
import { DeleteRepositoryWarningDialogComponent } from './delete-repository-warning-dialog.component';
import { FeedbackService } from '../../../services/feedback.service';
import { LoadingState } from '../../../domain/enum/loading-state.enum';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecommendedRepository } from '../../../domain/recommended-repository';
import { RepoModule } from '../../dmp/repo/repo.module';
import { RepositoryDetails } from '../../../domain/repository-details';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-repositories-page',
  templateUrl: './edit-repositories-page.component.html',
  styleUrls: ['./edit-repositories-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    RepoModule,
    TranslateModule,
  ],
})
export class EditRepositoriesPageComponent implements OnInit {
  private readonly backendService = inject(BackendService);
  private readonly feedbackService = inject(FeedbackService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly repositories = signal<RecommendedRepository[]>([]);
  readonly allRepositories = signal<RepositoryDetails[]>([]);
  readonly loadingState = signal<LoadingState>(LoadingState.NOT_LOADED);

  readonly LoadingState = LoadingState;

  ngOnInit(): void {
    this.loadRepositories();
    this.loadAllRepositories();
  }

  async loadRepositories(): Promise<void> {
    try {
      const repositories = await firstValueFrom(
        this.backendService.getAdminRecommendedRepositories(),
      );
      this.repositories.set(repositories);
    } catch (error) {
      console.error('Error loading repositories:', error);
      this.feedbackService.error(
        'http.error.recommended-repositories.load',
      );
    }
  }

  async loadAllRepositories(): Promise<void> {
    this.loadingState.set(LoadingState.LOADING);
    try {
      const repositories = await firstValueFrom(
        this.backendService.getRepositories(),
      );
      this.allRepositories.set(repositories);
      this.loadingState.set(LoadingState.LOADED);
    } catch (error) {
      console.error('Error loading all repositories:', error);
      this.loadingState.set(LoadingState.FAILED);
      this.feedbackService.error('http.error.repositories.all');
    }
  }

  async addRepository(repository: RepositoryDetails): Promise<void> {
    const repositoryData: RecommendedRepository = {
      id: 0,
      repositoryId: repository.id,
    };

    try {
      await firstValueFrom(
        this.backendService.createAdminRecommendedRepository(repositoryData),
      );
      this.feedbackService.success(
        'Repository "' + repository.name + '" added successfully',
      );
      await this.loadRepositories();
    } catch (error: any) {
      console.error('Error adding repository:', error);
      if (error.error?.message) {
        this.feedbackService.error(error.error.message);
      } else {
        this.feedbackService.error(
          'http.error.recommended-repositories.save',
        );
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
        switchMap(() =>
          this.backendService.deleteAdminRecommendedRepository(repository.id),
        ),
      )
      .subscribe({
        next: () => {
          this.feedbackService.success(
            'http.success.recommended-repositories.delete',
          );
          void this.loadRepositories();
        },
        error: (error: any) => {
          if (error.error?.message) {
            this.feedbackService.error(error.error.message);
          } else {
            this.feedbackService.error(
              'http.error.recommended-repositories.delete',
            );
          }
        },
      });
  }

  getRepositoryDetails(repo: RepositoryDetails): void {
    if (!repo.description) {
      // Load repository details from backend
      this.backendService.getRepositoryById(repo.id).subscribe({
        next: result => {
          const updatedRepos = this.allRepositories().map(r =>
            r.id === result.id ? { ...r, ...result.changes } : r,
          );
          this.allRepositories.set(updatedRepos);
        },
        error: error => {
          console.error('Error loading repository details:', error);
        },
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['/admin']);
  }
}
