import { typedef, validate } from "bycontract";
import { error } from "console";
import { aeronave } from "./aeronave.js";
// Classe que recebe uma lista das aeronaves disponíveis
export class servicoAeronaves {
  #aeronaves;
  //metodo construtor criando uma lista vazia para adicionar as aeronaves
  constructor() {
    this.#aeronaves = [];
  }//getter que retorna os valores dentro da lista criada, mapeando o metodo ToString da classe aeronave
    get aeronaves() {
     return this.#aeronaves.map(aeronave => aeronave.toString());
    }
    //metodo que adiciona uma aeronave a lista criada
  addAeronave(novaAeronave) {
    validate(arguments,["object"]) //validate que verifica se o que esta sendo colocado dentro da lista esta correto
      if (novaAeronave instanceof aeronave) {//verifica se o item a ser inserido é uma instancia de aeronave
        this.#aeronaves.push(novaAeronave);
      } else {
        throw new Error("Este objeto não é uma aeronave");//gera mensagem de erro caso o item não seja uma aeronave.
      }
  }
  // Método para verificar se uma aeronave com o prefixo especificado está na lista
  verificarAeronave(prefixo) {
  return this.#aeronaves.some(aeronave => aeronave.prefixo === prefixo);
  }
  // retorna um objeto aeronave


  obterAeronave(prefixo) {
  // Verifica se a aeronave já está criada
    let aeronaveEncontrada = this.#aeronaves.find(aeronave => aeronave.prefixo === prefixo);

    if (aeronaveEncontrada) {
      return Object.create(aeronave.prototype, Object.getOwnPropertyDescriptors(aeronaveEncontrada));
    } else {
      return null;
    }
  }

}