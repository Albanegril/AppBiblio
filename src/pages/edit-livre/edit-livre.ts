import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, normalizeURL, ToastController} from 'ionic-angular';
import {Livre} from "../../models/Livre";
import {Biblio} from "../../models/Biblio";
import {Lecteur} from "../../models/Lecteur";
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {Camera} from "@ionic-native/camera";
import {NgForm} from "@angular/forms";
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

/**
 * Generated class for the EditLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-livre',
  templateUrl: 'edit-livre.html',
})
export class EditLivrePage {
  public livre:Livre = new Livre();
  public biblios:Biblio[] = [];
  public proprios: Lecteur[] = [];
  options: any;

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
    this.options = "'modifier'";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLivrePage');
  }

  supprimer(idL: string) {
    console.log(' idL : ', idL);
    this.lienFirebaseService.deleteLivre(idL).then( res => {
      this.lienStorageService.removeLivre(idL); // TODO : Handle error
      let toast = this.toastCtrl.create({
        message: 'Livre deleted',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
    }, err => {
      console.log(err);
    })
  }

  modifier(form: NgForm) {
    console.log("modif livre", form.value);

    // TODO
    // this.lienStorageService.editLivre()
    this.lienFirebaseService.modifierLivre(form, this.livre, this.livre.id_L)
      .then( res => {
        let toast = this.toastCtrl.create({
          message: 'Livre updated',
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop();
        this.navCtrl.pop();
        this.navCtrl.push('FicheLivrePage', {'data':res, 'id':this.navParams.get('id')});
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
          this.navCtrl.push('EditLivrePage', {'data':this.livre, 'id':this.livre.id_L});
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
    //TODO
  }
}
