import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {openEditCourseDialog} from "./edit-add-user/edit-add-user.component";
import {MatDialog} from "@angular/material/dialog";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mangement-user',
  templateUrl: './mangement-user.component.html',
  styleUrl: './mangement-user.component.scss'
})
export class MangementUserComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) AllPaginator!: MatPaginator;
  @ViewChild(MatPaginator) pendingPaginator!: MatPaginator;
  @ViewChild(MatPaginator) acceptedPaginator!: MatPaginator;
  @ViewChild(MatPaginator) refusedPaginator!: MatPaginator;
  dataSource! : MatTableDataSource<User>;
  loading =false ;
  constructor(private fb :FormBuilder,
              private userService :UserService,
              private dialog:MatDialog,
              private toast:NgToastService,
              private route :Router) {

  }
  ngOnInit(): void {
    this.getAllUsers();
  }
 users :User[] = [];
 displayColumns =['id','firstName','lastName','email','telephone','ville','address','action'];

  getAllUsers(){
    this.loading=true;
    this.userService.fetchAllUser()
      .subscribe({
      next :data => {
        console.log("_____data ",data)
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.AllPaginator;
        console.log("dataSource :",this.dataSource);
        //this.loading=false;
      },
      error : err => {
        console.log("____error ",err);
      },
      complete : () => {
        this.loading=false;
        console.log("terminer")
      }
    }
    )
  }

  ngAfterViewInit() {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(user :User) {
   this.showSuccess()
  }

  update(user:User) {
    console.log("on est dans component generale :",user)
    openEditCourseDialog(this.dialog,user,"edit")
  }
  add(){
    this.route.navigate(['/management/tickets/add']).then(r => console.log("n'existe pas "))
  }

  showSuccess() {
    console.log(" show succeess")
    this.toast.info({detail:"SUCCESS",summary:'Your Success Message',duration:5000,position :"botomCenter"});
  }

  showError() {
    this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true,position : "botomCenter"});
  }

  showInfo() {
    this.toast.info({detail:"INFO",summary:'Your Info Message',sticky:true,position : "botomCenter"});
  }

  showWarn() {
    this.toast.warning({detail:"WARN",summary:'Your Warn Message',duration:5000,position : "botomCenter"});
  }

}
