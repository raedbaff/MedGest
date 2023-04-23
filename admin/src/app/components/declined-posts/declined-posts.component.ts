import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-declined-posts',
  templateUrl: './declined-posts.component.html',
  styleUrls: ['./declined-posts.component.css']
})
export class DeclinedPostsComponent implements OnInit {
  declinedPosts:any
  p:number=1;

  constructor(private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getDeclinedPosts()
  }
  getDeclinedPosts(){
    return this.doctorService.getallposts().subscribe((data:any)=>{
      this.declinedPosts=data.filter((post:any)=>post.accepted==false)
    })
  }

}
