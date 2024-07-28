// classe para criar o servico dos planos de voo
import { PlanoDeVoo } from "./PlanoDeVoo.js";
export class ServicoPlanos {
  #planos;
  static instance;
  //construtor para garantir que só haja um servicoPlanos
  constructor() {
    if (ServicoPlanos.instance) {
      return ServicoPlanos.instance;
    }

    this.#planos = [];
    ServicoPlanos.instance = this;
  }
  //gett que retorna o plano
  get planos() {
    return this.#planos.map(plano => plano.toString());
  }
  //adicionado um plano de voo
  addPlano(novoPlano) {
    if (!(novoPlano instanceof PlanoDeVoo)) {
      throw new Error("Você está tentando adicionar um objeto que não é um PlanoDeVoo.");
    }

    this.#planos.push(novoPlano);
  }
  //verifica se existe um plano de voo pelo ID
  existePlano(id) {
    const planosEncontrados = this.#planos.filter(plano => plano.id === id);
    if (planosEncontrados.length > 0) {
      return planosEncontrados.map(plano => plano.toString());
    } else {
      throw new Error(`Plano de voo com ID ${id} não encontrado.`);
    }
  }
  //encontra pelo id
  findPlano(id) {
    const planoEncontrado = this.#planos.find(plano => plano.id === id);
    if (planoEncontrado) {
      return planoEncontrado;
    } else {
      throw new Error(`Plano de voo com ID ${id} não encontrado.`);
    }
  }
}