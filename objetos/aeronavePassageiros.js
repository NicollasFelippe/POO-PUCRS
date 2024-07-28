import { typedef, validate } from "bycontract";
import { error } from "console";
import { aeronaveComercial } from "./aeronaveComercial.js";
// classe que extende uma aeronave comercial que recebe um prefixo, velocidade,  autonomia, peso maximo e nome da CIA
export class aeronavePassageiros extends aeronaveComercial {
  #maxPassageiros;
// metodo construtor e validate verificando se o tipo esta correto, ele herda os atributos de aeronaveComercial e adciona máximo de passageiros
  constructor(prefixo, velocidadeCruzeiro, autonomia,nomeCIA, maxPassageiros) {
    validate(arguments,["string","number","number","string","number"])
    super(prefixo, velocidadeCruzeiro, autonomia,nomeCIA,maxPassageiros);
    this.#maxPassageiros = maxPassageiros;
  };
// getter que retorna o numero máximo de passageiros
get maxPassageiros() {
  return this.#maxPassageiros;
}
// metodo que retorna as informações da aeronaveCarga de uma maneira mais visível e textual, ela herda o
//metodo de mesmo nome da classe AeronoveComercial e adiciona o máximo de passageiros
toString() {
  return super.toString() + `,Capacidade Maxima de Passageiros: ${this.#maxPassageiros}`;
}
};