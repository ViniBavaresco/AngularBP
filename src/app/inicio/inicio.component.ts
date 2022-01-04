import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  tituloPost: string;

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema: string;

  user: Usuario = new Usuario();
  idUser = environment.id;
  foto = environment.foto;
  nome = environment.nome;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
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
    this.getAllTemas();
    this.getAllPostagem();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  getAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        Swal.fire({
          title: 'Postagem realizada com sucesso',
          icon: 'success',
          confirmButtonText: 'Certo!',
          timer: 3000,
          timerProgressBar: true,
        });
        this.postagem = new Postagem();
        this.getAllPostagem();
      });
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagem();
    } else {
      this.postagemService
        .getByTituloPostagem(this.tituloPost)
        .subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  findByNomeTema() {
    if (this.nomeTema == '') {
      this.getAllTemas();
    } else {
      this.temaService
        .getByNomeTema(this.nomeTema)
        .subscribe((resp: Tema[]) => {
          this.listaTemas = resp;
        });
    }
  }


}
