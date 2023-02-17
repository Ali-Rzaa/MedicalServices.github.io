import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {
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
