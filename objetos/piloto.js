import { typedef, validate } from "bycontract";
import { error } from "console";
import { ServicoPiloto } from "./servicoPiloto.js";
// Classe piloto recebe como parametro matricula, nome e habilitacaoAtiva
export class piloto {
  #nome;
  #matricula;
  #habilitacaoAtiva;
  #servicoPiloto;

  constructor(servicoPiloto) {
    this.#servicoPiloto = servicoPiloto;
  }
  //adicionando um piloto
  addPilot({ matricula, nome, habilitacaoAtiva }) {
    validate({ matricula, nome, habilitacaoAtiva }, {
      matricula: 'string',
      nome: 'string',
      habilitacaoAtiva: 'boolean'
    });

    this.#nome = nome;
    this.#matricula = matricula;
    this.#habilitacaoAtiva = habilitacaoAtiva;
      //verificando se a habilitação esta ativa
    if (this.#habilitacaoAtiva) {
        if (!this.#servicoPiloto.pilotoExiste(this.#matricula)) {
          this.#servicoPiloto.addPiloto(this);
        } else {
          throw new Error(`Piloto com matrícula ${this.#matricula} já existe no serviço.`);
        }
      } else {
        throw new Error("A habilitação do piloto deve estar ativa.");
      }
  }
  //getter para retornar as propriedades da classe
  get matricula() {
    return this.#matricula;
  }

  get nome() {
    return this.#nome;
  }

  get habilitacaoAtiva() {
    if (this.#habilitacaoAtiva === true) {
      return "Ativa";
    } else {
      return "Inativa";
    }
  }
  //representação em sting
  toString() {
    return ` Matricula: ${this.matricula} Nome: ${this.nome} Habilitacao: ${this.habilitacaoAtiva}`;
  }
}