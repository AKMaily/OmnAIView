import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, switchMap } from "rxjs";
import { map, from } from "rxjs";
import { Device, DeviceListResponse } from "../../models/device.model";
import { BackendPortService } from "./port.service";

@Injectable({
    providedIn: 'root'
})
export class BackendAPIService {
    constructor(
        private backendPortService: BackendPortService,
        private httpClient: HttpClient) { }

    getDevices(): Observable<DeviceListResponse> { // returns the Raw DeviceListResponse 

        const portObservable = from(this.backendPortService.loadOmnAIScopeBackendPort());

        const devicesObservable = portObservable.pipe(
            switchMap(port => {
                console.log("Using port", port, " for the local Backend in angular");
                const url = `http://127.0.0.1:${port}/UUID`;
                return this.httpClient.get<DeviceListResponse>(url);
            })
        );

        return devicesObservable;
    }

    connectWebSocket(message: string): void {
        this.backendPortService.loadOmnAIScopeBackendPort().then(port => {
            const socket = new WebSocket(`ws://127.0.0.1:${port}/ws`);
    
            socket.onopen = () => {
                console.log("WebSocket-Verbindung geöffnet.");
            };
    
            let initialHandshakeReceived = false;

            let counter = 0;
    
            socket.onmessage = (event) => {
                const rawMessage = event.data;
                console.log("Empfangene Nachricht:", rawMessage);
    
                // Versuchen zu parsen – aber nur wenn es gültiges JSON ist
                let data: any;
                try {
                    data = JSON.parse(rawMessage);
                } catch (e) {
                    console.warn("Nicht-JSON Nachricht empfangen:", rawMessage);
                    
                    // Sobald die Handshake-Nachricht erkannt wurde, senden wir die UUID
                    if (!initialHandshakeReceived && rawMessage.startsWith("Hello")) {
                        initialHandshakeReceived = true;
                        console.log("Sende UUID nach Initialnachricht...");
                        setTimeout(() => {
                            socket.send("E4620C205B304B21");
                            console.log("UUID gesendet");
                          }, 100);
                    }
                    return;
                }
            };
    
            socket.onerror = (error) => {
                console.error("WebSocket-Fehler:", error);
            };
    
            socket.onclose = () => {
                console.log("WebSocket-Verbindung geschlossen.");
            };
        }).catch(err => {
            console.error("Fehler beim Laden des Ports:", err);
        });
    }
    
}