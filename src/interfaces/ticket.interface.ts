export interface Ticket {
    ticket_no: string
    ticket_title: string
    created_at: string
    priority: 'unassigned' | 'low' | 'high'
    status: "open" | "pending" | "resolved" | "closed"
}

export interface TicketMessage {
    ticket_no: string
    message: string
    message_type: string
    created_at: string
    attachment?: string
}