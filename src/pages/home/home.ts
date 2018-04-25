import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VisualRecognitionServiceProvider } from '../../providers/visual-recognition-service/visual-recognition-service';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(private camera: Camera, private visualRecongition: VisualRecognitionServiceProvider, private alert: AlertController, public navCtrl: NavController) {

    }


    takePhoto() {
        const options: CameraOptions = {
            quality: 100,
            targetHeight: 500,
            targetWidth: 500,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            //
        }, err => {
            this.showAlert(err);
        });
    }

    showAlert(msg) {
        let alert = this.alert.create({
            title: 'Error',
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    }


}
