import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CommentTicketComponent} from "../comment-ticket/comment-ticket.component";
import {Ticket} from "../../../models/Ticket";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {TicketService} from "../../../services/ticket.service";
import {ToastService} from "../../../services/toast.service";
import {CommentService} from "../../../services/comment.service";
import {CommentTicket} from "../../../models/CommentTicket";
import {Customer} from "../../../models/Customer";
import {LocalStorageService} from "../../../services/storage/local-storage.service";
import {statusTicket} from "../../../models/status-ticket";
import { priorityTicket} from "../../../models/priorityTicket";
import {StylesService} from "../../../services/stylesService";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {CustomerService} from "../../../services/customer.service";
import {isPlatformBrowser} from "@angular/common";


@Component({
  selector: 'app-consulte',
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultComponent implements OnInit{


  isAdd :boolean=false;
  ticket! : Ticket;
  houses :string[] = [];
  deviceType="Pas d\'information sur type de device";
  housesNames = {} ;
  protected readonly priorities = priorityTicket;
  protected readonly status = statusTicket;
  updateIsActive =false;
  comments :CommentTicket[]=[];
  customer! : Customer;
  users! :User[];
  supportsFunctional! :User[];
  supportsTechnic! :User[];
  finalSolution! : string;

  constructor(private fb : FormBuilder,
              private dialog:MatDialog,
              private route:ActivatedRoute,
              private router:Router,
              private ticketService:TicketService,
              private toastService:ToastService,
              private commentService :CommentService,
              private localService:LocalStorageService,
              private stylesService : StylesService,
              private userService:UserService,
              private customerService:CustomerService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.ticket=new Ticket();

  }
  ngOnInit(): void {
    this.getAllUsers();
    console.log('variable de teste  :',this.isAdd)
    this.route.queryParams.subscribe(params => {
      if (isPlatformBrowser(this.platformId)) {
        const currentState = history.state;
        this.isAdd = currentState && currentState.isAdd;
        this.ticket = currentState && currentState.data;
        this.updateIsActive = currentState && currentState.updateIsActive;
      }

      console.log("isAdd :", this.isAdd);
      console.log("received ticket is :", this.ticket);
    });

    console.log('hola 2:',this.form.controls.client.value)
    if(this.isAdd || this.updateIsActive){
      this.enableAllControls();
    }
    if(!this.isAdd){

      this.form.patchValue({
        id: this.ticket.id,
        subject: this.ticket.subject,
        // updateUserName: this.ticket.updateUserId,
        //associateUserName: this.ticket.associateUserId,
        createUserName: this.ticket.userName,
        status: this.ticket.status,
        priority: this.ticket.priority,
        description: this.ticket.description,
        client: '',
        house: '',
        typeDevice: '',
        finalSolution: this.ticket.finalSolution,
        creationDate: this.ticket.creationDate,
        //updateDate: this.ticket.updateDate,
        closingDate: this.ticket.closingDate
      });
      this.getCommentByTicket(this.ticket.id)
    }
  }
 getCommentByTicket(ticketId :number){

    this.commentService.getCommentByTicket(ticketId).subscribe(
      {
        next : res => {
          this.comments = res;
          console.log("url image :",this.comments)
          console.log("Comment :",res);
        },
        error : err => {
          this.toastService.showError(err);
        }
      }
    )
 }

  openPopupComment(dialog :MatDialog,idTicket:number,supportsF :User[],supportsT:User[]){
    var _popup=dialog.open(CommentTicketComponent,{
      width:"500px",
      enterAnimationDuration :'200ms',
      exitAnimationDuration : '300ms',
      data : {
        ticketId : idTicket,
        supportsFunctional :supportsF,
        supportsTechnic :supportsT,
      }
    });
    console.log('user fon a envoyer :',this.supportsFunctional)
    return _popup.afterClosed()
  }
  addComment(){
    this.openPopupComment(this.dialog,this.ticket.id,this.supportsFunctional,this.supportsTechnic).subscribe(item=>{
      console.log(" after close : ",item)
      if(item){
        this.commentService.save(item).subscribe({
          next :res =>{
            this.toastService.showSuccess("Votre commentaire est ajouter avec succes ");
            this.getCommentByTicket(this.ticket.id);
            },
          error :err => {
            this.toastService.showError(err);
          }
        })
      }
    });

  }
  getCustomer(){
    const clientValue = this.form.controls.client.value;
    this.form.controls.typeDevice.patchValue('Type Inconnu');
    if (typeof clientValue === 'string') {
      this.customerService.getHouseByCustomer(clientValue).subscribe(
        {
          next: res => {
             this.housesNames=res.housesNames;
             this.customer=res;
             console.log("house names Liste : ",this.customer.id)
             this.houses = Object.values(res.housesNames);
             this.toastService.showSuccess("Client est selectionner !")
          },
          error: err => {
            console.log("errrrr : ",err)
            this.houses =[];
            this.toastService.showError("Aucun Client avec ses Information Entree")
          }
        }
      );
    }
    else {
      this.toastService.showError("La valeur du client n'est pas valide");
    }
  }
  getTypeDevice(house :string){
    const entries = Object.entries(this.housesNames);
    console.log("gettype house : ",this.form.controls.house.value)
    const foundEntry = entries.find(([key, value]) => value === house);
    this.deviceType=foundEntry ? foundEntry[0] : '';
    if(this.deviceType.startsWith('SP')){
      this.form.controls.typeDevice.patchValue("Mono Phasee")
    }
    if(this.deviceType.startsWith('TP')){
      this.form.controls.typeDevice.patchValue("Tree Phasee")
    }
    console.log("type of house : ",this.form.controls.typeDevice.value);
  }
  activeUpdate(){
    this.updateIsActive=true;
    this.enableAllControls();
  }
  enableAllControls(): void {
    this.iterateControls(control => control.enable());
  }

  disableAllControls(): void {
    this.iterateControls(control => control.disable());
    this.updateIsActive=false;
  }
  private iterateControls(action: (control: AbstractControl) => void): void {
    Object.values(this.form.controls).forEach(control => {
      action(control);
    });
  }

  addTicket(){
    this.ticket=new Ticket();
    if(this.form.controls.client.valid && this.form.controls.description.valid){
      this.ticket.priority= this.form.controls.priority.value || '';
      this.ticket.subject=this.form.controls.subject.value || '';
      this.ticket.associateUserId=1 || '';
      this.ticket.customerId=this.customer.id ;
      this.ticket.createUserId= parseInt(this.localService.getId() || '');
      this.ticket.description=this.form.controls.description.value ||'';
      console.log(this.ticket)
      this.ticketService.save(this.ticket).subscribe({
        next : ticket=> {
          this.ticket=ticket;
          this.ticket.status=ticket.status;
          console.log("response  : ",ticket);
          this.isAdd=!this.isAdd;
          this.disableAllControls();

        },
        error:err =>{
          this.toastService.showError("Erreur dans la création du Ticket ");
        }
      })
    }
  }
  getAllUsers(){

    this.userService.fetchAllUser()
      .subscribe({
          next :data => {
            this.users = data;
            if (this.users && this.users.length > 0) {
              this.supportsFunctional = this.users.filter(user => user.roles && user.roles.includes("F"));
              this.supportsTechnic = this.users.filter(user => user.roles && user.roles.includes("T"));
            } else {
              this.toastService.showInfo("Aucun utilisateur n'a été récupéré.");
            }
          },
          error : err => {
            this.toastService.showError(err.message);
          }
        }
      )
  }
  resolution(){
    this.form.controls.finalSolution.patchValue(this.finalSolution);
    this.ticket.finalSolution=this.finalSolution;
    console.log("new ticket :",)
    //this.ticketService.resolution()

  }


  form =this.fb.group({
    id : [ 0 ,
      [ Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8)
      ]],
    subject : [{value :'',disabled : !this.updateIsActive} ,
      [ Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8)
      ]],
    updateUserName : [{value :'',disabled : !this.updateIsActive} ,
      [ Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4)
      ]],
    associateUserName : [ {value :'',disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(20),
        Validators.minLength(0)
      ]],
    createUserName : [ {value :'',disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(20),
        Validators.minLength(4)
      ]],
    status : [{value :'',disabled : !this.updateIsActive} ,
      [ Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4)
      ]],
    priority : [ {value :'',disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(20),
        Validators.minLength(2)
      ]],

    description : [ {value :'',disabled : !this.updateIsActive} ,
      [ Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(4)
      ]],
    client : [ {value :'',disabled : !this.updateIsActive} ,
      [ Validators.required,
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
    house : [ {value :'',disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(14),
        Validators.minLength(2)
      ]],
    typeDevice : [ {value :'',disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(14),
        Validators.minLength(2)
      ]],
    finalSolution : [ {value :'',disabled : !this.updateIsActive} ,
      [ Validators.required,
        Validators.maxLength(14),
        Validators.minLength(8)
      ]],
    creationDate : [{value : new Date(),disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
    updateDate : [{value :new Date(),disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
    closingDate : [{value :new Date(),disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
    startDate : [{value :new Date(),disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
    endDate : [{value :'',disabled : !this.updateIsActive} ,
      [
        Validators.maxLength(30),
        Validators.minLength(4)
      ]],
  });

  getColors(status:string):string {
   return this.stylesService.statusColors(status);
  }
  priorityColors(priority:string):string {
    return this.stylesService.statusColors(priority);
  }

}
