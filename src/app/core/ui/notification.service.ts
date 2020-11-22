import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private toastCtrl: ToastController) {
    }

    showInfo(title: string, msg: string) {
        this.presentToast(
            `${title}\n${msg}`
        );
    }

    showError(title: string, msg: string) {
        this.presentToast(
            `Erro: ${title}\n${msg}`
        );
    }

    async presentToast(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }

}
