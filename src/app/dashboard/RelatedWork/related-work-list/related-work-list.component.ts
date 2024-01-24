import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleterelatedWorkComponent } from '../deleterelated-work/deleterelated-work.component';
import { RelatedWork } from '../related-work';
import { RelatedWorkService } from '../related-work.service';
import { UpdaterelatedWorkComponent } from '../updaterelated-work/updaterelated-work.component';
import { TranslatedashService } from 'src/app/translation/translatedash.service';

@Component({
  selector: 'app-related-work-list',
  templateUrl: './related-work-list.component.html',
  styleUrls: ['./related-work-list.component.css'],
})
export class RelatedWorkListComponent implements OnInit {
  language: string = 'ar';
  textDir: any;
  isLoading: boolean = false;

  constructor(
    private relatedworkService: RelatedWorkService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private translatedashService: TranslatedashService
  ) {}

  relaytedWorks: RelatedWork[] = [];

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
      this.loadrelatedWorks();
    });
    console.log('lang from related -> ', this.language);
  }

  loadrelatedWorks() {
    const index = 0;
    const size = 20;
    this.relatedworkService.getAllRelatedWork(index, size).subscribe(
      (data) => {
        this.relaytedWorks = data.items;
        console.log(this.relaytedWorks);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productid: Number
  ): void {
    this.dialog.open(DeleterelatedWorkComponent, {
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
    this.dialog.open(UpdaterelatedWorkComponent, {
      disableClose: true,
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: productid },
    });
  }
}
