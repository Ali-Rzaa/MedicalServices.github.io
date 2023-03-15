import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public screenWidth :any
  public screenHeight :any
  public showSearch = false;
  // public showToggle = false;
  ngOnInit(): void {
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
    // if(this.screenWidth<=680)
    // {
    //   this.showToggle = true
    // }
  }
 toggle(){
  this.showSearch = !this.showSearch;
 }
}
