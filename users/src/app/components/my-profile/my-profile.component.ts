import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  id=localStorage.getItem("userid")
  patient:any
  bills:any

  constructor(private modalService: NgbModal,private authService:AuthService) { }

  ngOnInit(): void {
    this.getPatinetinfo()
    
  }
 
  
  getPatinetinfo(){
    return this.authService.getpatient(this.id).subscribe((data:any)=>{
      this.patient=data
      this.bills=data.myBills
      console.log("this is the first bill"+this.bills[0].id)

    })
  }

}
