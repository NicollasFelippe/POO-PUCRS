import { typedef, validate } from "bycontract";
import { error } from "console";
import { aerovia } from "./aerovia.js";
//classe que cria uma lista das Aerovias disponíveis armazenando seus dados
export class servicoAerovias {
  #aerovias;
//construindo o servico Aerovias
  constructor() {
    this.#aerovias = [];
  }
  //getter para recuperar
  get aerovias() {
    return this.#aerovias.map(aerovia => aerovia.toString());
  }
  //adicionando Aerovia
  addAerovia(novaAerovia) {
    if (novaAerovia instanceof aerovia) {
      this.#aerovias.push(novaAerovia);
    } else {
      throw new Error("Este objeto não é uma aerovia");
    }
  }
  //verifica se há alguma aerovia pelo id
    existeAerovia(idAerovia) {
    return this.#aerovias.some(aerovia => aerovia.id === idAerovia);
  }
  //encontra uma aerovia pelo id
    getAeroviaById(idAerovia) {
    return this.#aerovias.find(aerovia => aerovia.id === idAerovia);
  }
}