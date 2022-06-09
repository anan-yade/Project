import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserData;
  constructor(private hc: HttpClient) { }

  getUserInfo(): Observable<any> {
    return this.hc.get('/user/get-users')
  }

  updateUserById(updatedUserObj):Observable<any>{
    return this.hc.put('/user/update-user', updatedUserObj)
  }
}
