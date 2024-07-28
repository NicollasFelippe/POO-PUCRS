import { typedef, validate } from "bycontract";
import { error } from "console";
import { aeronaveComercial } from "./aeronaveComercial.js";
// classe que extende uma aeronave comercial que recebe um prefixo, velocidade,  autonomia, peso maximo e nome da CIA
export class aeronaveCarga extends aeronaveComercial {
  #pesoMax;
// metodo construtor e validade verificando se o tipo esta correto, ele herda os atributos de aeronaveComercial e adciona peso máximo
  constructor(prefixo, velocidadeCruzeiro, autonomia,nomeCIA, pesoMax) {
    validate(arguments,["string","number","number","string","number"])
    super(prefixo, velocidadeCruzeiro, autonomia,nomeCIA);
    this.#pesoMax = pesoMax;
  };
// getter que retorna o peso máximo desta classe
get pesoMax() {
  return this.#pesoMax;
}
// metodo que retorna as informações da aeronaveCarga de uma maneira mais visível e textual, ela herda o
//metodo de mesmo nome da classe AeronoveComercial e adiciona o peso Máximo.
toString() {
  return super.toString() + `,Capacidade de carga: ${this.#pesoMax}`;
}
};