import {Lecture} from "./Lecture";

export class Lecteur {
  private _id: string;
  private _pseudo: string;
  private _mail: string;
  private _nom: string;
  private _prenom: string;
  private _mdp: string; // à crypter !!
  private _lectures: Lecture[];
  private _avatar: string;
  private telephone: number;


  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  get mdp(): string {
    return this._mdp;
  }

  set mdp(value: string) {
    this._mdp = value;
  }

  get lectures(): Lecture[] {
    return this._lectures;
  }

  set lectures(value: Lecture[]) {
    this._lectures = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  setLecteur(id: string, pseudo: string, mail: string, nom: string, prenom: string, mdp: string, lectures: Lecture[], avatar: string) {
    this._id = id;
    this._pseudo = pseudo;
    this._mail = mail;
    this._nom = nom;
    this._prenom = prenom;
    this._mdp = mdp;
    this._lectures = lectures;
    this._avatar = avatar;
  }
}
