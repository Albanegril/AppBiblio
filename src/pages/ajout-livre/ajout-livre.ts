import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Camera} from "@ionic-native/camera";
import {Livre} from "../../models/Livre";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Maison} from "../../models/Maison";
import {Lecteur} from "../../models/Lecteur";
import {Biblio} from "../../models/Biblio";


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
  public biblios:Biblio[] = new Array();
  public proprios: Lecteur[] = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private toastCtrl: ToastController,
              private camera: Camera) {
    this.livre = this.navParams.get('data');
    console.log('livre == ', this.livre);
    this.biblios = this.lienFirebaseService.retrieveBiblio();
    this.proprios = this.lienFirebaseService.retrieveLecteur();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivrePage');
  }

  onSubmitForm(form: NgForm) {
    console.log("ajout livre", form.value);

    this.lienFirebaseService.addLivre(form)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Livre add successfully',
          duration: 3000
        });
        toast.present();
      //  this.resetFields();
      console.log("livre ajouter")
       this.navCtrl.push('FicheLivrePage', {'data':res, 'id':res.idLec});
      }, err => {
        console.log(err);
      })
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
