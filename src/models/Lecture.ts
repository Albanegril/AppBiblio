export class Lecture {
  id: number;
  id_L: number;
  num_page: number;

  constructor(id: number, id_L: number, nb_page: number) {
    this.id = id;
    this.id_L = id_L;
    this.num_page = nb_page;
  }
}
