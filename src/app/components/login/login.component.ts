import { Component, TemplateRef } from '@angular/core';
import {ServicioService} from '../../services/servicio.service';
import {Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import{ UserService } from '../../services/usuario.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AngularFireAuth]
})

export class LoginComponent {

  email: string;
  modalRef: BsModalRef;
  
  constructor(public authentication: AngularFireAuth, 
    public db: AngularFirestore,
    public router: Router, private modalService: BsModalService,
    public UsuarioService: UserService) { }

  ngOnInit() {
    
  }

  Registrar(Email: HTMLInputElement, Password: HTMLInputElement){
    var emailRegistro = Email.value;
    var contrasenaRegistro = Password.value;
    this.authentication.auth.createUserWithEmailAndPassword(emailRegistro, contrasenaRegistro)
    .then(credentials => {

      var usuario = {
        uid: credentials.user.uid,
        email : credentials.user.email,
        name : credentials.user.email,
        role : 'customer',
      }
      this.UsuarioService.crearUser(usuario);
    }).catch(err => {
      alert(err.message);
    })
   
  }

  Iniciar(Email: HTMLInputElement, Password: HTMLInputElement){
    var emailLogin = Email.value;
    var contrasenaLogin = Password.value;
    this.authentication.auth.signInWithEmailAndPassword(emailLogin, contrasenaLogin)
    .then(credentials => {
      this.UsuarioService.uid = credentials.user.uid;
      localStorage.setItem('usuario', JSON.stringify(credentials));
      this.router.navigate(['home']);
    }).catch(err => {
      alert(err.message);
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
