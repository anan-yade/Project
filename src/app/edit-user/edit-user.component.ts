import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
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
      userid:'',
      fname:['',[Validators.required,Validators.maxLength(12),Validators.pattern('^([A-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      lname:['',[Validators.required,Validators.maxLength(12),Validators.pattern('^([A-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      location:['',[Validators.required,Validators.maxLength(15),Validators.pattern('^([A-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      phoneno:['',[Validators.required,Validators.maxLength(15),Validators.pattern('^[0-9]*$'),Validators.minLength(10)]],
      age:['',[Validators.required,Validators.maxLength(3),Validators.pattern('^[0-9]*$'),Validators.minLength(1)]],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

    })

    this.modifiedUserData.patchValue({
      userid:this.currentData.userid,
      fname:this.currentData.fname,
      lname:this.currentData.lname,
      email:this.currentData.email,
      phoneno:this.currentData.phoneno,
      age:this.currentData.age,
      location:this.currentData.location
    })
  }

  get username(){
    return this.modifiedUserData.get('fname');
  }

  get lastname(){
    return this.modifiedUserData.get('lname');
  }



  get phoneno(){
    return this.modifiedUserData.get('phoneno');
  }

  get location(){
    return this.modifiedUserData.get('location');
  }

  get age()
  {
    return this.modifiedUserData.get('age')
  }

  get email()
  {
    return this.modifiedUserData.get ('email')
  }

  onSubmit(){
    let updatedUserObj = this.modifiedUserData.value
    console.log("updated data", updatedUserObj)
    this.us.updateUserById(updatedUserObj).subscribe({
     next:(res)=>{
       console.log("updated user response",res)
       this.router.navigateByUrl('/userList')
     },error:(err)=>console.log(err)
    })
  }

}
