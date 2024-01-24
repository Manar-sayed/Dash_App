import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  language: string = 'ar';
  textDir: any;
  errortrue: any = false;

  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    private translatedashService: TranslatedashService
  ) {}
  newCategoryForm!: FormGroup;

  // currentProduct: Product = new Product(0, '', '', '', '', '', '', []);
  // proId: Number = 0;
  public editPro: any;
  allGategory: any = [];
  ngOnInit(): void {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
      if (this.language === 'en') {
        this.textDir = 'ltr';
        console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log(this.textDir);
      }
    });
    this.loadProducts();
    // this.proId = this.currentProduct.id;

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
      categoryID: new FormControl('', [Validators.required]),
      // imageOrFile: new FormControl(' '),
      video: new FormControl(' '),
    });
  }
  loadProducts() {
    const index = 0;
    const size = 20;

    // allGategory
    this.productService.getAllCategory(index, size).subscribe(
      (data) => {
        this.allGategory = data.items;
        // console.log(this.allGategory);
      },
      (error) => {
        console.error('Error fetching Gategory:', error);
      }
    );
  }

  save() {
    if (this.newCategoryForm.valid) {
      const formData = this.newCategoryForm.value;

      // Your existing code to submit the form data
      this.productService.create(formData).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.router.navigate(['/dash/listproduct']);
          this.showSuccessAlert(); // Show SweetAlert on success
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    } else {
      console.error();

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
    this.router.navigate(['/dash/listproduct']);
  }

  showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Product added successfully!',
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
  }
}
