import { Component, OnInit, TemplateRef } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { Producto } from 'src/app/models/producto';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Extras } from 'src/app/models/extras';
import { AngularFireAuth } from 'angularfire2/auth'
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/carrito.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  entradas: any[] = [];
  principales: any[] = [];
  postres: any[] = [];
  modalRef: BsModalRef;
  productoCarrito: Producto;
  usuario: Usuario;

  constructor(private servicioTienda: TiendaService, private modalService: BsModalService,
    public auth: AngularFireAuth,
    public userService: UserService,
    public carritoService: CartService,
    public router: Router) { }

  ngOnInit() {
    this.getEntradas();
    this.getPrincipales();
    this.getPostres();
    this.userService.getUser(this.userService.uid).subscribe(user => this.usuario = user);
  }

  openModal(template: TemplateRef<any>, producto: Producto) {
    this.productoCarrito =  {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      disponible: producto.disponible,
      photoUrl: producto.photoUrl,
      tipo: producto.tipo,
      extras: producto.extras,
      id: producto.id
    };
    this.modalRef = this.modalService.show(template);
  }
  getEntradas() {
    this.servicioTienda.getEntradas().subscribe(entradas => this.entradas = entradas);
  }
  getPrincipales() {
    this.servicioTienda.getPrincipales().subscribe(principales => this.principales = principales);
  }
  getPostres() {
    this.servicioTienda.getPostres().subscribe(postres => this.postres = postres);
  }

  CambioExtra(extra: Extras, indice: number){
   if(extra.anadido == false) {
     this.productoCarrito.extras[indice].anadido = true;
     this.productoCarrito.precio += extra.precio;
     console.log("1");
     console.log(this.productoCarrito);
   }
   else{
    this.productoCarrito.extras[indice].anadido = false;
    this.productoCarrito.precio += (-1*extra.precio);
    console.log("2");
    console.log(this.productoCarrito);
   }
  }
  decline(): void {
    this.productoCarrito.extras.forEach(extra => {
      extra.anadido = false;
    });
    this.modalRef.hide();
  }

  confirm(cantidad: HTMLInputElement){
    const cantidadValue = parseFloat(cantidad.value);
    this.carritoService.addProduct(this.productoCarrito, cantidadValue, this.usuario.uid);
    this.modalRef.hide();
  }
  IrAlCarrito(){
    this.carritoService.createCart(this.usuario.uid);
    this.router.navigate(['/carrito']);
  }
}
