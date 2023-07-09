import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }
  getalldomains(){
    return this.http.get(`http://127.0.0.1:8088/domain/all`)
  }
  getdomain(id:any){
    return this.http.get(`http://127.0.0.1:8088/domain/${id}`)
  }
  getdoctor(id:any){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Admin/${id}`)
  }
  rateDoctor(doctorId: number, rating: number, patientNotes: string,patient:string): Observable<any> {
    const body = {
      rating: rating,
      patientNotes: patientNotes
    };
    return this.http.post(`http://127.0.0.1:8088/api/auth/Patient/rate/${doctorId}`, body,{headers:{
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${patient}`
    }});
  }
  CreateRendezvous(rendezvous: any, doctorId: number, patientToken: string): Observable<any> {
    const formData = new FormData();
    formData.append('appointmentDate', rendezvous.appointmentDate);
    formData.append('appointmentReason', rendezvous.appointmentReason);
    formData.append('doctor', doctorId.toString());
    formData.append('time',rendezvous.time)
    return this.http.post('http://127.0.0.1:8088/RendezVous/save', formData, {
      headers: {
        'Authorization': `Bearer ${patientToken}`
      }
    });
  }
  getdoctorAvailibility(id:number){
    
    return this.http.get(`http://127.0.0.1:8088/RendezVous/getAv?id=${id}`)
  }
  getpatientRenezvous(patientToken:String):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/RendezVous/userRendezVous`,{headers:{
      'Authorization':`Bearer ${patientToken}`
    }});
  }
  
  getalldoc(){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Admin/allDoctors`)
  }
  getallcabinets(){
    return this.http.get(`http://127.0.0.1:8088/Cabinet/all`)
  }
  editProfile(id:number,file: File, patient: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', patient.username);
    formData.append('email', patient.email);
    formData.append('adresse', patient.adresse);
    formData.append('age', patient.age);
    formData.append('SocialAccount', patient.socialAccount);
    formData.append('profession', patient.profession);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put(`http://127.0.0.1:8088/api/auth/Patient/${id}`, formData)
      
  }
  getmessages(id:number,id2:number){
    return this.http.get(`http://127.0.0.1:8088/Messages/messages/${id}/${id2}`)
  }
  getdoc(id:number){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Admin/${id}`)
  }
  sendmessage(sender:number,receiver:number,message:any):Observable<any>{
    const formData = new FormData();
    formData.append('content', message.content);
    return this.http.post(`http://127.0.0.1:8088/Messages/addmsg/${sender}/${receiver}`,formData)
  }
  getallpatients(){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Patient/allPatients`)
  }
  deleteRendezvous(id:number){
    return this.http.delete(`http://127.0.0.1:8088/RendezVous/delete/${id}`)

  }
  getposts(){
    return this.http.get(`http://127.0.0.1:8088/Post/all`)
  }
  getPost(id:number){
    return this.http.get(`http://127.0.0.1:8088/Post/${id}`)
  }
  deletepost(id:number):Observable<any>{
    return this.http.delete(`http://127.0.0.1:8088/Post/${id}`)
  }
  
  getcommentsofaPost(id:number){
    return this.http.get(`http://127.0.0.1:8088/Comment/${id}`)
  }
  postcomment(postid:number,comment:any,patientToken: string):Observable<any>{
    const formData = new FormData();
    formData.append('content', comment.content);
    return this.http.post(`http://127.0.0.1:8088/Comment/add/${postid}`,formData,{
      headers: {
        'Authorization': `Bearer ${patientToken}`
      }
    })
  }
  createPost(file:File,post:any,patientToken:string):Observable<any>{
    const formData=new FormData();
    formData.append('title',post.title);
    formData.append('description',post.description);
    formData.append('file', file, file.name);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${patientToken}`,
      Accept: 'application/json',
    });
    return this.http.post('http://127.0.0.1:8088/Post/savePost', formData, {
    headers,
  });
  }
  likePost(id:number,patientToken:String):Observable<any>{

    return this.http.post(`http://127.0.0.1:8088/like/${id}`,{
      headers: {
        'Authorization': `Bearer ${patientToken}`
      }
    })
  }
  getlikes(id:number):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/like/${id}`)
  }
  deleteLike(id:number){
    return this.http.delete(`http://127.0.0.1:8088/like/${id}`)
  }
  getpatientnotifications(patientToken:String):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/Notifications/`,{headers:{
      'Authorization':`Bearer ${patientToken}`
    }})
  }
  deletenotification(id: number) {
    return this.http.delete(`http://127.0.0.1:8088/Notifications/${id}`)
  }
  getMedicalFile(id:number){
    return this.http.get(`http://127.0.0.1:8088/MedicalFile/myfiles/${id}`)
  }
  FileComplaint(Complaint:any,patientToken:String){
    const formData=new FormData()
    formData.append("description",Complaint.description)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${patientToken}`,
      Accept: 'application/json',
    });
    return this.http.post(`http://127.0.0.1:8088/api/auth/Patient/complaint`,formData,{headers:headers})
  }
  
  
  
  
}
