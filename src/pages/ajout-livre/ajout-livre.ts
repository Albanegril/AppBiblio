import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Camera} from "@ionic-native/camera";
import {Livre} from "../../models/Livre";

/**
 * Generated class for the AjoutLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout-livre',
  templateUrl: 'ajout-livre.html',
})
export class AjoutLivrePage{
  public livre:Livre = new Livre();

  constructor(private lienFirebaseService: LienFireBaseProvider,
              public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController,
              private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivrePage');
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("ajout livre");

    // ajout BD
    // verification des entrées min + si existant ?
    //TODO
    /*this.lienFirebaseService.addLivre(form)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Livre add successfully',
          duration: 3000
        });
        toast.present();
      //  this.resetFields();*/
    console.log("ajoute du livre dans la BD...")
        this.navCtrl.push('FicheLivrePage');
      /*}, err => {
        console.log(err)
      })*/
  }

  onTakePhoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }).then(
      (data) => {
        if (data) {
          this.livre.cover = normalizeURL(data);
        }
      }
    ).catch(
      (error) => {
        this.toastCtrl.create({
          message: error.message,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    )
  }

  onGalerie() {

  }
}
