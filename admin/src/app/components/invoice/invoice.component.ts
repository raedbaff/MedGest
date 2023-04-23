import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers:[DatePipe]
})
export class InvoiceComponent implements OnInit {
  bills:any
  id=this.route.snapshot.params["id"]
  subtotal:any
  actualTotal:any
  vat:any
  tax:any
  discount:any
  patient:any

  constructor(private datePipe: DatePipe,private route:ActivatedRoute,private InvoiceService:InvoiceService) { }

  ngOnInit(): void {
    this.GetPatientBills()
    this.getpatient()
  }
  GetPatientBills(){
    return this.InvoiceService.getPatientInvoice(this.id).subscribe((data:any)=>{
      this.bills=data.map((bl:{date:Date,amount:number,tax:number,discount:number})=>{
        const formattedDate=this.datePipe.transform(bl.date, 'dd MMMM ');
        return {...bl,formattedDate}
      });
      this.subtotal = this.bills.reduce((acc:number, bl:{amount:number}) => acc + bl.amount, 0);
      this.tax=this.bills.reduce((acc:number,bl:{tax:number})=>acc+bl.tax,0)
      this.discount=this.bills.reduce((acc:number,bl:{discount:number})=>acc+bl.discount,0)
      this.vat=this.tax-this.discount
      this.actualTotal=this.subtotal+this.vat
      
      
    })
  }
  getpatient(){
    return this.InvoiceService.getpatient(this.id).subscribe((data:any)=>{
      this.patient=data
    })

  }

}
