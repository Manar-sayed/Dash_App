import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo, Product } from '../product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  language: string = 'ar';
  productId: number = 0;
  currentProduct: Product = new Product(0, '', '', '', '', '', '', []);
  errortrue: any = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public router: Router,
    public sanitizer: DomSanitizer,
    private translatedashService: TranslatedashService,
    public dialogRef: MatDialogRef<ProductUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });
    this.productId = this.data.id;
    console.log('productId', this.productId);
    this.productService
      .getById(this.productId, this.language)
      .subscribe((data) => {
        this.currentProduct = data;

        console.log(data);
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // image upload
  imagePreview: SafeUrl | null = null;
  onFileChange(event: any) {
    if (!this.currentProduct.photos) {
      this.currentProduct.photos = [];
    }

    const fileList: FileList = event.target.files;

    for (let i = 0; i < fileList.length; i++) {
      const file: File = fileList[i];

      // Create a Photo object
      const photo: Photo = {
        ID: 0,
        ProductID: this.currentProduct.id,
        ImageOrFile: file,
      };

      this.currentProduct.photos.push(photo);
    }

    // Display preview for the first file only
    const firstFile = event.target.files?.[0];
    if (firstFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(
          e.target.result
        );
      };
      reader.readAsDataURL(firstFile);
    }
  }
  // updateProduct(): void {
  //   if (this.currentProduct) {
  //     this.productService
  //       .updateProduct(this.productId, this.currentProduct)
  //       .subscribe(
  //         (data) => {
  //           console.log('Product updated successfully:', data);
  //           const formData = new FormData();
  //           formData.append('ProductID', this.productId.toString());
  //           console.log(this.productId.toString());
  //           for (let i = 0; i < this.currentProduct.photos.length; i++) {
  //             formData.append(`ImageOrFile`, this.currentProduct.photos[i]);
  //           }

  //           this.productService.uploadImages(formData).subscribe(
  //             (imageResponse) => {
  //               console.log('Images uploaded successfully:', imageResponse);
  //             },
  //             (imageError) => {
  //               console.error('Error uploading images:', imageError);
  //             }
  //           );
  //           this.onNoClick();
  //           this.router
  //             .navigateByUrl('/dash/listproduct')
  //             .then((page) => window.location.reload());
  //         },
  //         (error) => {
  //           console.error('Error updating product:', error);
  //         }
  //       );
  //     // Clear the image preview after saving
  //     this.imagePreview = null;
  //   }
  // }

  updateProduct(): void {
    if (this.currentProduct) {
      this.productService
        .updateProduct(this.productId, this.currentProduct)
        .subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.onNoClick();
            this.showSuccessAlert('Product updated successfully'); // Show SweetAlert on success

            this.router
              .navigateByUrl('/dash/listproduct')
              .then((page) => window.location.reload());
          },
          (error) => {
            console.error('Error updating product:', error);
            this.errortrue = true;
            console.log(this.errortrue);
          }
        );
    }
  }

  uploadTheImage(): void {
    for (let i = 0; i < this.currentProduct.photos.length; i++) {
      const photo: Photo = this.currentProduct.photos[i];
      if (photo.ImageOrFile) {
        // Upload images
        this.productService.uploadImages(photo).subscribe(
          (imageResponse) => {
            console.log('Images uploaded successfully:', imageResponse);
            this.showSuccessAlert('Images uploaded successfully!'); // Show SweetAlert on success
          },
          (imageError) => {
            console.error('Error uploading images:', imageError);
          }
        );
      }
    }

    // Clear the image preview after saving
    this.imagePreview = null;
  }

  onInput() {
    this.errortrue = false;
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
