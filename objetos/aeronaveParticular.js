import { typedef, validate } from "bycontract";
import { error } from "console";
import { aeronave } from "./aeronave.js";
// classe que extende uma aeronave que recebe um prefixo, velocidade,  autonomia e o responsável pela manutençãp
export class aeronaveParticular extends aeronave {
  #respManutencao;
  //metodo construtor e validade verificando o tipo de dado, recebe os atributos da classe aeronave e adiciona um
  //responsável pela manutenção
  constructor(prefixo, velocidadeCruzeiro, autonomia, respManutencao) {
    validate(arguments,["string","number","number","string"])
    super(prefixo, velocidadeCruzeiro, autonomia);
    this.#respManutencao = respManutencao;
  };
  //metodo que retorna o responsável pela manutenção
  get respManutencao() {
  return this.#respManutencao;
}
  // metodo que retorna as informações da aeronaveParticular de uma maneira mais visível e textual, ela herda o
  //metodo de mesmo nome da classe Aeronove e adiciona o responsável pela manutenção.
  toString() {
  return super.toString() + `,Resposável pela manutenção: ${this.#respManutencao}`;
}
};