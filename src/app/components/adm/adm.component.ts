import { Component, OnInit,TemplateRef } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Producto } from 'src/app/models/producto';
import { Extras } from 'src/app/models/extras';
@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {

  entradas: any[] = [];
  principales: any[] = [];
  postres: any[] = [];
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  producto: Producto = new Producto();
  producto2: Producto = new Producto();
  constructor(private servicioTienda: TiendaService,private modalService: BsModalService) { }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  modificarP(producto: Producto, template: TemplateRef<any>, nombreE :HTMLInputElement, precioE: HTMLInputElement) {
    // Solo las dos primeras eran las que se usaban antes
    this.producto2 = producto;
    this.modalRef2 = this.modalService.show(template);
    const nombre=nombreE.value;
    const precio=parseFloat(precioE.value);
    var extra={
      nombreExtra: nombre,
      precio: precio
      }
  //   this.modalRef2 = this.modalService.show(template);
  //   this.producto2.nombre=producto.nombre;
  //   this.producto2.disponible=producto.disponible;
  //   this.producto2.precio=producto.precio;
  //   this.producto2.descripcion=producto.descripcion;
  //   this.producto2.photoUrl=producto.photoUrl;
  //   this.producto2.tipo=producto.tipo;
  //   this.producto2.id=this.producto.id;
  // if(producto.extras==null){
  //   alert("OTROOOO");
  //   this.producto2.extras=[];
  //   console.log(this.producto2);
  //   }
  // else{
  //   this.producto2.extras=this.producto.extras;
  // }

  if(this.producto2.extras == null){
    alert("LLEGA????")
    //this.producto2.extras = Array(new Extras(parseFloat(precioE.value), nombreE.value))
    this.producto2.extras=[];

  }else {
    this.producto2.extras.push(extra);
  }
  }
  
  //Andir
  confirm(nombreP :HTMLInputElement ,descripcionP:HTMLInputElement,precioP:HTMLInputElement,disponibilidadP:HTMLInputElement, tipoP :HTMLInputElement): void {
    //Validaciones de cada campo
    
    this.producto.nombre = nombreP.value;
    
    this.producto.descripcion = descripcionP.value;
    
    this.producto.precio= parseFloat(precioP.value);

    this.producto.tipo=tipoP.value;
    
    this.producto.photoUrl = "DownloadUrl";
    if(disponibilidadP.value == "Disponible"){
      this.producto.disponible=true;
    }
    else{
      this.producto.disponible=false;
    }
    this.servicioTienda.agregarProducto(this.producto);
    this.modalRef.hide();
  }
  

  confirm2(){
    console.log("Antes de la funcion  modificarProdunto (this.servicioTienda.modificarProducto(this.producto2);) ")
    console.log(this.producto2);
    this.servicioTienda.modificarProducto(this.producto2);
    this.modalRef2.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  decline2(): void {
    this.modalRef2.hide();
  }

  ngOnInit() {
    this.getEntradas();
    this.getPrincipales();
    this.getPostres();

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

  eliminarP(producto: Producto){
    this.servicioTienda.eliminarProducto(producto);
  }

  anadirExtra(nombreE :HTMLInputElement, precioE: HTMLInputElement){
   const nombre=nombreE.value;
   const precio=parseFloat(precioE.value);
    //var extra: Extras = new Extras(parseFloat(precioE.value), nombreE.value );
    var extra={
    nombreExtra: nombre,
    precio: precio,
    anadido: false
    }
    if(this.producto2.extras == null){
      alert("LLEGA????")
      //this.producto2.extras = Array(new Extras(parseFloat(precioE.value), nombreE.value))
      this.producto2.extras=[];

    }else {
      this.producto2.extras.push(extra);
    }
    //this.modalRef2.hide();

  }

}
