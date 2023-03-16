import { Component } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  selectedCity = 'Select City'
  showDropdown = false
  cities = [
    {name: 'Lahore'},
    {name: 'Karachi'},
    {name: 'Faisalabad'},
    {name: 'Toba Tek Singh'},
    {name: 'Kamalia'},
  ];
  selectCtiy(val: string){
    this.selectedCity = val
  }
  mouseleave(){
    this.showDropdown = false
  }
  title = 'Hi! Hiram Khan';
  closeResult: string='';
  modalOptions:NgbModalOptions;
  constructor(
    private modalService: NgbModal
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  
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
