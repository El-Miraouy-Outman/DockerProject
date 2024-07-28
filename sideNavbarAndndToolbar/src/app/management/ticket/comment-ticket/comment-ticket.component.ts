import {Component, Inject, OnInit} from '@angular/core';
import {CommentTicket} from "../../../models/CommentTicket";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {LocalStorageService} from "../../../services/storage/local-storage.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-comment-ticket',
  templateUrl: './comment-ticket.component.html',
  styleUrl: './comment-ticket.component.scss'
})
export class CommentTicketComponent implements OnInit{
  comment! :CommentTicket;
  supportsFunctional! :User[];
  supportsTechnic! :User[];
  ngOnInit(): void {
    this.form.patchValue({
      userId : parseInt(this.localStorageService.getId() || ''),
      ticketId : this.data.ticketId
    });


  }
  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
              private dialogRef:MatDialogRef<CommentTicketComponent>,
              private fb:FormBuilder,
              private localStorageService:LocalStorageService,
              ) {
    this.supportsTechnic=this.data.supportsTechnic;
    this.supportsFunctional=this.data.supportsFunctional;
    console.log("user functionnal :",this.supportsFunctional)
  }
  close(){
    this.dialogRef.close();
  }

  addComment(){
    if(this.form.valid){
      this.comment=new CommentTicket();
      this.comment.text =this.form.controls.text.value || '';
      this.comment.userNotifiedId =this.form.controls.userNotifiedId.value || [];
      this.comment.userId=this.form.controls.userId.value || 0;
      this.comment.ticketId=this.form.controls.ticketId.value || 0;
      this.dialogRef.close(this.comment)
    }
    else{
      this.dialogRef.close();
    }

  }
  form =this.fb.group({

    userNotifiedId : [[] ,
      [
        Validators.maxLength(8),
        Validators.minLength(1)
      ]],
    text : ['',
      [ Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(4)
      ]],
    userId : [ 0,
      [
        Validators.maxLength(4),
        Validators.minLength(1)
      ]],
    ticketId : [ 0,
      [
        Validators.maxLength(4),
        Validators.minLength(1)
      ]],
  });
  protected readonly alert = alert;
}

