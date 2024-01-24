import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatedWork } from '../related-work';
import { RelatedWorkService } from '../related-work.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product/product.service';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updaterelated-work',
  templateUrl: './updaterelated-work.component.html',
  styleUrls: ['./updaterelated-work.component.css'],
})
export class UpdaterelatedWorkComponent implements OnInit {
  language: string = 'ar';

  id: number = 0;
  newCategoryForm!: FormGroup;
  products: any = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private relatedworkService: RelatedWorkService,
    public router: Router,
    public productService: ProductService,
    private translatedashService: TranslatedashService,
    public dialogRef: MatDialogRef<UpdaterelatedWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });

    this.loadProducts();
    this.id = this.data.id;

    // this.relatedworkService.getById(this.id).subscribe((data) => {
    //   // Populate the form controls with the fetched data
    //   this.newCategoryForm.patchValue(data);
    // });

    this.relatedworkService.getById(this.id).subscribe((data) => {
      // Check if 'productId' property is available in the response
      if (data.productId !== undefined) {
        // Populate the form controls with the fetched data
        this.newCategoryForm.patchValue(data);
        console.log('data', data);
        console.log('data.productId', data.productId);
      } else {
        console.log('productId is undefined');
      }
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
      productId: new FormControl('', [Validators.required]), // Ensure this line is before patchValue
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
  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.productService.getAllProducts(this.language, index, size).subscribe(
      (data) => {
        this.products = data.items;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
    // // allGategory
    // this.productService.getAllCategory(index, size).subscribe(
    //   (data) => {
    //     this.allGategory = data.items;
    //     console.log(this.allGategory);
    //   },
    //   (error) => {
    //     console.error('Error fetching Gategory:', error);
    //   }
    // );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateRelatedWork(): void {
    if (this.newCategoryForm.valid) {
      const formData = this.newCategoryForm.value;

      // Your existing code to submit the form data
      this.relatedworkService.updateRelatedWork(this.id, formData).subscribe(
        (data) => {
          console.log('RelatedWork updated successfully:', data);
          this.onNoClick();
          this.showSuccessAlert('Related work updated successfully'); // Show SweetAlert on success

          this.router
            .navigateByUrl('/dash/listrelatedwork')
            .then((page) => window.location.reload());
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating RelatedWork:', error);
          this.dialogRef.close();
          window.location.reload();
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
}
