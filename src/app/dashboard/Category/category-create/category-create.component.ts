import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
})
export class CategoryCreateComponent {
  language: string = 'ar';
  errortrue: any = false;

  constructor(
    public categoryService: CategoryService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    private translatedashService: TranslatedashService
  ) {}

  newCategoryForm!: FormGroup;

  selectedFile: File | undefined;
  // public editPro: any;
  allGategory: any = [];
  ngOnInit(): void {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });
    this.loadCategory();

    this.newCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      arabicName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      describtion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      arabicDescribtion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      imageOrFile: new FormControl(' '),
    });
  }

  fileChanged(event: any) {
    const file = event.target.files[0];
    this.newCategoryForm.patchValue({
      imageOrFile: file,
    });
    console.log(file);
  }

  loadCategory() {
    const index = 0;
    const size = 20;

    // allGategory
    this.categoryService.getAllCategory(index, size).subscribe(
      (data) => {
        this.allGategory = data.items;
      },
      (error) => {
        console.error('Error fetching Gategory:', error);
      }
    );
  }

  addCategory(): void {
    if (this.newCategoryForm.valid) {
      const formData = this.newCategoryForm.value;

      // Your existing code to submit the form data
      this.categoryService.create(formData).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.showSuccessAlert(); // Show SweetAlert on success
          console.log(formData);
          this.router.navigate(['/dash/listcategory']);
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
      this.errortrue = true;
      console.log(this.errortrue);
    }
  }
  onInput() {
    this.errortrue = false;
  }
  goBack(): void {
    this.router.navigate(['/dash/listcategory']);
  }

  showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Category added successfully!',
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
  }
}
