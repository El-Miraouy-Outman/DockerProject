import {CommentTicket} from "./CommentTicket";

export  class Ticket {
  id!: number;
  updateUserId!: number;
  createUserId!:number;
  customerId!:number;
  associateUserId!: number;
  userName!: string;
  customerName!: string;
  subject!: string;
  description!: string;
  status!: string;
   priority!: string;
  creationDate!: Date;
  updateDate!: Date;
  closingDate!: Date;
  startDate!: Date;
  endDate! : Date;
  finalSolution!: string;
  comments?: CommentTicket[];



}
