import { Component } from '@angular/core';
import { TranslationService } from './translation/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'constructios';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
