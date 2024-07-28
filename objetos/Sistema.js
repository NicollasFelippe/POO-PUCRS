import { servicoAerovias } from "./servicoAerovias.js";
import { ServicoPiloto } from "./servicoPiloto.js";
import { servicoAeronaves } from "./servicoAeronaves.js";
import { ServicoPlanos } from "./ServicoPlanos.js";
import { OcupacaoAerovia } from "./OcupacaoAerovia.js";
import { PlanoDeVoo } from "./PlanoDeVoo.js";
import { aeronavePassageiros } from "./aeronavePassageiros.js";
import { aeronaveParticular } from "./aeronaveParticular.js";
import { aeronaveCarga } from "./aeronaveCarga.js";
import { aerovia } from "./aerovia.js";


export class Sistema {
  constructor(servicoAerovias, servicoPilotos, servicoAeronaves, servicoPlanos, ocupacaoAerovia) {
    this.servicoAerovias = servicoAerovias;
    this.servicoPilotos = servicoPilotos;
    this.servicoAeronaves = servicoAeronaves;
    this.servicoPlanos = servicoPlanos;
    this.ocupacaoAerovia = ocupacaoAerovia;
  }

  // Lista todas as Aerovias que foram injetadas na classe sistema
  listarAerovias() {
    try {
      const aerovias = this.servicoAerovias.aerovias;
      console.log("Lista de Aerovias:");
      aerovias.forEach(aerovia => {
        console.log(aerovia); 
      });
    } catch (error) {
      console.error("Erro ao listar aerovias:", error.message);
    }
  }

  // Lista as altitudes livres de uma aerovia naquela data, dados injetados na classe sistema
  altitudesLivres(idAerovia, data) {
    try {
      const altitudesLivres = this.ocupacaoAerovia.altitudesLivres(idAerovia, data);
      console.log(`Altitudes livres na aerovia ${idAerovia}, na data ${data}:`, altitudesLivres);
      return altitudesLivres;
    } catch (error) {
      console.error("Erro ao verificar altitudes livres:", error.message);
    }
  }
  
  submeterPlanoDeVoo(objplanodevoo, aeronave) {
    // Verificar se aeronave está na lista de aeronaves    
    if (!this.servicoAeronaves.verificarAeronave(aeronave.prefixo)) {
      console.log("Aeronave não encontrada");
      return null;
    }

    // Obter a aerovia pelo ID do plano de voo
    const aerovia = this.servicoAerovias.getAeroviaById(objplanodevoo.idAerovia);
    if (!aerovia) {
      console.log("Aerovia não encontrada");
      return null;
    }

    // Verificar se aeronave tem autonomia suficiente
    const distanciaAerovia = aerovia.tamanho;
    const autonomiaNecessaria = distanciaAerovia * 1.1; // 110% da distanciaAerovia
  
    if (aeronave.autonomia < autonomiaNecessaria) {
      console.log("Plano cancelado, aeronave não tem autonomia suficiente");
      return null;
    }

    // Verificar restrições específicas para tipos de aeronave
    if ((aeronave instanceof aeronavePassageiros && objplanodevoo.altitude < 28000)) {
      console.log("Plano Recusado, aeronaves do tipo Passageiro devem voar acima de 28mil pés");
      return null;
    }

    if ((aeronave instanceof aeronaveParticular && objplanodevoo.altitude > 27000)) {
      console.log("Plano Recusado, aeronaves do tipo Particular devem voar abaixo de 27mil pés");
      return null;
    }

    if ((aeronave instanceof aeronaveCarga && objplanodevoo.data.getHours() >= 6)) {
      console.log("Plano Recusado, aeronaves de Carga devem voar entre 0h e 6h apenas");
      return null;
    }

    // Verifica se altitude está livre no horário especificado
    const tempoDeVoo = distanciaAerovia / aeronave.velocidadeCruzeiro;
    const slotsNecessarios = Math.ceil(tempoDeVoo); // Arredonda para cima

    if (!this.ocupacaoAerovia.isAltitudeLivre(objplanodevoo.idAerovia, objplanodevoo.altitude, objplanodevoo.data, slotsNecessarios)) {
      console.log("Altitude ou horário já ocupados.");
      return null;
    }

    // Adiciona o plano de voo ao serviço de planos
    this.servicoPlanos.addPlano(objplanodevoo);

    // Marca aerovia como ocupada nos slots de horário necessários
    this.ocupacaoAerovia.ocupa(objplanodevoo.idAerovia, objplanodevoo.data, objplanodevoo.altitude, slotsNecessarios);

    // Registra os slots ocupados no plano de voo
    for (let i = 0; i < slotsNecessarios; i++) {
      const slot = objplanodevoo.data.getHours() + i;
      objplanodevoo.adicionarSlotOcupado(slot);
    }

    objplanodevoo.ativaPlano = true; // Ativa o plano de voo

    console.log(`Plano de Voo aprovado com ID: ${objplanodevoo.id}`);
    return objplanodevoo.id;
  }
 

  //lista o plano de Voo pelo ID do plano
  listarPlanoPorNumero(planoID) {
    try {
      const plano = this.servicoPlanos.findPlano(planoID);
      console.log(`Plano de Voo ID: ${plano.id}`);
      console.log(`Piloto: ${plano.matriculaPiloto}`);
      console.log(`Aeronave: ${plano.idAerovia}`);
      console.log(`Data M/D/Y: ${plano.data.toLocaleDateString()}`);
      console.log(`Horário: ${plano.horario}`);
      console.log(`Altitude: ${plano.altitude}`);
      console.log(`Slots de Horário: ${plano.slots}`);
      console.log(`Cancelado: ${plano.cancelado}`);
    } catch (error) {
      console.log(error.message);
    }
  }  
}
