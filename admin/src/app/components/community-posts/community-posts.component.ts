import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';
import { Chart, LinearScale } from 'chart.js/auto';
@Component({
  selector: 'app-community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.css']
})
export class CommunityPostsComponent implements OnInit {
  posts:any
  p:number=1
  form!:FormGroup
  reviews:any[]=[]
  chart!: Chart;

  constructor(private doctorService:DoctorService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.form=this.formbuilder.group({
      content:['',Validators.required]
    })
    this.getposts()
    
    
    
    
    
  }
  async predictcommentsentiment(comment: any) {
    try {
      const data = await this.doctorService.getcommentreviews(comment).toPromise();
      if (data) {
        const review = data.sentiment;
        this.reviews.push(review);
        console.log("the comment that is being reviewed :"+comment.content,review)
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  getposts() {
  return this.doctorService.getallposts().subscribe((data: any) => {
    this.posts = data;
    this.posts.forEach((element: any) => {
      element.comments.forEach(async (comment: any) => {
        this.form.patchValue({
          content: comment.content
        });
        await this.predictcommentsentiment(this.form.value);
      });
    });
    setTimeout(() => {
      console.log('Reviews length:', this.reviews.length);
    const positiveReviews = this.reviews.filter((review) => review === 'positive').length;
    const negativeReviews = this.reviews.filter((review) => review === 'negative').length;
    const neutralReviews = this.reviews.filter((review) => review === 'neutral').length;
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    console.log("inside the chart",this.reviews.length)
    console.log("the negative"+negativeReviews)
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative', 'Neutral',],
        datasets: [{
          label: 'Number of reviews',
          data: [positiveReviews, negativeReviews, neutralReviews],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            
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
     // waits for 1 second for the promises to resolve
  });
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
