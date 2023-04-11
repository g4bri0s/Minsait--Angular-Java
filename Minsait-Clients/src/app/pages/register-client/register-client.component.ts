import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
})
export class RegisterClientComponent {
  constructor(private clientService: ClientsService, private router: Router) {}

  registerClientForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl({}, Validators.required),
    telefone: new FormControl({}, Validators.required),
    rendimentoMensal: new FormControl({}, Validators.required),
  });

  enderecoData = new FormGroup({
    rua: new FormControl('', Validators.required),
    cep: new FormControl({}, Validators.required),
    numero: new FormControl({}, Validators.required),
  });

  register() {
    const client: IClient = this.registerClientForm.value as IClient;
    this.clientService.registerClient(client).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Client saved',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    );
  }

  refreshPagAfterButton(redirectedPage: string) {
    setTimeout(() => {
      this.router.navigate([`${redirectedPage}`]);
    }, 2000);
  }
}
