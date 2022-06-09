import { Component, Directive, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

// import {MatPaginator} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserData } from 'usersData';





@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})


export class UserListComponent implements OnInit {
  USER_DATA : UserData[];
   displayedColumns: string[] = ['id', 'fname','lname', 'email', 'phoneno', 'age', 'location', 'action'];
   dataSource:MatTableDataSource<UserData>;

  //  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private us:UserService,private router:Router) {
    // Assign the data to the data source for the table to render
    this.dataSource= new MatTableDataSource<UserData>(this.USER_DATA);
   }

   ngOnInit(): void {
    
    this.us.getUserInfo().subscribe({
      next:(data)=>{
        this.dataSource.data = data.payload as UserData[];
        console.log(data.payload)
        console.log(this.dataSource)
      },
      error:(error)=>{
        console.log(error)
      }
      
    })
  }
   ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(userObj){
    this.us.currentUserData = userObj
    this.router.navigateByUrl(`editUser/${userObj.userid}`)
  }

}


