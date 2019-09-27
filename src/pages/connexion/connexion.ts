import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { GestionCompteProvider } from '../../providers/gestion-compte/gestion-compte';
import { ModalController } from 'ionic-angular';
import { ConnexionPourquoiPage } from '../connexion-pourquoi/connexion-pourquoi';
import { ConnexionCreationPage } from '../connexion-creation/connexion-creation';
import {LienFireBaseProvider} from "../../providers/lien-fire-base/lien-fire-base";
import {LienStorageProvider} from "../../providers/lien-storage/lien-storage";

/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  private errorMessage: "Echec Connexion";
  constructor(private gestionnaireCompte: GestionCompteProvider,
              public modalCtrl: ModalController,
              private lienFirebaseService: LienFireBaseProvider,
              private lienStorageService: LienStorageProvider,
              public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }

/*goBack(){
    console.log(`goBack`);
    this.navCtrl.pop();
  }*/

  onSubmitForm(form: NgForm) {
    console.log(form.value);
    console.log("connexion compte");

    const email = form.value.email;
    const mdp = form.value.mdp;

    //TODO
    // gérer la connexion avec le lecteur dans la BD (et non les comptes firebase)
    this.gestionnaireCompte.connexionLecteur(email, mdp).then(
      () => {
        console.log("connexion en cours");
        this.navCtrl.push('ListBiblioPage').then(
          ()=>{
            this.getAllData();
            this.navCtrl.setRoot('ListBiblioPage');
        });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  getAllData(){
    //Storage Livres
    this.lienFirebaseService.retrieveLivres().then(data => {
      this.lienStorageService.setLivres(data).then(dataBis => {
        console.log('data: ', dataBis);
      });
    });
    //Storage Biblios
    this.lienFirebaseService.retrieveBiblio().then(data => {
      this.lienStorageService.setBiblios(data).then(dataBis => {
        console.log('data: ', dataBis);
      });
    });
    //Storage Maisons
    this.lienFirebaseService.retrieveMaisons().then(data => {
      this.lienStorageService.setMaisons(data).then(dataBis => {
        console.log('data: ', dataBis);
      });
    });
    //Storage Lecteurs
    this.lienFirebaseService.retrieveLecteurs().then(data => {
      this.lienStorageService.setLecteurs(data).then(dataBis => {
        console.log('data: ', dataBis);
      });
    });
    //Storage Lectures
    this.lienFirebaseService.retrieveLectures().then(data => {
      this.lienStorageService.setLectures(data).then(dataBis => {
        console.log('data: ', dataBis);
      });
    });
  }


  onClickCreationCompte() {
    const modal = this.modalCtrl.create(ConnexionCreationPage);
    modal.present();
  }

  onClickPourquoiCompte() {
    const modal = this.modalCtrl.create(ConnexionPourquoiPage);
    modal.present();
  }
}
