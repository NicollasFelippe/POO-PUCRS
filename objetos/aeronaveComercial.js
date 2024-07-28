import { typedef, validate } from "bycontract";
import { error } from "console";
import { aeronave } from "./aeronave.js";
// classe que extende uma aeronave que recebe um prefixo, velocidade, autonomia e nome da CIA
export class aeronaveComercial extends aeronave {
  #nomeCIA;
  // construtor verificando se os tipos estão corretos, ele recebe da classe aeronave
  //prefixo, velocidade, autonomia, já nome da CIA é próprio desta classe aeronaveComercial
  constructor(prefixo, velocidadeCruzeiro, autonomia, nomeCIA) {
    validate(arguments,["string","number","number","string"])
    super(prefixo, velocidadeCruzeiro, autonomia);
    this.#nomeCIA = nomeCIA;
  };
// retorna o nome da CIA da classe
get nomeCIA() {
  return this.#nomeCIA;
}
// metodo que retorna as informações da aeronaveComercial de uma maneira mais visível e textual, ela herda o
//metodo de mesmo nome da classe Aeronove e adiciona o Nome da CIA.
toString() {
  return super.toString() + `,Nome da CIA: ${this.#nomeCIA}`;
}
};