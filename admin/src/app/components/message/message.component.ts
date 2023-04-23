import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  registrationForm!: FormGroup;
  receiverr=this.route.snapshot.params["receiver"]
  onedoctor:any
  sender=localStorage.getItem("userconnected")
  sender2=this.sender?.slice(1,this.sender.length-1)
  receiver=this.receiverr
  

  constructor(private route: ActivatedRoute,private doctorService:DoctorService,private messageService:MessagingService,private formBuilder: FormBuilder){}
    // private modalService: NgbModal,public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      sender: ['', Validators.required],
      receiver: ['', [Validators.required, Validators.email]],
      content: ['', Validators.required],
    }),
    this.getform()
  }
  
  onSubmit() {
    const message = this.registrationForm.value;
    this.messageService.sendmessage(message).subscribe(
      data => {
        Swal.fire({
          title: "Message sent successfully",
          timer: 1000, // Timer in milliseconds (3 seconds in this example)
          timerProgressBar: true, // Show the timer progress bar
          showConfirmButton: false // Hide the "OK" button
        });
        
        
      }
        
    );
  }
  getform(){
    this.registrationForm.patchValue({
      sender:this.sender2,
      receiver:this.receiverr
    })
  }
  // openMessageModal() {
  //   const modalRef = this.modalService.open(MessageComponent);
  //   modalRef.componentInstance.senderId = this.senderId; // Set the sender ID input of the message component
  //   modalRef.componentInstance.receiverId = this.receiverId // Set the receiver ID input of the message component
  // }
  

}
