import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css'],
})
export class CategoryUpdateComponent implements OnInit {
  language: string = 'ar';

  categoryId: number = 0;
  isDisabled: boolean = true; // Set it to true or false based on your logic
  // idFormControl = new FormControl({ value: '', disabled: this.isDisabled });

  newCategoryForm!: FormGroup;

  // currentcategory: Category = {
  //   id: 0,
  //   name: '',
  //   arabicName: '',
  //   describtion: '',
  //   arabicDescribtion: '',
  //   imageOrFile: '',
  // };

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    public router: Router,
    private translatedashService: TranslatedashService,
    public dialogRef: MatDialogRef<CategoryUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });

    this.categoryId = this.data.id;
    this.categoryService
      .getById(this.categoryId, this.language)
      .subscribe((data) => {
        // Populate the form controls with the fetched data
        this.newCategoryForm.patchValue(data);
      });

    this.newCategoryForm = new FormGroup({
      id: new FormControl(),
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
  onNoClick(): void {
    this.dialogRef.close();
  }

  updatecategory(): void {
    // if (this.currentcategory) {
    //   this.categoryService
    //     .updatecategory(this.categoryId, this.currentcategory)
    //     .subscribe(
    //       (data) => {
    //         console.log('category updated successfully:', data);
    //         this.onNoClick();
    //         this.router
    //           .navigateByUrl('/dash/listcategory')
    //           .then((page) => window.location.reload());
    //       },
    //       (error) => {
    //         console.error('Error updating category:', error);
    //       }
    //     );
    // }

    if (this.newCategoryForm.valid) {
      const formData = this.newCategoryForm.value;

      // Your existing code to submit the form data
      this.categoryService.updatecategory(this.categoryId, formData).subscribe(
        (response) => {
          console.log('category updated successfully:', response);
          this.onNoClick();
          this.showSuccessAlert('Category uploaded successfully!'); // Show SweetAlert on success

          this.router
            .navigateByUrl('/dash/listcategory')
            .then((page) => window.location.reload());
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
    }
  }
  showSuccessAlert(title: any): void {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
  }

  fileChanged(event: any) {
    const file = event.target.files[0];
    this.newCategoryForm.patchValue({
      imageOrFile: file,
    });
    console.log(file);
  }
}
