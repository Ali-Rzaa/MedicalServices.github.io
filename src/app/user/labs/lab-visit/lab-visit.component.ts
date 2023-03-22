import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-lab-visit',
  templateUrl: './lab-visit.component.html',
  styleUrls: ['./lab-visit.component.scss']
})
export class LabVisitComponent implements OnInit {
  lab :LabModel
  constructor(private route:ActivatedRoute, private router: Router, private userService: UserService){}
  ngOnInit(){
    this.loadLab(this.route.snapshot.params['id']);
  }
  loadLab(id:any){
    this.userService.GetLab(id).subscribe({
      next:(v) => {
        this.lab = v.data
      },
      error:(error) => {
        console.log('Error in loadLab: ' + error.message);
      }
    });
  }
}
