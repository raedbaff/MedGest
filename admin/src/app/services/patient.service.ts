import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8088/api/auth/Patient/allPatients`);
}
RegisterPatient(file:File,Patient:any):Observable<any>{
  const formdata=new FormData();
  formdata.append('file',file,file.name)
  formdata.append('username',Patient.username)
  formdata.append('password',Patient.password)
  formdata.append('email',Patient.email)
  formdata.append('age',Patient.age)
  formdata.append('gender',Patient.gender)
  formdata.append('socialAccount',Patient.socialAccount)
  formdata.append('adresse',Patient.adresse)
  const header=new HttpHeaders()
  header.append('Content-Type', 'multipart/form-data');
  header.append('Accept', 'application/json');
  return this.http.post(`http://127.0.0.1:8088/api/auth/Patient/signup`,formdata,{headers:header})





}
getpatientrendezvous(id:any):Observable<any>{
return this.http.get(`http://127.0.0.1:8088/api/auth/Doctor/${id}`)

}
getallratings():Observable<any>{
  return this.http.get(`http://127.0.0.1:8088/api/auth/Patient/rate/all`)
}
getDocratings(id:any):Observable<any>{
  return this.http.get(`http://127.0.0.1:8088/api/auth/Patient/rate/${id}`)
}
GetAllComplaints():Observable<any>{
  return this.http.get(`http://127.0.0.1:8088/api/auth/Admin/complaints`)
}
}
