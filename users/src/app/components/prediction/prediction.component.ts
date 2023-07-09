import { Component, OnInit ,ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
declare var $: any;



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  result:any
  form!:FormGroup
  file!:File
  selectedImageURL!: string;

  constructor(private DoctorService:DoctorService,private formbuilder:FormBuilder,private elRef:ElementRef) { }

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
    return this.DoctorService.predict(this.file).subscribe((data: any) => {
        this.result = data.result
        
    });
}

  
  

}
