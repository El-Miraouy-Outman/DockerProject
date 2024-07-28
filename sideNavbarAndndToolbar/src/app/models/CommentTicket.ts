import {User} from "./User";

export class CommentTicket {
  id!: number;
  text!: string;
  userName!: string;
  userId!: number;
  ticketId!: number;
  dateCreation! :Date;
  userImageUrl!:string;
  userNotifiedId!:[];
  }
