export class Lecture {
  private _id: string;
  private _idLec: string; // idLec lecteur
  private _idLiv: string; // idLec livre
  private _page: number; // page à laquelle est le lecteur dans le livre
  private _commentaire : string;


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get idLec(): string {
    return this._idLec;
  }

  set idLec(value: string) {
    this._idLec = value;
  }

  get idLiv(): string {
    return this._idLiv;
  }

  set idLiv(value: string) {
    this._idLiv = value;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get commentaire(): string {
    return this._commentaire;
  }

  set commentaire(value: string) {
    this._commentaire = value;
  }

  setLecture(id: string, idLec: string, idLiv: string, page: number, commentaire: string) {
    this._id = id;
    this._idLec = idLec;
    this._idLiv = idLiv;
    this._page = page;
    this._commentaire = commentaire;
  }
}
