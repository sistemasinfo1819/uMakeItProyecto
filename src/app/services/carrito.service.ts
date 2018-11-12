import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Producto } from "../models/producto";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    public UserService: UserService
  ) { }

  createCart(id){
    this.afs.collection('carts').doc(id).set(
      {id: id, products: [], totalProducts: 0}
    )
  }

  myCart(uid){
    return this.afs.doc(`carts/${uid}`).snapshotChanges();
  }

  myCartRef(uid){
    return this.afs.collection('carts').doc(uid).ref;
  }

  addProduct(products: Producto, cantidad: number, uid): Promise<any> {
    return new Promise((resolve, reject) => {
          const cartRef = this.myCartRef(uid);
          cartRef.get().then(doc => {
            let cartData = doc.data();
            let productsInCart = cartData.products;
            for (let i = 0; i < cantidad; i++) {
                const productToCart = {
                  id: products[i].id,
                  name: products[i].name,
                  price: products[i].price,
                  extras: products[i].extras,
                  qty: 1
                }
                productsInCart.push(productToCart);
                cartData.totalProducts += 1;
              }
              return cartRef.update(cartData).then(() => {
                resolve(true);
              }).catch((err) => {
                reject(err);
              });
              })
        })
      }


    }
