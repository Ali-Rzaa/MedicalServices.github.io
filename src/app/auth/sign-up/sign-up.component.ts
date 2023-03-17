import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/Account/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  errorMessage = "";
  SignupForm!: FormGroup;
  signupLoading: boolean = false;
  signupAsUser = 'true';
  submitted = false;
  constructor(private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder, private accountService: AccountService){}
  ngOnInit(): void {
   
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required ,Validators.minLength(8) ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),]],
      
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
    this.SignupForm.valueChanges.subscribe(field => {
      if (field.password !== field.confirmPassword) {
        this.SignupForm.setErrors({ mismatch: true });
      }
      else {
        this.SignupForm.setErrors(null);
      }
    });
  };
  onSubmit() {
        this.errorMessage = "";
        this.signupLoading = true;
        if(this.signupAsUser == 'true')
        {
          this.accountService.RegisterUser(this.SignupForm.value).subscribe({
            next: (v) => {
              this.router.navigateByUrl('/signIn');
              this.signupLoading = false;
            },
            error: (e) => {
              this.signupLoading = false;
              this.errorMessage = e.error.message;
            },
            complete: () => {
              console.info('complete');
              this.signupLoading = false;
            },
          });
        } else {
          this.accountService.RegisterAdmin(this.SignupForm.value).subscribe({
            next: (v) => {
              this.router.navigateByUrl('/signIn');
              this.signupLoading = false;
            },
            error: (e) => {
              this.signupLoading = false;
              this.errorMessage = e.error.message;
            },
            complete: () => {
              console.info('complete');
              this.signupLoading = false;
            },
          });
        }
    }
}
