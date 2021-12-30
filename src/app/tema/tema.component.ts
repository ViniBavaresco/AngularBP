import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema();
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      Swal.fire({
        title: 'Sua sessão expirou, faça o login novamente',
        icon: 'info',
        confirmButtonText: 'Certo!',
      });
      this.router.navigate(['/entrar']);
    }

    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      Swal.fire({
        title: 'Tema cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Certo!',
        timer: 3000,
        timerProgressBar: true,
      })
      this.findAllTemas();
      this.tema = new Tema();
    });
  }
}
