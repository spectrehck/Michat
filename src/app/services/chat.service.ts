import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';


@Injectable()

export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje [] = [];

  constructor( private afs: AngularFirestore ) { }


  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                          .limit(5) );
    return this.itemsCollection.valueChanges()
    .pipe(map( (mensajes: Mensaje[]) => {
    console.log( mensajes );
    this.chats = mensajes;

    this.chats = [];
    for ( const mensaje of mensajes) {
      this.chats.unshift( mensaje );
    }

    return this.chats;

    }));
}

agregarMensaje( texto: string) {

  const mensaje: Mensaje = {
nombre: 'cesar',
mensaje: texto,
fecha: new Date().getTime()
  };

   return this.itemsCollection.add( mensaje);
}
}
