import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';
import { Message } from '../models/message';
import { env } from 'process';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(`${environment.baseurl}/api/auth/Admin/allDoctors`);
  }
  getDoctorById(id: any): Observable<any> {
    return this.http.get<Doctor>(`http://127.0.0.1:8088/api/auth/Admin/${id}`);
  }
  // confirmDoctor(id: number) {
  //   this.http.put(`http://127.0.0.1:8088/api/auth/Admin/confirm/${id}`, {}).subscribe();
  // }
  getDoctorMessagesById(id:any):Observable<any>{
    return this.http.get<Message>(`http://127.0.0.1:8088/Messages/${id}`)
    
  }
  getallDomains():Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8088/domain/all`)
  }
  getdomainbyid(id:number):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/domain/${id}`)
  }
  getallRendezVous():Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8088/RendezVous/all`)
    
  }
  registerDoctor(file: File, doctor: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', doctor.username);
    formData.append('email', doctor.email);
    formData.append('password', doctor.password);
    formData.append('domainMedical', doctor.domainMedical);
    formData.append('adresse', doctor.adresse);
    formData.append('photo', doctor.photo);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`${environment.baseurl}/api/auth/Doctor/signup`, formData, { headers: headers })
      
  }
  EditDoctor(id:number,file: File, doctor: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', doctor.username);
    formData.append('email', doctor.email);
    formData.append('password', doctor.password);
    formData.append('domainMedical', doctor.domainMedical);
    formData.append('adresse', doctor.adresse);
    formData.append('photo', doctor.photo);
    formData.append('age', doctor.age);
    formData.append('patients', doctor.patients);
    formData.append('points', doctor.points);


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put(`${environment.baseurl}/api/auth/Admin/editDoctor/${id}`, formData, { headers: headers })
      
  }
  getallposts():Observable<any>{
    return this.http.get(`${environment.baseurl}/Post/all`)
  }
  acceptPost(id:number):Observable<any>{
    
    return this.http.put(`${environment.baseurl}/api/auth/Admin/${id}`,{})
  }
  createMedicalField(file:File,MedicalField:any):Observable<any>{
    const formData=new FormData();
    formData.append("name",MedicalField.name)
    formData.append("file",file,file.name)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(`http://127.0.0.1:8088/domain/save`,formData,{headers:headers})
  }
  getAllMedicalFields():Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/domain/all`)
  }
  getcommentreviews(comment:any):Observable<any>{
    const formData=new FormData();
    formData.append("comment",comment.content)
    return this.http.post(`http://127.0.0.1:8000/sentiment`,formData)
  }
  
  
}
