export interface TranslationEntry {
  id: number;
  key: string;
  language: string;
  defaultValue: string;
  value?: string | null;
  active: boolean;
}

export interface TranslationUpdatePayload {
  id: number;
  key?: string;
  language?: string;
  defaultValue?: string;
  value?: string | null;
  active?: boolean;
}
