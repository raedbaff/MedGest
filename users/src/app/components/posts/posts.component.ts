import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers:[DatePipe]
})
export class PostsComponent implements OnInit {
  posts:any
  commentsVisible = false;

  comments:any
  sender:any
  form!:FormGroup
  content:any
  postform!:FormGroup
  patientToken:any
  file!:File
  name:any
  connecteduserid:any
  likelist:any
  post:any
  
  

 

  constructor(private datePipe: DatePipe,private formbuilder:FormBuilder,private patientService:PatientService) { }

  ngOnInit(): void {
    this.connecteduserid=localStorage.getItem("userid")
    console.log("the id of the connected user "+this.connecteduserid)
    this.name=localStorage.getItem("userconnected")
    this.name =this.name.replace(/"/g, '');

    this.patientToken=localStorage.getItem('token')
    this.postform=this.formbuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]]

    })
    this.form=this.formbuilder.group({
      content:['',[Validators.required]],
      
    })
    this.getallposts()
    
    
    
    

  }
  toggleComments(post:any) {
    post.commentsVisible = !post.commentsVisible;
    
    
  }
  getallposts(){
    return this.patientService.getposts().subscribe((data:any)=>{
      this.posts=data.filter((post:any)=>post.accepted==true)
      this.posts.forEach((post:any)=>{
        post.timestamp=this.datePipe.transform(post.timestamp,"EEEE/MMMM HH:mm")
      })
      
      

    })

  }
  
  
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  createPost(){
    const post=this.postform.value
    this.patientService.createPost(this.file,post,this.patientToken).subscribe((data:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Post Created, Please wait for admin confirmation ',
        showConfirmButton: false,
        timer: 1500
      });
      this.getallposts()
    })
  }
  
  deletepost(id:number){
    this.patientService.deletepost(id).subscribe(()=>{
      this.getallposts()
    })
  }
  likeThePost(postid: number) {
    this.patientService.getlikes(postid).subscribe((data:any)=> {
    const likelist = data;
    if (likelist.some((like: any) => like.patient.id == this.connecteduserid)) {
      const likeIndex = likelist.findIndex((like: any) => like.patient.id == this.connecteduserid);
      const likeId = likelist[likeIndex].id;
      this.patientService.deleteLike(likeId).subscribe(() => {
        this.patientService.getPost(postid).subscribe((newpost:any)=>{
          const index=this.posts.findIndex((post:any)=>post.id===postid)
        this.posts[index]=newpost
        })
      });
    } else {
      
      this.patientService.likePost(postid, this.patientToken).subscribe(() => {
        this.patientService.getPost(postid).subscribe((newpost:any)=>{
          const index=this.posts.findIndex((post:any)=>post.id===postid)
        this.posts[index]=newpost
        })
        
      });
    }
  });
}

  

    
  
  
createcomment(postid: number) {
  const message = this.form.value
  const inappropriateWords = ['fuck', 'sex', 'damn', 'bitch', 'motherfucker', 'cunt', 'ass'];
  
  for (let word of inappropriateWords) {
    console.log("the message is and true or false : ",message.content,message.content.includes(word))
    if (message.content.includes(word)) {
      // Handle inappropriate word found in message
      Swal.fire({
        icon: 'warning',
        title: 'Inappropriate Language Detected',
        text: 'Please refrain from using inappropriate language in your comments. Continued use of such language may result in a ban.',
        confirmButtonText: 'Ok'
      }).then(()=>{
        this.form.reset()
      });
      return;
    }
  }
  
  // If no inappropriate words found, post the comment
  this.patientService.postcomment(postid, message, this.patientToken).subscribe((data: any) => {
    
    this.getcommentsofAPost(postid);
    this.getallposts();
    this.form.reset()
  });
}

  likePost(id:any){

  }
  getcommentsofAPost(postid:number){
    
    return this.patientService.getcommentsofaPost(postid).subscribe((data:any)=>{
      this.comments=data
      
      
    })
    
  }
  

}
