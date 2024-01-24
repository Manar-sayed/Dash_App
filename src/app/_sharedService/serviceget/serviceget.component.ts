import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SettingService } from '../setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting } from '../setting';
import { MatDialog } from '@angular/material/dialog';
import { ServiceUpdateComponent } from '../service-update/service-update.component';
import { TranslationService } from 'src/app/translation/translation.service';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-serviceget',
  templateUrl: './serviceget.component.html',
  styleUrls: ['./serviceget.component.css'],
})
export class ServicegetComponent implements OnInit {
  // @Input() language: string = 'ar';
  isLoading: boolean = false;

  constructor(
    private settingService: SettingService,
    activatedRoute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private translationService: TranslationService,
    private translatedashService: TranslatedashService
  ) {}
  textDir: any;

  settingGet: Setting = new Setting(0, '', '', '', '', '', '', '');
  // allGategory: any = [];
  // translatedDirAttribute: any = '';
  currentLanguage: any = 'ar';
  ngOnInit(): void {
    this.isLoading = true;

    this.translatedashService.getLanguage().subscribe((language) => {
      this.currentLanguage = language;
      if (this.currentLanguage === 'en') {
        this.textDir = 'ltr';
        console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log(this.textDir);
      }
      console.log('lang from services', this.currentLanguage);
    });
    // this.currentLanguage = this.translationService.getCurrentLanguage();

    this.settingService.getAllSetting().subscribe(
      (data) => {
        console.log('setting from fotter');
        this.settingGet = data;
        console.log(this.settingGet);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching setting:', error);
        this.isLoading = false;
      }
    );

    // ... (existing code)
  }

  // ngOnInit(): void {
  //   this.translatedashService.getLanguage().subscribe((language) => {
  //     this.language = language;
  //     this.updateTextDirection();
  //   });
  //   // this.translateDirAttribute();
  //   this.currentLanguage = this.translationService.getCurrentLanguage();

  //   this.settingService.getAllSetting().subscribe(
  //     (data) => {
  //       console.log('setting from fotter');
  //       this.settingGet = data;
  //       console.log(this.settingGet);
  //     },
  //     (error) => {
  //       console.error('Error fetching setting:', error);
  //     }
  //   );
  // }
  switchLanguage() {
    const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    this.translationService.setLanguage(newLanguage);
    this.currentLanguage = newLanguage;
  }
  // private translateDirAttribute() {
  //   this.translatedDirAttribute =
  //     this.translationService.translateAttribute('dir');
  // }

  openUpdateDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productid: Number
  ): void {
    this.dialog.open(ServiceUpdateComponent, {
      disableClose: true,
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: productid },
    });
  }
}
