import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userconnect=JSON.parse(localStorage.getItem("userconnected")!)

  constructor(private router:Router,private http: HttpClient) { }

  ngOnInit(): void {
  }
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    this.http.post('http://127.0.0.1:8088/api/auth/signout', {},{headers}).subscribe(
      response => {
        console.log('Logout successful!');
        localStorage.setItem("state","1");
        localStorage.clear()
        
        this.router.navigateByUrl("/")
        Swal.fire({
          icon: 'success',
          title: 'Disconnected',
          text: 'You have been successfully Logged Out'
        });


        // do any additional logic here
      },
      error => {
        console.error('Logout failed!');
        // handle the error here
      }
    );

}
}
