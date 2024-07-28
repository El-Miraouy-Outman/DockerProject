import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Ticket} from "../../models/Ticket";
import {FormBuilder} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit,AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSourcee: any ;

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
  searchTerm: any;
  displayColumns =['id','customerName',
    'subject','updateUserName','status','priority','creationDate','updateDate','closureDate','action'];
  constructor(private fb :FormBuilder,
              private ticketService :TicketService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) {

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
            this.dataSource = new MatTableDataSource(this.tickets);
            this.processingDataSource=new MatTableDataSource<Ticket>(this.tickets.filter(
              (value) => {value.status==='WAITING' }))
            this.acceptedDataSource=new MatTableDataSource<Ticket>(this.tickets.filter(
              (value) => {value.status==='ACCEPTED'}))
            this.declinedDataSource=new MatTableDataSource<Ticket>(this.tickets.filter(
              (value) => {value.status==='REFUSED'}))
            this.dataSource.paginator = this.allPaginator;
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

  ngAfterViewInit(): void {


  }


  deleteTicket( id :number) {

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
  editTicket(ticket :Ticket ) {

  }





  // ngOnInit(): void {
  //  // this.initializeColumns(this.dataSource)
  // }
  initializeColumns (data: Array<[string, any]>){
    const keySet = new Set<string>();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        keySet.add(key);
      });
    });
    this.displayedColumns = Array.from(keySet)
  }
  protected readonly Array = Array;
}
