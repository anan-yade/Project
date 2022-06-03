import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  modifiedUserData: FormGroup;
  currentData ;
  constructor(private fb:FormBuilder, private us:UserService, private router:Router) { }

  ngOnInit(): void {

    this.currentData = this.us.currentUserData
    console.log(this.currentData)
    this.modifiedUserData = this.fb.group({
      userid:this.currentData.userid,
      name:'',
      email:'',
      phoneno:'',
      age:''
    })
  }

  onSubmit(){
    let updatedUserObj = this.modifiedUserData.value

    this.us.updateUserById(updatedUserObj).subscribe({
     next:(res)=>{
       console.log("updated user response",res)
       this.router.navigateByUrl('/userList')
     },error:(err)=>console.log(err)
    })
  }

}
