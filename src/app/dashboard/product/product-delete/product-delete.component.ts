import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  productId: number = 0;
  language: string = 'ar';

  // constructor(
  //   private productService: ProductService,
  //   private activatedRoute: ActivatedRoute,
  //   public router: Router
  // ) {}

  constructor(
    public productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public router: Router, // public dialogRef: MatDialogRef<ProductDeleteComponent> // @Inject(MAT_DIALOG_DATA) public data: { id: Number }
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    private translatedashService: TranslatedashService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
    });
    this.productId = this.data.id;
    console.log(this.productId);
    // this.activatedRoute.params.subscribe((params) => {
    //   this.productId = +params['id'] || 0; // Use default value if 'id' is undefined
    //   console.log('productId:', this.productId);
    // });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // deleteProduct() {
  //   this.productService
  //     .deleteById(this.productId)
  //     .subscribe((d) => this.router.navigateByUrl('/dash/listproduct'));

  // }

  deleteProduct() {
    this.activatedRoute.params.subscribe((p) => {
      this.productService
        .deleteById(this.productId)
        .subscribe((d) =>
          this.router
            .navigateByUrl('/dash/listproduct')
            .then((page) => window.location.reload())
        );
    });

    this.dialogRef.close();
  }
}

// ngOnInit() {
//   this.activatedRoute.params.subscribe((params) => {
//     this.productId = +params['id'] || 0; // Use default value if 'id' is undefined
//     console.log('productId:', this.productId);
//   });
// }
// deleteProduct(): void {
//   this.productService.deleteById(this.productId).subscribe(() => {
//     this.router.navigate(['dash/productlist']);
//   });
// }
