import { Component, OnInit } from '@angular/core';
import { AppointmentModel, UserModel } from 'src/app/models/admin-models';
import { AccountService } from 'src/app/services/Account/account.service';
import { UserService } from 'src/app/services/user/user.service';
import {NgbModal, NgbModalConfig,} from '@ng-bootstrap/ng-bootstrap';
import {Store} from '@ngrx/store'
import { userStateModel } from 'src/app/NGRX/reducers/user-reducer';
import { updateUserProfileAction } from 'src/app/NGRX/actions/user-action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  imageURL:any[] = [];
  firstname = '';
  isLogged: any;
  lastname = '';
  userimage = '';
  user :UserModel;
  userAppointment:AppointmentModel[] = [];
  profileFormData:FormData = new FormData();
  constructor(private router : Router, private accountService: AccountService, config: NgbModalConfig, private modalService: NgbModal, private userService: UserService, private store: Store<{userReducer:userStateModel}>){
		config.backdrop = 'static';
		config.keyboard = false;}
  ngOnInit(): void {
    if(!this.accountService.isLoggedIn)
    {
      this.router.navigateByUrl('/');
    };
    this.loadUser();
    this.loadAppointments()
  }

	open(content:any) {
		this.modalService.open(content);
	}
  onChangeFirstName(event:any){
    this.firstname = event.target.value;
  }
  onChangeLastName(event:any){
    this.lastname = event.target.value;
  }
  onUpdateImage(event: any) {
    this.profileFormData = new FormData();
    this.imageURL = [];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileFormData.append('UploadImage', file, file.name);
      this.userimage = file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageURL.push(reader.result);
      };
    }
  }
  clear(){
    this.firstname = '';
    this.lastname = '';
    this.profileFormData.delete('UploadImage');
    this.imageURL = [];
  }
  saveChanges(){
      this.firstname !== ''? this.profileFormData.append('FirstName', this.firstname) : '';
      this.lastname !== ''? this.profileFormData.append('LastName', this.lastname) : '';
      this.userService.UpdateUserProfile(this.profileFormData).subscribe({
        next: (v)=>{
          this.loadUser();
          this.store.dispatch(updateUserProfileAction({userProfile:this.user}))
        },
        error: (e)=> {
  
        }
      })
  }
  filterUser(appointment: any[]): any[] {
    return appointment.filter(p => p.appointmentStatus !== 'Pending')
  }
  filterUser2(appointment: any[]): any[] {
    return appointment.filter(p => p.appointmentStatus === 'Pending')
  }
  loadUser(){
    this.userService.GetUserProfile().subscribe({
      next: (v) => {
        this.user = v.data;
        this.store.dispatch(updateUserProfileAction({userProfile:v.data}))
      },
      error: (e) => {

      }
    })
  }
  loadAppointments(){
    this.userService.GetUserAppointment().subscribe({
      next: (v) => {
        this.userAppointment = v.data;
      },
      error: (e) => {

      }
    })
  }
  cancelAppointment(id:any){
    this.userService.CancelUserAppointment(id).subscribe({
      next: (v)=>{
        this.loadAppointments()
      },
      error: (e)=>{

      }
    })
  }
  logout(){
    console.log("logout")
    this.accountService.doLogout();
  }
}
