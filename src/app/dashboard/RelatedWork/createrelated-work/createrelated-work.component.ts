import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatedWork } from '../related-work';
import { RelatedWorkService } from '../related-work.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import { ProductService } from '../../product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createrelated-work',
  templateUrl: './createrelated-work.component.html',
  styleUrls: ['./createrelated-work.component.css'],
})
export class CreaterelatedWorkComponent implements OnInit {
  language: string = 'ar';
  errortrue: any = false;

  constructor(
    public relatedworkService: RelatedWorkService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    private productService: ProductService,
    private translatedashService: TranslatedashService
  ) {}
  // newRelatedWork: RelatedWork = {
  //   id: 0,
  //   name: '',
  //   arabicName: '',
  //   describtion: '',
  //   arabicDescribtion: '',
  //   imageOrFile: '',
  //   productId: 0,
  // };

  newRelatedWorkForm!: FormGroup;

  selectedFile: File | undefined;
  allProduct: any = [];
  ngOnInit(): void {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
      this.loadProducts();
    });

    this.newRelatedWorkForm = new FormGroup({
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
      productId: new FormControl('', [Validators.required]),
      imageOrFile: new FormControl(' '),
    });
  }
  fileChanged(event: any) {
    const file = event.target.files[0];
    this.newRelatedWorkForm.patchValue({
      imageOrFile: file,
    });
    console.log(file);
  }
  // loadRelatedWork() {
  //   const index = 0;
  //   const size = 20;

  //   this.relatedworkService
  //     .getAllRelatedWork(this.language, index, size)
  //     .subscribe(
  //       (data) => {
  //         this.allProduct = data.items;
  //       },
  //       (error) => {
  //         console.error('Error fetching Gategory:', error);
  //       }
  //     );
  // }

  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.productService.getAllProducts(this.language, index, size).subscribe(
      (data) => {
        this.allProduct = data.items;
        console.log(this.allProduct);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  addRelatedWork(): void {
    if (this.newRelatedWorkForm.valid) {
      const formData = this.newRelatedWorkForm.value;

      // Your existing code to submit the form data
      this.relatedworkService.create(formData).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.showSuccessAlert(); // Show SweetAlert on success
          this.router.navigate(['/dash/listrelatedwork']);
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
    // this.relatedworkService.create(this.newRelatedWorkForm).subscribe(
    //   (response) => {
    //     console.log('Category added successfully:', response);
    //     this.router.navigate(['/dash/listrelatedwork']);
    //   },
    //   (error) => {
    //     console.error('Error adding category:', error);
    //   }
    // );
  }
  onInput() {
    this.errortrue = false;
  }
  goBack(): void {
    this.router.navigate(['/dash/listrelatedwork']);
  }
  showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Related Work added successfully!',
      showConfirmButton: false,
      timer: 1500, // Adjust the timer as needed
    });
  }
}
