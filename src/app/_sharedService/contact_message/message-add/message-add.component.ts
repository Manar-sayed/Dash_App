import { Component } from '@angular/core';
import { ContactmessageService } from '../contactmessage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.css'],
})
export class MessageAddComponent {
  constructor(
    public messageService: ContactmessageService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private translatedashService: TranslatedashService
  ) {}
  contactusForm!: FormGroup;
  currentLanguage: any = 'en';
  textDir: any;

  public editPro: any;
  allGategory: any = [];
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
    this.contactusForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9 ]{11}'),
      ]),
    });
  }

  save() {
    if (this.contactusForm.valid) {
      const formData = this.contactusForm.value;

      this.messageService.create(formData).subscribe(
        (response) => {
          console.log('Contact form added successfully:', response);
          this.showSuccessAlert('Message Added successfully!'); // Show SweetAlert on success
          this.contactusForm.reset();

          this.router.navigate(['/dash/listproduct']);
        },
        (error) => {
          console.error('Error adding Contact Form:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  goBack(): void {
    this.router.navigate(['/dash/listproduct']);
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
