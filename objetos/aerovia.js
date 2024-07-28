import { typedef, validate } from "bycontract";
import { error } from "console";

//Classe que cria uma aerovia que recebe um ID, origem, destino e tamanho do trecho
//Classe que cria uma aerovia que recebe um ID, origem, destino e tamanho do trecho
export class aerovia {
  #id;
  #origem;
  #destino;
  #tamanho;
  //construtor recebendo as informações solicitadas e validando se o tipo esta correto
  constructor(id, origem, destino, tamanho) {
    validate(arguments,['string','string','string','number'])
    this.#id = id;
    this.#origem = origem;
    this.#destino = destino;
    this.#tamanho = tamanho;
  };//metodos getter que retornam os dados cadastrados da aerovia
  get id() {
    return this.#id;
  }

  get origem() {
    return this.#origem;
  };

  get destino() {
    return this.#destino;
  }

  get tamanho() {
    return this.#tamanho;
  };
  // metodo que retorna as informações da aerovia de uma maneira mais visível e textual
  toString() {
    return `ID: ${this.#id}, Origem: ${this.#origem}, Destino: ${this.#destino}, Tamanho: ${this.#tamanho}`
  };

};