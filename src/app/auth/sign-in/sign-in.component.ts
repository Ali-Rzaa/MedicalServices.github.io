import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/services/Account/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(
    private modalService: NgbModal, private formBuilder: FormBuilder,private router: Router,private accountService: AccountService
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  
  selectedCity = 'Select City...'
  showDropdown = false
  cities = [
    {name: 'Lahore'},
    {name: 'Karachi'},
    {name: 'Faisalabad'},
    {name: 'Toba Tek Singh'},
    {name: 'Kamalia'},
  ];
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  loginLoading: boolean = false;
color='white'
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  _loginValues() {
    console.log(localStorage.getItem('userCity'))
    return this.loginForm.value;
  }
  onSubmitLogin() {
    if (this.loginForm.valid && this.selectedCity !== 'Select City...') {
      this.errorMessage = '';
      this.loginLoading = true;
      this.accountService.login(this._loginValues()).subscribe({
        next: (v) => {
          if (v.role == 'Admin') {
                  this.router.navigateByUrl('/admin/dashboard');
                } else {
                  this.router.navigateByUrl('/');
                }
                this.loginLoading = false;
        },
        error: (e) => {
          this.loginLoading = false;
          this.errorMessage = 'Error: Invalid Email or Password.';
        },
        complete: () => {
          console.info('complete');
          this.loginLoading = false;
        },
      });
      // this.accountService.login(this.loginForm.value).subscribe(
      //   (dt) => {
      //     if (dt.Role == 'Admin') {
      //       this.router.navigateByUrl('/admin');
      //     } else {
      //       this.router.navigateByUrl('/');
      //     }
      //   },
      //   (error) => {
      //     this.loginLoading = false;
      //     this.errorMessage = 'Error: Invalid Email or Password.';
      //   }
      // );
    }
  }
  selectCtiy(val: string){
    this.selectedCity = val
  }
  mouseleave(){
    this.showDropdown = false
  }
  title = 'Hi! Hiram Khan';
  closeResult: string='';
  modalOptions:NgbModalOptions;
  
  
  open(content:any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
