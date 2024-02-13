

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { TranslationService } from 'src/app/translation/translation.service';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Direction } from '@angular/cdk/bidi';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  language: string = 'ar';
  textDir: any;
  isLoading: boolean = false;
  constructor(
    private productService: ProductService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private translatedashService: TranslatedashService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   if (event.lang == 'ar') {
    //     this.textDir = 'rtl';
    //     console.log(this.textDir);
    //   } else {
    //     this.textDir = 'ltr';
    //     console.log(this.textDir);
    //   }
    // });
  }
  public editPro: any;
  products: Product[] = [];

  ngOnInit() {
    // console.log(this.textDir);
    this.isLoading = true;


    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;
      if (this.language === 'en') {
        this.textDir = 'ltr';
        // console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        // console.log(this.textDir);
      }
      this.loadProducts(); // You can call your loadProducts function here
    });
  }

  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.productService.getAllProducts(this.language, index, size).subscribe(
      (data) => {
        this.products = data.items;
        console.log(this.products);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }
  public E2: any;

  theEdit(pro: Product) {
    if (pro) {
      this.editPro = pro;
      this.router.navigateByUrl('dash/updateproduct/' + pro.id);
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productid: Number
  ): void {
    this.dialog.open(ProductDeleteComponent, {
      disableClose: true,
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: productid },
    });
  }
  openUpdateDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productid: Number
  ): void {
    this.dialog.open(ProductUpdateComponent, {
      disableClose: true,
      width: '750px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: productid },
    });
  }
}
