import { Component, OnInit } from '@angular/core';
import { BillsService } from 'src/app/services/bills.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  providers: [DatePipe]
})
export class BillsComponent implements OnInit {
  bills:any

  constructor(private datePipe: DatePipe,private billsService:BillsService) { }

  ngOnInit(): void {
    this.GetAllBills()
  }
  GetAllBills(){
    this.billsService.getallbills().subscribe((data:any)=>{
      this.bills=data.map((bl:{date:Date})=>{
        const formattedDate=this.datePipe.transform(bl.date, 'dd MMMM ');
        return {...bl,formattedDate}
      })
    }
    )
  }

}
