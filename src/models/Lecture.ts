export class Lecture {
  id: string;
  id_L: string;
  num_page: number;

  constructor(id: string, id_L: string, nb_page: number) {
    this.id = id;
    this.id_L = id_L;
    this.num_page = nb_page;
  }
}
