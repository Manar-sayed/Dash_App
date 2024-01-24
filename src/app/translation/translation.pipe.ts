import { Pipe, PipeTransform } from '@angular/core';
import { TranslatedashService } from './translatedash.service';

@Pipe({
  name: 'translation',
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslatedashService) {}

  transform(value: string | object | any, language: string): string {
    if (typeof value === 'string') {
      // If the value is a string, treat it as a regular translation key
      return this.translationService.translate(value, language);
    } else if (typeof value === 'object' && value !== null) {
      // If the value is an object, treat it as a translation key with placeholders
      const translatedValue = this.translationService.translate(
        value.key,
        language
      );
      // Replace placeholders in the translated value
      return this.interpolate(translatedValue, value.params || {});
    } else {
      // If the value is neither a string nor an object, return it as is
      return value as string;
    }
  }

  // Helper function for interpolating placeholders in a translated string
  private interpolate(value: string, params: { [key: string]: any }): string {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        value = value.replace(`{{${key}}}`, params[key]);
      }
    }
    return value;
  }
}
