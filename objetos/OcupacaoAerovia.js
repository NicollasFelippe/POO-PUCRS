import { typedef, validate } from "bycontract";

//classe para ocupar uma aerovia com horários e alturas
//classe para ocupar uma aerovia com horários e alturas
export class OcupacaoAerovia {
  #aerovias;

  constructor() {
    this.#aerovias = new Map();
    }
    //adicionando aerovias
    addAerovias(aerovias) {
       aerovias.forEach((aerovia) => {
      this.#aerovias.set(aerovia.id, {
        aerovia: aerovia,
        ocupacao: [],
      });
    });
  }
  //ocupa uma aerovia pelo seu plano de voo
  ocupando(plano) {
    const { idAerovia, data, altitude, slots } = plano;
    const aeroviaOcupada = this.#aerovias.get(idAerovia);
    if (!aeroviaOcupada) throw new Error("Aerovia não encontrada");

    const ocupacao = {
      data,
      altitude,
      slots,
    };

    aeroviaOcupada.ocupacao.push(ocupacao);
  }
  //verifica se uma aerovia esta ocupada
  isocupado(idAerovia, data, altitude, slot) {
    const aeroviaOcupada = this.#aerovias.get(idAerovia);
    if (!aeroviaOcupada) throw new Error("Aerovia não encontrada");

    return aeroviaOcupada.ocupacao.some((oc) => {
      return (
        oc.data.getTime() === data.getTime() &&
        oc.altitude === altitude &&
        oc.slots.includes(slot)
      );
    });
  }
  //verifica al altitudes livres.
  altitudesLivres(idAerovia, data) {
    const aeroviaOcupada = this.#aerovias.get(idAerovia);
    if (!aeroviaOcupada) throw new Error("Aerovia não encontrada");

    const ocupadas = aeroviaOcupada.ocupacao
      .filter((oc) => oc.data.getTime() === data.getTime())
      .map((oc) => oc.altitude);

    const todasAltitudes = [
      25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000,
      35000,
    ];
    return todasAltitudes.filter((altitude) => !ocupadas.includes(altitude));
  }
  //ocupa por ID,Data,Altitude e slot de tempo
  ocupa(idAerovia, data, altitude, slot) {
    const aeroviaOcupada = this.#aerovias.get(idAerovia);
    if (!aeroviaOcupada) throw new Error("Aerovia não encontrada");

    if (this.isocupado(idAerovia, data, altitude, slot)) {
      return false;
    }

    this.ocupando({
      idAerovia,
      data,
      altitude,
      slots: [slot],
    });

    return true;
  }
  //Verifica a ocupação atual das aerovias
  getOcupacao() {
    const ocupacao = {};
    for (const [idAerovia, aeroviaData] of this.#aerovias.entries()) {
      ocupacao[idAerovia] = aeroviaData.ocupacao;
    }
    return ocupacao;
  }
  isAltitudeLivre(idAerovia, altitude, data, slotsNecessarios) {
    const aeroviaOcupada = this.#aerovias.get(idAerovia);
    if (!aeroviaOcupada) throw new Error("Aerovia não encontrada");

    // Verifica se a altitude está livre para todos os slots necessários
    for (let i = 0; i < slotsNecessarios; i++) {
      if (this.isocupado(idAerovia, data, altitude, i + 1)) {
        return false; // Altitude ocupada para um dos slots necessários
      }
    }
    return true; // Altitude está livre para todos os slots necessários
  }
}