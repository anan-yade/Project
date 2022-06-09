import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"userList", component:UserListComponent},
  {path:"editUser/:userID", component:EditUserComponent},
  
  {path:"home",component:HomeComponent},
  {path:"contact-us",component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
