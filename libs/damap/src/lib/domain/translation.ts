export interface TranslationEntry {
  id: number;
  translationKey: string;
  language: string;
  defaultValue: string;
  value?: string | null;
  active: boolean;
}

export interface LanguageSummary {
  language: string;
  active: boolean;
}

export interface TranslationUpdatePayload {
  id: number;
  translationKey: string;
  language: string;
  defaultValue?: string;
  value?: string | null;
  active: boolean;
}
