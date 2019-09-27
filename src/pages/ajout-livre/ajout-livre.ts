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
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";


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
  public biblios:Biblio[] = [];
  public proprios: Lecteur[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private lienFirebaseService: LienFireBaseProvider,
              private lienStorageService: LienStorageProvider,
              private toastCtrl: ToastController,
              private camera: Camera) {
    this.livre = this.navParams.get('data');
    this.lienStorageService.getBiblios().then(data => {
      this.biblios = data;
    });
    this.lienStorageService.getLecteurs().then(data => {
      this.proprios = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutLivrePage');
  }

  onSubmitForm(form: NgForm) {
    console.log("ajout livre", form.value);

    this.lienFirebaseService.addLivre(form)
      .then( res => {
        // TODO :
        // this.lienStorageService.setLivre()
        let toast = this.toastCtrl.create({
          message: 'Livre add successfully',
          duration: 3000
        });
        toast.present();
      //  this.resetFields();
      console.log("livre ajouter")
        this.navCtrl.pop();
        this.navCtrl.push('FicheLivrePage', {'data':res, 'id':res.id});
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
          console.log('data : ', data, ' livre.cover : ', this.livre.cover);
          this.navCtrl.pop();
          this.navCtrl.push('AjoutLivrePage', {'data':this.livre, 'id':this.livre.id_L});
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
  // TODO
  }
}
