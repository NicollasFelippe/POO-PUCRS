import { validate } from "bycontract";
// classe para cirar um plano de voo
export class PlanoDeVoo {
  #id;
  #matriculaPiloto;
  #idAerovia;
  #data;
  #altitude;
  #slots;
  #cancelado;
  #servicoPiloto;
  //construindo um plano de voo
  constructor(id, matriculaPiloto, idAerovia, data, altitude, servicoPiloto) {
    validate(arguments, ["string", "string", "string", "object", "number", "object"]);

    // Validar o serviço de pilotos
    if (!servicoPiloto || !servicoPiloto.existePiloto(matriculaPiloto)) {
      throw new Error(`Piloto com matrícula ${matriculaPiloto} não encontrado.`);
    }

    // Garantir que o argumento `data` seja um objeto Date
    if (!(data instanceof Date)) {
      throw new Error("Data deve ser um objeto Date válido.");
    }

    this.#id = id;
    this.#matriculaPiloto = matriculaPiloto;
    this.#idAerovia = idAerovia;
    this.#data = data;
    this.#altitude = altitude;
    this.#slots = [] //slots;
    this.#cancelado = true;
    this.#servicoPiloto = servicoPiloto;
  }
  //getter que retornam a propriedade plano de voo
  get id() {
    return this.#id;
  }

  get matriculaPiloto() {
    return this.#matriculaPiloto;
  }

  get idAerovia() {
    return this.#idAerovia;
  }

  get data() {
    return this.#data;
  }

  get horario() {
    return `${this.#data.getHours()}:${this.#data.getMinutes()}`;
  }

  get altitude() {
    return this.#altitude;
  }

  get slots() {
    return this.#slots;
  }

  get cancelado() {
    return this.#cancelado;
  }

  get servicoPiloto() {
    return this.#servicoPiloto;
  }
  //setter que ao ser chamado vai trocar canceclado para false, dando aprovação final ao plano de voo
  set ativaPlano(confirmacao) {
    this.#cancelado = !confirmacao;
  }

  adicionarSlotOcupado(slot) {
  this.#slots.push(slot);
  }

  // Remove um slot de horário ocupado
  removerSlotOcupado(slot) {
  const index = this.#slots.indexOf(slot);
  if (index !== -1) {
    this.#slots.splice(index, 1);
  }
  }

  // Verifica se um determinado slot de horário está ocupado
  isSlotOcupado(slot) {
  return this.#slots.includes(slot);
  }
  //retorna o próprio plano para visualização
  plano() {
    return {
      id: this.#id,
      matriculaPiloto: this.#matriculaPiloto,
      idAerovia: this.#idAerovia,
      data: this.#data,
      horario: this.horario,
      altitude: this.#altitude,
      slots: this.#slots,
      cancelado: this.#cancelado,
      servicoPiloto: this.#servicoPiloto
    }
  };
  //retorna o plano em uma representação por string.
  toString() {
    return `Id: ${this.id} Matricula: ${this.matriculaPiloto} Id Aerovia: ${this.idAerovia} Data: ${this.data.toLocaleDateString()} Horario: ${this.horario} Altitude: ${this.altitude} Slots: ${this.slots} Cancelado: ${this.cancelado}`;
  }
}