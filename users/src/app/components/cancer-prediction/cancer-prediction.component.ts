import { Component, OnInit ,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
declare var $: any;

@Component({
  selector: 'app-cancer-prediction',
  templateUrl: './cancer-prediction.component.html',
  styleUrls: ['./cancer-prediction.component.css']
})

export class CancerPredictionComponent implements OnInit {
  
  file!:File
  result:any
  form!:FormGroup
  selectedImageURL!:string

  constructor(private formbuilder:FormBuilder,private doctorService:DoctorService,private elRef: ElementRef) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({

    })
    $('#myModal').modal('show');
    const modal = this.elRef.nativeElement.querySelector('#myModal');
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
      // Hide the modal
      $(modal).modal('hide');
    });
  }
  
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const reader = new FileReader();
  reader.readAsDataURL(this.file);
  reader.onload = () => {
    this.selectedImageURL = reader.result as string;
  };
    }
  }
  onsubmit(event: Event) {
    event.preventDefault();
    return this.doctorService.predictcancer(this.file).subscribe((data: any) => {
        this.result = data.result
        
    });
}

}
