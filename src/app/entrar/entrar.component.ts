import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.nome = this.userLogin.nome
      environment.token = this.userLogin.token

      //Teste de variáveis
      /*console.log(environment.token)
      console.log(environment.id)
      console.log(environment.nome)
      console.log(environment.foto)*/

      this.router.navigate(['/inicio'])
    }, erro => {
      if (erro.status == 401) {
        Swal.fire({
          icon: 'warning',
          title: 'Email e/ou senha incorretos',
          confirmButtonText: 'Certo!',
          timer: 3000,
          timerProgressBar: true,
        })
      }
    })
  }

}
