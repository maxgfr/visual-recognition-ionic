import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    base64Image:any;

    constructor(public navCtrl: NavController,
        private transfer: FileTransfer,
        private camera: Camera,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public alert: AlertController) {}


        getImage() {
            const options: CameraOptions = {
                quality: 100,
                targetHeight: 500,
                targetWidth: 500,
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: this.camera.EncodingType.PNG,
                mediaType: this.camera.MediaType.PICTURE
            }

            this.camera.getPicture(options).then((imageData) => {
                this.uploadImage(imageData);
            }, (err) => {
                console.log(err);
                this.presentToast(err);
            });
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
                this.uploadImage(imageData);

            }, err => {
                this.showAlert(err);
            });
        }


        uploadImage (imageData) {
            this.base64Image = 'data:image/png;base64,' + imageData;

            console.log(imageData);

            let loader = this.loadingCtrl.create({
                content: "Uploading..."
            });
            loader.present();

            const fileTransfer: FileTransferObject = this.transfer.create();

            let options: FileUploadOptions = {
                fileKey: 'image',
                fileName: 'image',
                chunkedMode: false,
                mimeType: "image/jpeg",
                headers: {}
            }

            fileTransfer.upload('data:image/png;base64,'+imageData, 'https://visual-recogntion.eu-gb.mybluemix.net/api/upload', options)
            .then((data) => {
                console.log(data);
                var json = JSON.parse(data.response);
                console.log(json);
                loader.dismiss();
                this.presentToast("Image uploaded successfully");
                var find_monument = false;
                for (var i=0; i<json.images[0].classifiers[0].classes.length; i++) {
                    if (json.images[0].classifiers[0].classes[i].class == 'building'|| json.images[0].classifiers[0].classes[i].class == 'arch' || json.images[0].classifiers[0].classes[i].class == 'tower'|| json.images[0].classifiers[0].classes[i].class == 'bridge')
                        find_monument = true;
                }
                if (find_monument) {
                    this.showAlert(json.images[0].classifiers[1].classes[0].class+" with score of : "+ json.images[0].classifiers[0].classes[0].score);
                } else {
                    this.showAlert("Watson hasn't found any monument on this picture...");
                }
                //this.showAlert(json.images[0].classifiers[0].classes[0].class+" with score of : "+ json.images[0].classifiers[0].classes[0].score); //display the higher result
            }, (err) => {
                console.log(err);
                loader.dismiss();
                this.presentToast(err);
            });
        }


        presentToast(msg) {
            let toast = this.toastCtrl.create({
                message: msg,
                duration: 3000,
                position: 'bottom'
            });

            toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });

            toast.present();
        }

        showAlert(msg) {
            let alert = this.alert.create({
                title: 'Alert',
                subTitle: msg,
                buttons: ['OK']
            });
            alert.present();
        }


    }
