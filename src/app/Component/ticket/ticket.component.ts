import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/Models/ticket';
import { TicketService } from 'src/app/Service/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  loading: boolean = true;
  tickets: Ticket[] = [];
  ngOnInit(): void {
    this.getTickets()
  }

  constructor(private service: TicketService) {}
  
  getTickets() {
    this.service.getTickets().subscribe({
      next: (res: Ticket[]) => {
        console.log(res);
        this.tickets = res;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

}
