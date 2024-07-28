import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder} from "@angular/forms";
import {Ticket} from "../../models/Ticket";
import {TicketService} from "../../services/ticket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {NavigationExtras, Router} from "@angular/router";
import {statusTicket} from "../../models/status-ticket";
import {StylesService} from "../../services/stylesService";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit,AfterViewInit   {
  @ViewChild(MatPaginator) allPaginator!: MatPaginator;
  @ViewChild(MatPaginator) processingPaginator!: MatPaginator;
  @ViewChild(MatPaginator) acceptedPaginator!: MatPaginator;
  @ViewChild(MatPaginator) refusedPaginator!: MatPaginator;
  @ViewChild(MatPaginator) declinedPaginator!: MatPaginator;

  dataSource! : MatTableDataSource<Ticket>;
  pendingDataSource! : MatTableDataSource<Ticket>;
  declinedDataSource! : MatTableDataSource<Ticket>;
  processingDataSource! : MatTableDataSource<Ticket>;
  acceptedDataSource! : MatTableDataSource<Ticket>;
  loading =false ;
  tickets :Ticket[] = [];
  statusTicket =statusTicket;
  @ViewChild(MatSort) sort!: MatSort;


  //,'updateUserName','updateDate','closureDate'
  displayColumns =['id','customerName', 'subject','status','priority','creationDate','action'];
  constructor(private fb :FormBuilder,
              private ticketService :TicketService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,
              private route:Router,
              private stylesService:StylesService) {

    this.dataSource = new MatTableDataSource<Ticket>([])
    this.processingDataSource = new MatTableDataSource<Ticket>([])
    this.declinedDataSource = new MatTableDataSource<Ticket>([])
    this.pendingDataSource = new MatTableDataSource<Ticket>([])
  }
  ngOnInit(): void {
    this.getAllTickets();

  }

     getAllTickets(){
       this.loading=true;
       this.ticketService.getAllTickets()
         .subscribe({
             next :data => {
               console.log("_____data ",data)
               this.tickets = data;
               this.tickets.sort((a, b) => {
                 const dateA = new Date(a.creationDate);
                 const dateB = new Date(b.creationDate);

                 // Compare les dates
                 if (dateA > dateB) {
                   return -1; // si la date de a est postérieure à celle de b, retourne 1
                 } else if (dateA < dateB) {
                   return 1; // si la date de a est antérieure à celle de b, retourne -1
                 } else {
                   return 0; // si les dates sont égales, retourne 0
                 }
               });
               this.dataSource = new MatTableDataSource(this.tickets);
               this.processingDataSource=new MatTableDataSource<Ticket>(this.tickets.filter(
                 (value) => {value.status==='WAITING' }))
               this.acceptedDataSource=new MatTableDataSource<Ticket>(this.tickets.filter(
                 (value) => {value.status==='ACCEPTED'}))
               this.declinedDataSource=new MatTableDataSource<Ticket>(this.tickets.filter(
                 (value) => {value.status==='REFUSED'}))
               this.dataSource.paginator = this.allPaginator;
               console.log("dataSource :",this.dataSource);
               this.loading=false;
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

     ngAfterViewInit(): void {


     }
  add(){
    const navigationExtras: NavigationExtras = {
      state: {
        isAdd :true
      }
    };
    this.route.navigate(['management/tickets/view'],navigationExtras)
  }

     deleteTicket( id :number){

       console.log("ticket :",id)
       console.log("ticket :",id)
       this.ticketService.delete(id)
         .subscribe({
             next :data => {
               console.log("--- data deleted :  ",data)
               this._snackBar.open("Ticket deleted successfully", "close", {
                 duration: 2000,
               });
              this.getAllTickets();

             },
             error : err => {
               this._snackBar.open("Error deleting Ticket" + err, "close", {
                 duration: 2000,
               });
             }
           }
         )
     }

  viewTicket(ticket:Ticket){
    console.log("objet a envoyer :",ticket)
    const navigationExtras: NavigationExtras = {
      state: {
        data: ticket,
        isAdd :false
      }
    };
    this.route.navigate(['/management/tickets/view'],navigationExtras);
  }


  updateTicket(ticket :Ticket) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: ticket,
        isAdd :false,
        updateIsActive :true
      }
    };
    this.route.navigate(['/management/tickets/view'],navigationExtras);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getColors(status:string):string {
   return this.stylesService.statusColors(status);
  }

}
