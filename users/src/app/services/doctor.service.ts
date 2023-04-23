import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  
  
  
  getAllDomains(){
    return this.http.get(`http://127.0.0.1:8088/domain/all`)
  }
  getdoctorinfo(id:number){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Admin/${id}`)
  }
  getNotifs(patientToken:String):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/Notifications/`,{headers:{
      'Authorization':`Bearer ${patientToken}`
    }})
  }
  getconfirmedRendezvous(token:any):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/RendezVous/doctorRendezvous`,{headers:{
      'Authorization':`Bearer ${token}`
    }})
  }
  finishappointement(id: number) {
    const body = { done: true }; 
  
    return this.http.put(`http://127.0.0.1:8088/RendezVous/${id}`, body);
  }
  predict(file:File){
    const form=new FormData()
    form.append('file', file, file.name);
    return this.http.post('http://127.0.0.1:8000/predict', form)
  }
  predictcancer(file:File){
    const form=new FormData()
    form.append('file',file,file.name)
    return this.http.post(`http://127.0.0.1:8000/predictCancer`,form)

  }
  registerSecretary(file:File,Secretary:any):Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('username', Secretary.username);
    formData.append('email', Secretary.email);
    formData.append('password', Secretary.password);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(`http://127.0.0.1:8088/api/auth/Doctor/secretary/signup`,formData, { headers: headers })
  }
  EditProfile(Doctor:any,token:String):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData=new FormData();
    formData.append('username', Doctor.username);
    formData.append('email', Doctor.email);
    formData.append('age', Doctor.age);
    formData.append('description', Doctor.description);
    formData.append('adresse', Doctor.adresse);
    return this.http.put(`http://127.0.0.1:8088/api/auth/Doctor/`,formData,{headers:headers})
  }
  getallSecretaries(){
    return this.http.get(`http://127.0.0.1:8088/api/auth/Doctor/allSec`)
  }
  updateCabinet(id:number,token:String,file:File,Cabinet:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('nomCabinet', Cabinet.nomCabinet);
    formData.append('adresseCabinet', Cabinet.adresseCabinet);
    formData.append('secretary', Cabinet.secretary);
    formData.append('description', Cabinet.description);
    return this.http.put(`http://127.0.0.1:8088/Cabinet/update/${id}`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    });

  }
  CreateMedicalOffice(token:String,file:File,Cabinet:any){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('nomCabinet', Cabinet.nomCabinet);
    formData.append('adresseCabinet', Cabinet.adresseCabinet);
    formData.append('secretary', Cabinet.secretary);
    formData.append('description', Cabinet.description);
    
    return this.http.post(`http://127.0.0.1:8088/Cabinet/save`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    });
    
    
    
    
    
  }
  getcabinet(patientToken:String):Observable<any>{
    return this.http.get(`http://127.0.0.1:8088/api/auth/Doctor/myCabinet`,{headers:{
      'Authorization':`Bearer ${patientToken}`
    }})
  }
  createMedicalFile(Token:String,MedicalFile: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Token}`
    });
    
  
    const formData = new FormData();
    formData.append('patient', MedicalFile.patient);
    formData.append('medicalHistory', MedicalFile.medicalHistory);
    formData.append('allergies', MedicalFile.allergies);
    formData.append('diagnoses', MedicalFile.diagnoses);
    formData.append('diagnosesResults', MedicalFile.diagnosesResults);
    formData.append('progressNotes', MedicalFile.progressNotes);
    formData.append('nextSteps', MedicalFile.nextSteps);
  
    return this.http.post(`http://127.0.0.1:8088/MedicalFile/save`, formData,{headers:headers})
  }
  getMedicalFile(id:number){
    return this.http.get(`http://127.0.0.1:8088/MedicalFile/myfiles/${id}`)
  }
}
