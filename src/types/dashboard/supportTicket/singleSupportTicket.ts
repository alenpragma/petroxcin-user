export type TicketMessage = {
    id: number;
    ticket_id: number;
    sender_id: number;
    message: string;
    created_at: string;
    updated_at: string;
    attachments: any[]; // You can replace `any` with a specific type if you know the structure of attachments
  };
  
  export type SupportTicket = {
    id: number;
    ticket_id: string;
    user_id: number;
    subject: string;
    status: string;
    created_at: string;
    updated_at: string;
    messages: TicketMessage[];
  };
  