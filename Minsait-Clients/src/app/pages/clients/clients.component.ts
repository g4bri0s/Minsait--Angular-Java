import { Component } from '@angular/core';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  clients: IClient[] = [];
  constructor(private ClientsService: ClientsService) {}

  ngOnInit() {
    this.ClientsService.getClients().subscribe((result: IClient[]) => {
      this.clients = result;
    });
  }

  deleteClient(cpf: number) {
    this.ClientsService.deleteClient(cpf).subscribe((client) => {
      this.ClientsService.getClients();
    });
  }

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  confirmDelete(cpf: number) {
    this.swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.swalWithBootstrapButtons.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The client has been deleted.',
            showConfirmButton: false,
            timer: 2000,
          });
          this.deleteClient(cpf);
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalWithBootstrapButtons.fire({
            icon: 'error',
            title: 'Cancelled!',
            text: 'Client data is safe :)',
            timer: 2000,
          });
        }
      });
  }
}
