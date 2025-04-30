import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { UntypedFormControl } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiKeyDialogComponent } from './new-api-key-dialog.component';

@Component({
  selector: 'damap-api-key-table',
  templateUrl: './api-key-table.component.html',
  styleUrls: ['./api-key-table.component.css'],
})
export class ApiKeyTableComponent implements OnInit {
  apiKeys: string[] = [];
  loading = false;
  apiKeyName: UntypedFormControl = new UntypedFormControl('');

  constructor(
    private backendService: BackendService,
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.refreshApiKeys();
  }

  addApiKey() {
    this.loading = true;
    if (!this.apiKeyName.value) {
      this.feedbackService.error('API key name cannot be empty.');
      this.loading = false;
      return;
    }

    this.backendService.addApiKey(this.apiKeyName.value).subscribe({
      next: response => {
        this.dialog.open(ApiKeyDialogComponent, {
          data: { apiKey: response.value },
        });
        this.refreshApiKeys();
        this.apiKeyName.reset();
        this.loading = false;
      },
      error: error => (
        this.feedbackService.error(
          `Failed to create API key: ${error.message}`,
        ),
        (this.loading = false)
      ),
    });
  }

  removeApiKey(apiKey: string) {
    this.loading = true;
    this.backendService.removeApiKey(apiKey).subscribe({
      next: () => {
        this.feedbackService.success(
          `API key "${apiKey}" removed successfully.`,
        );
        this.refreshApiKeys();
      },
      error: () => {
        this.loading = false;
        this.feedbackService.error(`Failed to remove API key "${apiKey}".`);
      },
    });
  }

  refreshApiKeys() {
    this.backendService.getApiKeys().subscribe({
      next: apiKeys => {
        this.apiKeys = apiKeys;
        this.loading = false;
      },
      error: () => {
        this.feedbackService.error('Failed to load API keys.');
        this.loading = false;
      },
    });
  }

  refreshUserRoles() {
    this.backendService.refreshUserApiKeyRole().subscribe({
      next: response => {
        this.feedbackService.success(
          "Permissions refreshed successfully for current user's api keys.",
        );
      },
      error: () => {
        this.feedbackService.error(
          "Failed to refresh permissions for current user's api keys.",
        );
      },
    });
  }
}
