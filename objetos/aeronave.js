import { typedef, validate } from "bycontract";
import { error } from "console";

// classe que cria uma aeronave que recebe um prefixo, velocidade e autonomia
// classe que cria uma aeronave que recebe um prefixo, velocidade e autonomia
export class aeronave {
  #prefixo;
  #velocidadeCruzeiro;
  #autonomia;
  //metodo construtor e validate verificando se os itens inseridos são do tipo correto para manter a consistência
  constructor(prefixo, velocidadeCruzeiro, autonomia) {
    validate(arguments, ["string", "number", "number"]);
    this.#prefixo = prefixo;
    this.#velocidadeCruzeiro = velocidadeCruzeiro;
    this.#autonomia = autonomia;
  }
  //metodos getter que retornam cada um dos valores inseridos em aeronave
  get prefixo() {
    return this.#prefixo;
  }
  get velocidadeCruzeiro() {
    return this.#velocidadeCruzeiro;
  }
  get autonomia() {
    return this.#autonomia;
  }
  // metodo que retorna as informações da aeronave de uma maneira mais visível e textual
  toString() {
    return `Prefixo: ${this.#prefixo} Velocidade Cruzeiro: ${this.#velocidadeCruzeiro}, Autonomia: ${this.#autonomia}`;
  }
}