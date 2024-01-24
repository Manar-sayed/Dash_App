import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../category';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  language: string = 'ar';
  textDir: any;
  isLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    activatedRoute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private translatedashService: TranslatedashService
  ) {}

  prescriptionList: any;

  public editPro: any;
  categories: Category[] = [];

  ngOnInit(): void {
    this.isLoading = true;

    this.translatedashService.getLanguage().subscribe((language) => {
      this.language = language;

      if (this.language === 'en') {
        this.textDir = 'ltr';
        console.log(this.textDir);
      } else {
        this.textDir = 'rtl';
        console.log(this.textDir);
      }
      this.loadProducts(); // You can call your loadProducts function here
    });
  }

  loadProducts() {
    const index = 0;
    const size = 20;
    // all products
    this.categoryService.getAllCategory(index, size).subscribe(
      (data) => {
        this.categories = data.items;
        console.log(this.categories);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }
  public E2: any;

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productid: Number
  ): void {
    this.dialog.open(DeleteCategoryComponent, {
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
    this.dialog.open(CategoryUpdateComponent, {
      disableClose: true,
      width: '750px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: productid },
    });
  }
}
