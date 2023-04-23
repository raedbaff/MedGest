import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.css']
})
export class CommunityPostsComponent implements OnInit {
  posts:any
  p:number=1

  constructor(private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getposts()
  }
  getposts(){
    return this.doctorService.getallposts().subscribe((data:any)=>{
      this.posts=data
      
    })
  }
  acceptPost(id:number){
    this.doctorService.acceptPost(id).subscribe((updatedpost:any)=>{
      Swal.fire({
        title:"Post Accepted",
        showConfirmButton: false,
        timer: 1000
      }).then(()=>{
        const index=this.posts.findIndex((post:any)=>post.id===id)
        this.posts[index]=updatedpost
      })
    })
  }
  

}
