import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecretaryService } from 'src/app/services/secretary.service';

@Component({
  selector: 'app-sec-header',
  templateUrl: './sec-header.component.html',
  styleUrls: ['./sec-header.component.css']
})
export class SecHeaderComponent implements OnInit {

  constructor(private secretaryService:SecretaryService,private auth:AuthService,private router:Router) { }
  id!:number
  sec:any
  username!:String
  photo!:String

  ngOnInit(): void {
    const userId = localStorage.getItem('userid');
if (userId !== null) {
  this.id = Number(userId);
  console.log("the id is "+this.id)
} else {
  // handle the case where userid is not found in local storage
}
this.getSecInfo()

  }

  getSecInfo(){
    return this.secretaryService.getSecretary(this.id).subscribe((data:any)=>{
      this.sec=data
      this.username=data.username
      this.photo=data.photo
    })
  }
  logout(){
    return this.secretaryService.logout()
  }
  

}
