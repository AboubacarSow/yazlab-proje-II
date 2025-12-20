export interface Message extends MessageDto {
  id : number;
  isread: boolean;
}

export interface MessageDto{
  fullname:string;
  email:string;
  phone: string;
  content: string;
  subject: string;
}
