import { typedef, validate } from "bycontract";
import { error } from "console";
import { piloto } from "./piloto.js";
// classe ServicoPilotos cria uma lista de Pilotos cadastrados.
  export class ServicoPiloto {
  #pilotos;
  static instance; //garente que seja criado apenas uma lista
  //construindo a classe
  constructor() {
    if (ServicoPiloto.instance) {
      return ServicoPiloto.instance;
    }

    this.#pilotos = [];
    ServicoPiloto.instance = this;
  }

  //busca um piloto pelo seu ID
  pilotoExiste(matricula) {
    return this.#pilotos.some(piloto => piloto.matricula === matricula);
  }
  //retorna os pilotos
  get pilotos() {
    return this.#pilotos.map((piloto) => piloto.toString());
  }
  //adiciona um novo piloto
  addPiloto(novoPiloto) {
    validate(arguments, ["object"]);
    if (novoPiloto instanceof piloto) {
      if (novoPiloto.habilitacaoAtiva === "Ativa") {
        if (!this.pilotoExiste(novoPiloto.matricula)) {
          this.#pilotos.push(novoPiloto);
        } else {
          throw new Error(`Piloto com matrícula ${novoPiloto.matricula} já existe.`);
        }
      } else {
        throw new Error("O Piloto deve ter a habilitação ativa para fazer parte do Serviço.");
      }
    } else {
      throw new Error("Algo deu errado, você tem certeza que está tentando cadastrar um piloto?");
    }
  }
  //verifica se um piloto existe
  existePiloto(matricula) {
    return this.#pilotos.some(piloto => piloto.matricula === matricula);
  }
}