import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TranslatedashService } from 'src/app/translation/translatedash.service';
import { TranslationService } from 'src/app/translation/translation.service';

@Component({
  selector: 'app-main-dash-board',
  templateUrl: './main-dash-board.component.html',
  styleUrls: ['./main-dash-board.component.css'],
})
export class MainDashBoardComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private translatedashService: TranslatedashService,
    private authService: AuthService,
    private router: Router
  ) {}
  title = 'mainDashBoard';
  language: string = 'ar';
  textDir: any;
  isOpen: boolean = false;
  widthMenu: any;
  mainContainerBgColor: string = '';

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update isOpen based on the current window width
    this.checkWindowSize();
    this.setMainContainerBgColor();
  }
  private setMainContainerBgColor() {
    this.mainContainerBgColor =
      this.isOpen && window.innerWidth < 766 ? 'bg-success' : '';
  }

  private checkWindowSize() {
    this.isOpen = window.innerWidth > 766;
    if (this.isOpen === true) {
      this.widthMenu = 'col-6';
    }
  }
  selectedLanguage: string = 'ar';

  responsiveMenu: any;
  responsiveContent: any;
  defaultStatus = false;
  ngOnInit(): void {
    this.checkWindowSize();

    console.log('from on init', this.isOpen);

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
    let alldrpdwn = document.querySelectorAll('.dropdow-container');
    alldrpdwn.forEach((item: any) => {
      const a = item.parentElement?.querySelector('a:first-child');
      a.addEventListener('click', (e: any) => {
        e.preventDefault();
        this.el.nativeElement.classList.toggle('active');
        item.classList.toggle('show');
        e.defaultStatus = true;
      });
    });
  }

  switchLanguage(newLanguage: string) {
    console.log(`Switching to ${newLanguage}`);
    this.selectedLanguage = newLanguage;
    this.translatedashService.setLanguage(newLanguage);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to the login page after logout
  }

  // openNav(status: any) {
  //   if (status === this.defaultStatus) {
  //     this.responsiveMenu = {
  //       display: 'block',
  //     };
  //     this.responsiveContent = {
  //       'margin-left': '150px',
  //     };
  //     this.defaultStatus = true;
  //   } else {
  //     this.responsiveMenu = {
  //       display: null,
  //     };
  //     this.responsiveContent = {
  //       'margin-left': null,
  //     };
  //     this.defaultStatus = false;
  //   }
  // }

  // switchLanguage(newLanguage: string) {
  //   console.log(`Switching to ${newLanguage}`);

  //   this.selectedLanguage = newLanguage;
  // }
}
