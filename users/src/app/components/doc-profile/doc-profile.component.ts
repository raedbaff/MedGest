import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxStarRatingComponent } from 'ngx-star-rating';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';
import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css'],
  providers:[DatePipe]
})
export class DocProfileComponent implements OnInit,AfterViewInit  {
  


  @ViewChild('swiperWrapper') swiperWrapper!: ElementRef;
  p: number = 1;
    // collection: any[] = someArrayOfThings;
  
  rating!: number;
  showMore: boolean = false;
  patientNotes!: string;
  id=this.route.snapshot.params["id"]
  patientid:any
  docid:any
  zeDoc:any
  docratings:any
  ratingsnumber:any
  averagerating:any=0
  points:any=0
  user:any
  newrates:any
  userid:any
  messagemodal!:boolean
  messageform!:FormGroup
  newmsg:any
  newMessageSubject = new Subject<any>();
  pat:any

  constructor(private route:ActivatedRoute,private PatientService:PatientService,
    private formbuilder:FormBuilder,
    private datePipe:DatePipe,
    private AuthService:AuthService
    ) { }

  ngOnInit(): void {
    this.patientid=localStorage.getItem('userid')
    this.user=localStorage.getItem("token")
    this.userid=localStorage.getItem("userid")
    console.log("the user is this"+this.user)
    this.getdoc()
    this.getnewrates()
    this.messageform=this.formbuilder.group({
      content: ['', Validators.required]})
  }
  sendmessage(){
    const message=this.messageform.value
    this.PatientService.sendmessage(this.patientid,this.docid,message).subscribe((data:any)=>{
      this.getnewmessages()
      this.messageform.reset()
      
      console.log("message is sent"+data)
    })
    }
    getnewmessages(){
      return this.PatientService.getmessages(this.patientid,this.docid).subscribe((data:any)=>{
        this.newmsg=data
        this.newmsg.forEach((msg:any)=>{
          msg.timestamp=this.datePipe.transform(msg.timestamp,"shortTime")
        })
        this.newMessageSubject.next(data); 
        
        
      })
    }
    getPatient(){
      this.AuthService.getpatient(this.patientid).subscribe((data:any)=>{
        this.pat=data.username
        
        
      })
    }
  ngAfterViewInit() {
    
    const swiperElement = document.querySelector('.swiper-wrapper');
    if (swiperElement){
      const swiper = new Swiper(this.swiperWrapper.nativeElement, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }
  showAllRatings() {
    this.showMore = !this.showMore;
  }
  
  
  getnewrates(){
    this.PatientService.getdoctor(this.id).subscribe((data:any)=>
    this.newrates=data.ratings)
  }
  getdoc(){
    this.PatientService.getdoctor(this.id).subscribe((data:any)=>{
      let sum=0
      let average=0
      this.zeDoc=data
      this.docid=data.id
      this.ratingsnumber=data.ratings.length
      this.docratings=data.ratings
      console.log("the number is "+this.ratingsnumber)
      this.docratings.forEach((element:any) => {
        sum=element.rating+sum
        this.points=sum
  
        
      })
      average=sum/this.docratings.length;
    this.averagerating= average.toFixed(1)
    console.log("this is the average"+this.averagerating)
    })
  
    
    
  }
  onsubmit(){
    this.PatientService.rateDoctor(this.id,this.rating,this.patientNotes,this.user).subscribe((data:any)=>
    {
      this.getnewrates()
      console.log("the info you need"+this.user,this.rating,
      
      )
      Swal.fire({
        icon: 'success',
        title: 'Rating Submitted',
        showConfirmButton: false,
        timer: 1500
      });
  
  },
    error=>{
      console.log("could not rate")
    })
  }
  openMessageModal(id:number){
    this.messagemodal=true;
    this.getPatient()
    this.getnewmessages()
    this.newMessageSubject.pipe(debounceTime(1500)).subscribe((data:any) => {
      this.getnewmessages();
    });
  }
  closeMessageModal(){
    this.messagemodal=false;
    this.newMessageSubject.unsubscribe()
  }
  
  

  }



