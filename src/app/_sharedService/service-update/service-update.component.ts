import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../setting.service';
import { Setting } from '../setting';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslationService } from 'src/app/translation/translation.service';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css'],
})
export class ServiceUpdateComponent {
  setting: Setting = new Setting(0, '', '', '', '', '', '', '');
  newCategoryForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private settingService: SettingService,
    public dialogRef: MatDialogRef<ServiceUpdateComponent>,
    private translationService: TranslationService,
    private translatedashService: TranslatedashService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}
  currentLanguage: any = 'en';
  textDir: any;
  id: number = 0;
  errortrue: any = false;

  ngOnInit(): void {
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
    // const id = +this.route.snapshot.paramMap.get('id'); // Assuming you have a route parameter for the setting ID
    // const id = 1;
    this.getSetting(this.id);
    this.id = this.data.id;

    this.newCategoryForm = new FormGroup({
      id: new FormControl(),
      firstPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[0-9]{4,}'), // Assuming you want numeric input
      ]),
      secondPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[0-9]{4,}'), // Assuming you want numeric input
      ]),

      thirdPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[0-9]{4,}'), // Assuming you want numeric input
      ]),
      describtion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
      ]),
      location: new FormControl('', [Validators.required]), // Ensure this line is before patchValue
      map: new FormControl(' '),
    });
  }

  getSetting(id: number): void {
    this.settingService.getAllSetting().subscribe((setting) => {
      this.setting = setting;
      this.newCategoryForm.patchValue(setting);
    });
  }

  updateSetting() {
    if (this.newCategoryForm.valid) {
      const formData = this.newCategoryForm.value;

      this.activatedRoute.params.subscribe((p) => {
        this.settingService.updateSetting(formData).subscribe(() => {
          // Show SweetAlert on success
          this.showSuccessAlert('App Setting uploaded successfully!');

          this.router
            .navigateByUrl('/dash/listsetting')
            // .then(() =>
            //   this.showSuccessAlert('App Setting uploaded successfully!')
            // );
            .then((page) => window.location.reload());
        });
      });
      console.log('done');

      // this.dialogRef.close();
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
      this.errortrue = true;
      console.log(this.errortrue);
      // this.dialogRef.close();
    }
  }

  goBack(): void {
    this.router.navigate(['/dash/listsetting']);
    this.dialogRef.close();
  }
  showSuccessAlert(title: any): void {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
  }
}
