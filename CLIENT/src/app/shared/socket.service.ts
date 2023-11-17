import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SocketIoConfig } from 'ngx-socket-io';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private message: string = '';

  constructor() {
    const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
    this.socket = io(config.url, config.options);
  }

  //doctor joining
  joinRoom(data: { email: string; room: string }) {
    if (this.socket) {
      this.socket.emit('room:join', data);
    }
  }
  //user joining
  userRoomJoin(data: { email: string; room: string }): void {
    if (this.socket) {
      this.socket.emit('user-room:join', data);
    }
  }

  //listening to the event from backend on user joining
  onUserJoined(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('user:joined', (data: any) => {
        observer.next(data);

      });
      this.socket.off('user:joined', (data: any) => { })
    });
  }

  //call from doctor to user
  emitUserCall(data: { to: string; offer: any }): void {
    if (this.socket) {
      this.socket.emit('user:call', data);

    }
  }
  //listening to incoming call event
  onIncomingCall(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('incoming:call', (data: any) => {
        observer.next(data)
      })
    })
  }
  //emitting that call accepted
  emitCallAccepted(data: { to: string, ans: any }) :void{
    if (this.socket) {
      console.log("inside oncall accepted data sending:to:",data);
      
      this.socket.emit('call:accepted', { data })
    }
  }

  //listening to call accepted event
  listenCallAccepted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('call:accepted', (data: any) => {
        observer.next(data)
      })
    })
  }

  //negotiation offer emitting
  emitNegoNeeded(data:{offer:any,to:string}){
    this.socket.emit('peer:nego:needed',data)
  }

  //listening to negotiation
  listenToNegoNeeded():Observable<any>{
    return new Observable(observer=>{
      this.socket.on('peer:nego:needed',(data:any)=>{
        observer.next(data)
      })
    })
  }

  //emitting nego:done
  emitNegoDone(data:{to:string,ans:any}){
    this.socket.emit('peer:nego:done',data);
  }

  //listening to nego:final

  listenToNegoFinal():Observable<any>{
    return new Observable(observer=>{
      this.socket.on('peer:nego:final',(data:any)=>{
        observer.next(data)
      })
    })
  }

  //emitting the disconnection

  emitDisconnect(data: { to: string }): void {
    if (this.socket) {
      this.socket.emit('disconnect:call', data);
    }
  }

  


 



  
}
