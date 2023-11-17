import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
    peer!:RTCPeerConnection;
  constructor() { 
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      })
    
  }

  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      try {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      } catch (error) {
        console.error('Error creating offer:', error);
        return undefined;
      }
    }
// Provide a default return value if this.peer is not defined
    return undefined;
  }
 
  async setLocalDescription(ans:any){
    if(this.peer){
      console.log(399,ans);
      
      try{
        const sessionDescription = new RTCSessionDescription(ans);
        console.log(4333,sessionDescription);
        
        await this.peer.setRemoteDescription(sessionDescription);
        console.log("remote des success");
        
        }catch(error){
          console.log('errro in setting remotedes',error);
          
      }
    }else{
      console.log("peer connection not available");
      
    }
  }

  async getAnswer(offer:any):Promise<RTCSessionDescriptionInit | undefined>{
    if(this.peer){
        await this.peer.setRemoteDescription(offer)
        const ans = await this.peer.createAnswer()
        await this.peer.setLocalDescription(new RTCSessionDescription(ans));
        return ans;
     }else{
      return undefined;
     }
  }
}
