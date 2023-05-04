import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { DatePipe } from '@angular/common';
import { BillsService } from 'src/app/services/bills.service';
import { HttpClient } from '@angular/common/http';
import { Chart, LinearScale } from 'chart.js/auto';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [DatePipe]
})
export class LayoutComponent implements OnInit {
  chart!: Chart;
  datalist:any
  patientdata:any
  numberofpatients!:number
  numberofdocs!:number
  rendezvous:any
  numberofbills!:number
  numberofdomains!:number
  ratings:any
  averageofpositive!:number
  averageofnegative!:number
  numberofpositivereviews!:number
  numberofnegativereviews!:number
  

  constructor(private http:HttpClient,private billService:BillsService,private datePipe: DatePipe,private doctorservice:DoctorService,private patientService:PatientService) { }
  

  ngOnInit(): void {
    this.getnumberofdoctors()
    this.getnumberofpatients()
    this.GetAllRendezvous()
    this.getnumberofbills()
    this.getnumberofdomains()
    this.getratings()
    setTimeout(() => {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Doctors', 'Patients', 'Bills','Medical Fields',"Positive Reviews","Negative Reviews"],
        datasets: [{
          label: 'Platform Statistics',
          data: [this.numberofdocs, this.numberofpatients, this.numberofbills,this.numberofdomains,this.numberofpositivereviews,this.numberofnegativereviews],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      },
      plugins: [LinearScale],
    });
    }, 1000);
  }

  getnumberofdoctors(){
    this.doctorservice.getData().subscribe((data:any) => {
      this.datalist=data.slice(0,2)
      this.numberofdocs=data.length
      
      return this.numberofdocs;
      console.log("the list is ",this.datalist);
      console.log("you have"+this.datalist.length+"doctors")
      // Do something with the data returned from the server
    });
}
getnumberofbills(){
  this.billService.getallbills().subscribe((data:any)=>{
    this.numberofbills=data.length
  })
}
GetAllRendezvous(){
  this.doctorservice.getallRendezVous().subscribe((data: any) => {
    this.rendezvous = data.slice(0, 6).map((rdv: { appointmentDate: Date }) => {
      const formattedDate = this.datePipe.transform(rdv.appointmentDate, 'dd MMMM yyyy');
      return { ...rdv, formattedDate };
    });
  });
  
}
getnumberofpatients(){
  this.patientService.getData().subscribe((data:any)=>{
    return this.numberofpatients=data.length
  })
}
getnumberofdomains(){
  this.http.get(`http://127.0.0.1:8088/domain/all`).subscribe((data:any)=>{
    this.numberofdomains=data.length
  })
}
getratings(){
  this.patientService.getallratings().subscribe((data:any)=>{
    this.ratings=data
    let numPositiveReviews = 0;
    let numNegativeReviews = 0;
    let sumPositiveRatings = 0;
    let sumNegativeRatings = 0;
    this.ratings.forEach((element:any) => {
      if (element.happy){
        numPositiveReviews++
        sumPositiveRatings+=element.rating
      }
      else{
        numNegativeReviews++
        sumNegativeRatings+=element.rating
      }
      
    });
    this.numberofpositivereviews=numPositiveReviews
    this.numberofnegativereviews=numNegativeReviews
    this.averageofpositive = parseFloat((sumPositiveRatings / this.numberofpositivereviews).toFixed(1));
    this.averageofnegative = parseFloat((sumNegativeRatings / this.numberofnegativereviews).toFixed(1));

    
  
    
  })
}
}
