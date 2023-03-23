import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Cities } from 'src/app/models/user-model';
import { AccountService } from 'src/app/services/Account/account.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(
    private modalService: NgbModal, private formBuilder: FormBuilder,private router: Router,private accountService: AccountService, private userService: UserService
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  // cities:Cities[] = []
  // selectedCity = 'Select City...'
  // cityId: any
  // showDropdown = false
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
    return this.loginForm.value;
  }
  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loginLoading = true;
      this.accountService.login(this._loginValues()).subscribe({
        next: (v) => {
          // this.userService.GetCities().subscribe({
          //   next: (vl)=>{
          //     this.cities = vl.data
          //   },
          //   error:(er)=>{
          //     console.log('cities error: '+er)
          //   }
          // })
          // this.open(content);
          if (localStorage.getItem('user_type')== 'Admin') {
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            this.router.navigateByUrl('/selectCity');
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
    }
  }
  // selectCtiy(name: string, id:any){
  //   this.selectedCity = name
  //   this.cityId = id
  // }
  // saveCity(){
  //   if(this.selectedCity!== '')
  //   {
  //     localStorage.setItem('userCity', this.cityId)
  //     if (localStorage.getItem('user_type')== 'Admin') {
  //       this.router.navigateByUrl('/admin/dashboard');
  //     } else {
  //       this.router.navigateByUrl('/home');
  //     }
  //   }
  // }
  // mouseleave(){
  //   this.showDropdown = false
  // }
  title = 'Hi! Hiram Khan';
  closeResult: string='';
  modalOptions:NgbModalOptions;
  EnterSubmit(event:any){
    if(this.loginForm.valid)
    {
      this.onSubmitLogin()
    }
  }
  
  open(content:any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult)
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
