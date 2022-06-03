import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
   allUsers;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {

    this.us.getUserInfo().subscribe({
      next:(data)=>{
        this.allUsers=data.payload
        console.log(data.payload)
      },
      error:(error)=>{
        console.log(error)
      }
      
    })
  }

  editUser(userObj){
    this.us.currentUserData = userObj
    this.router.navigateByUrl(`editUser/${userObj.userid}`)
  }


}
