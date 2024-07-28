import { typedef, validate } from "bycontract";
import { error } from "console";
import promptsync from "prompt-sync";

const prompt = promptsync({ sigint: true });

import { piloto } from "./objetos/piloto.js";
import { ServicoPiloto } from "./objetos/servicoPiloto.js";
import { aeronaveParticular } from "./objetos/aeronaveParticular.js";
import { aeronaveCarga } from "./objetos/aeronaveCarga.js";
import { aeronavePassageiros } from "./objetos/aeronavePassageiros.js";
import { servicoAeronaves } from "./objetos/servicoAeronaves.js";
import { aerovia } from "./objetos/aerovia.js";
import { servicoAerovias } from "./objetos/servicoAerovias.js";
import { PlanoDeVoo } from "./objetos/PlanoDeVoo.js";
import { ServicoPlanos } from "./objetos/ServicoPlanos.js";
import { OcupacaoAerovia } from "./objetos/OcupacaoAerovia.js";
import { Sistema } from "./objetos/Sistema.js";
import { aeronave } from "./objetos/aeronave.js";

// Constante que permitirá que nosso código tenha apenas um serviço para as aeronaves
const ServicoAeronaves = new servicoAeronaves();

// Constante que permitirá que nosso código tenha apenas um servico de aerovias
const ServicoAerovias = new servicoAerovias();

// Constante que permitirá que nosso código tenha apenas um serviço de pilotos
const ServicoPilotosAtivos = new ServicoPiloto();

// Constante que permitirá termos acesso aos pilotos inativos (não especificado no trabalho)
const ServicoPilotosInativos = []

//constante que permitirá termos acesso aos servicos da classe
const servicoPlanos = new ServicoPlanos();

//constante que ocupará as aerovias.
const ocupacaoAerovia = new OcupacaoAerovia();


//constante que permitirá termos acesso aos sistemas
const sistema = new Sistema(ServicoAerovias, ServicoPilotosAtivos, ServicoAeronaves, servicoPlanos, ocupacaoAerovia);

//Lista suporte que vai receber os aviões para recuperalos no plano
const avioes = [];

// preparando os pilotos para serem adicionados na lista
const p1 = new piloto(ServicoPilotosAtivos);
const p2 = new piloto(ServicoPilotosAtivos);

//adicionando os pilotos para temos uma experiência com alguns lançamentos
p1.addPilot({ matricula: "a1", nome: "João", habilitacaoAtiva: true });
p2.addPilot({ matricula: "a2", nome: "Nicollas", habilitacaoAtiva: true });

// lançando algumas aeronavem para termos uma experiência com alguns lançamentos
let aParticular = new aeronaveParticular("a1", 1545500, 331501, "João");
let ACA = new aeronaveCarga("a2", 456456456, 456456456456, "TAM", 2000)

// Adicionando Aeronaves ao Serviço
ServicoAeronaves.addAeronave(aParticular)
ServicoAeronaves.addAeronave(ACA)

// Criando Aerovias para termos uma experiência com alguns lançamentos
let aero = new aerovia('a1', 'Brasilia', 'Rio de Janeiro', 400);
let aero2 = new aerovia('a2', 'POA', 'SC', 400);

// Adicionando Aerovias ao serviço de aerovias
ServicoAerovias.addAerovia(aero);
ServicoAerovias.addAerovia(aero2)
ocupacaoAerovia.addAerovias([aero, aero2]);

// inserindo dados na lista suporte 
avioes.push(aParticular)
avioes.push(ACA)

// Criando alguns planos de Voo para termos uma experiência com alguns lançamentos
let planoNovo2 = new PlanoDeVoo("a1", "a1", "a1", new Date(1997, 12 - 1, 12, 15, 30), 2700, ServicoPilotosAtivos);
// Adiconando ao serviço
servicoPlanos.addPlano(planoNovo2)

// submetendo um plano de voo para termos uma experiência com alguns lançamentos
let aeronaveDesejada1 = aParticular
let planoSubmetido1 = sistema.submeterPlanoDeVoo(planoNovo2, aeronaveDesejada1)
if (planoSubmetido1) {
  console.log("Plano de voo submetido com sucesso");
} else {
  console.log("### Falha ao submeter o plano de voo ###");
}

//programa que implementa o uso das classes criadas conforme os exemplos acima
let fim = false;
while (!fim) {
  console.log("========= Menu =========");
  console.log("informe a opção desejada:\n 1 - Adicionar um Piloto \n 2 - Adicionar Aeronave \n 3 - Adicionar Aerovia \n 4 - Listar Pilotos Ativos \n 5 - Listar Aeronaves \n 6 - Listar Aerovias \n 7 - Listar Pilotos Inativos \n 8 - Criar Plano de Voo \n 9 - Listar Altitudes Livres \n 10 - Listar um plano a partir do ID \n 11 - SAIR");
  //opções que vão de 1 a 8 que vão permitir cadastrar, e visualizar cada um dos itens.
  let opcao = prompt("Digite a opção desejada: ");
  switch (opcao) {
    case "1":
      console.log("========= Adicionar Piloto =========");
      let mat = prompt("Digite a Matricula do piloto: ");
      let nome = prompt("Digite o nome do piloto: ");
      let hab = prompt("Digite se o piloto está habilitado S/N: ");
      let habilitacaoAtiva = hab.toUpperCase() === "S" ? true : false;

      if (ServicoPilotosAtivos.existePiloto(mat)) {
        console.log(`Esta matrícula ${mat} já existe, cadastro cancelado!`);
      } else {
        let novoPiloto = new piloto(ServicoPilotosAtivos);
        if (habilitacaoAtiva) {
          novoPiloto.addPilot({ matricula: mat, nome: nome, habilitacaoAtiva: true });
        } else {
          ServicoPilotosInativos.push([mat, nome, hab]);
        }
        console.log("Piloto cadastrado com sucesso!");
      }
      break;

    case "2":
      console.log("========= Adicionar Aeronave =========");
      let oa = prompt("Digite o tipo de aeronave desejado: \n 1 - Particular\n 2 - Carga\n 3 - Passageiros \n digite a opção desejada: ");
      if (oa === "1") {
        let prefixo = prompt("Digite o prefixo da aeronave: ");
        let velocidade = Number(prompt("Digite a velocidade de Cruzeiro da aeronave: "));
        let autonomia = Number(prompt("Digite a autonomia da aeronave: "));
        let manutencao = prompt("Digite o nome do responsável pela manutenção: ");
        let novaAeronave = new aeronaveParticular(prefixo, velocidade, autonomia, manutencao);
        ServicoAeronaves.addAeronave(novaAeronave);
        avioes.push(novaAeronave)
        console.log("Aeronave Particular cadastrada com Sucesso!");
      } else if (oa === "2") {
        let prefixo = prompt("Digite o prefixo da aeronave: ");
        let velocidade = Number(prompt("Digite a velocidade de Cruzeiro da aeronave: "));
        let autonomia = Number(prompt("Digite a autonomia da aeronave: "));
        let nomeCIA = prompt("Digite o nome da CIA Aerea: ");
        let carga = Number(prompt("Digite o Peso máximo de carga: "));
        let novaAeronave = new aeronaveCarga(prefixo, velocidade, autonomia, nomeCIA, carga);
        ServicoAeronaves.addAeronave(novaAeronave);
        avioes.push(novaAeronave)
        console.log("Aeronave Carga cadastrada com Sucesso!");

      } else if (oa === "3") {
        let prefixo = prompt("Digite o prefixo da aeronave: ");
        let velocidade = Number(prompt("Digite a velocidade de Cruzeiro da aeronave: "));
        let autonomia = Number(prompt("Digite a autonomia da aeronave: "));
        let nomeCIA = prompt("Digite o nome da CIA Aerea: ");
        let passageiros = Number(prompt("Digite o Numero máximo de Passageiros: "));
        let novaAeronave = new aeronavePassageiros(prefixo, velocidade, autonomia, nomeCIA, passageiros)
        ServicoAeronaves.addAeronave(novaAeronave);
        avioes.push(novaAeronave)
        console.log("Aeronave de passageiros adicionada com sucesso");
      } else {
        console.log("###Tipo de aeronave inválido, opção encerrada### ")
      }
      break;


    case "3":
      console.log("========= Adicionar Aerovia =========");
      let id = prompt("Digite o ID da Aerovia: ");
      let origem = prompt("Digite a origem da Aerovia: ");
      let destino = prompt("digite o Destino da Aerovia: ");
      let tamanho = Number(prompt("Digite o Tamanho da Aerovia em KM: "));
      let novaAerovia = new aerovia(id, origem, destino, tamanho)
      ServicoAerovias.addAerovia(novaAerovia);
      ocupacaoAerovia.addAerovias([novaAerovia]);
      console.log("Aerovia adicionada com sucesso");
      break;


    case "4":
      console.log("========= Listar Pilotos Ativos =========");
      if (ServicoPilotosAtivos.pilotos.length === 0) {
        console.log(" ### Sem Pilotos Ativos ### ")
      } else {
        console.log(ServicoPilotosAtivos.pilotos)
      };
      break;


    case "5":
      console.log("========= Listar Aeronaves =========");
      if (ServicoAeronaves.aeronaves.length === 0) {
        console.log(" ### Sem Aeronaves Cadastradas ### ");
      } else {
        console.log(ServicoAeronaves.aeronaves)
      };
      break;

    case "6":
      console.log("========= Listar Aerovias =========");
      if (ServicoAerovias.aerovias.length === 0) {
        console.log(" ### Sem Aerovias cadastradas ###")
      } else {
        console.log(ServicoAerovias.aerovias)
      };
      break;


    case "7":
      console.log("========= Listar Pilotos Inativos =========");
      if (ServicoPilotosInativos.length === 0) {
        console.log(" ###Sem Pilotos inativos ###")
      } else {
        console.log(ServicoPilotosInativos)
      };
      break;


    case "8":
      console.log("========= Criando Plano de Voo =========");
      let idPlano = prompt("Digite o ID do Plano de Voo: ");
      let matPiloto = prompt("Digite a Matrícula do Piloto: ");
      let idAeroviaPlano = prompt("Digite o ID da Aerovia: ");
      let diaVoo = Number(prompt("Digite o Dia do Voo DD: "));
      let mesVoo = Number(prompt("Digite o Mês do Voo MM: "));
      let anoVoo = Number(prompt("Digite o Ano do Voo AAAA: "));
      let horaVoo = Number(prompt("Digite a Hora do Voo sem 0 à esquerda (1am = 1): "));
      let minutoVoo = Number(prompt("Digite o Minuto do Voo sem 0 à esquerda (1 minuto = 1): "));
      let altitudePlano = Number(prompt("Digite a Altitude do Plano de Voo: "));

      // Criando o novo plano de voo
      let planoNovo = new PlanoDeVoo(idPlano, matPiloto, idAeroviaPlano, new Date(anoVoo, mesVoo - 1, diaVoo, horaVoo, minutoVoo), altitudePlano, ServicoPilotosAtivos);


      let submeterPlano = prompt("Deseja submeter o plano de voo? S/N");
      if (submeterPlano.toUpperCase() === "S") {
        console.log("Verificando as aeronaves disponíveis");
        if (avioes.length === 0) {
          console.log(" ### Sem Aeronaves disponíveis ### ");
        } else {
          console.log("Aeronaves disponíveis:")
          avioes.forEach(aeronave => {
            console.log(`Prefixo: ${aeronave.prefixo}, Velocidade Cruzeiro: ${aeronave.velocidadeCruzeiro}, Autonomia: ${aeronave.autonomia}`);
          });
          let prefixoDesejada = prompt("Digite o prefixo da aeronave desejada: ");
          let aeronaveDesejada = avioes.find(aeronave => aeronave.prefixo === prefixoDesejada)
          if (aeronaveDesejada) {
            servicoPlanos.addPlano(planoNovo)
            let planoSubmetido = sistema.submeterPlanoDeVoo(planoNovo, aeronaveDesejada)
            if (planoSubmetido) {
              console.log("Plano de voo submetido com sucesso");
            } else {
              console.log("### Falha ao submeter o plano de voo ###");
            }
          }
        }
      } else {
        console.log("Aeronave não encontrada")
      }
      break;

    case "9":
      console.log("========= Listar Altitudes Livres =========");
      console.log("Escolha a Aeronave:");

      let aeronavesDisponiveis9 = ServicoAeronaves.aeronaves; // Renomeado para evitar conflito
      if (aeronavesDisponiveis9.length === 0) {
        console.log("### Sem Aeronaves Cadastradas ###");
      } else {
        console.log("Aeronaves disponíveis:");
        aeronavesDisponiveis9.forEach(aeronave => {
          console.log(aeronave);
        });

        let prefixoAeronaveSelecionada9 = prompt("Digite o prefixo da aeronave desejada: ");
        let aeronaveSelecionada9 = ServicoAeronaves.obterAeronave(prefixoAeronaveSelecionada9);
        if (aeronaveSelecionada9) {
          let idAeroviaAltitudes = prompt("Digite o ID da Aerovia: ");
          let diaAltitudes = Number(prompt("Digite o Dia DD: "));
          let mesAltitudes = Number(prompt("Digite o Mês MM: "));
          let anoAltitudes = Number(prompt("Digite o Ano AAAA: "));
          let horaAltitudes = Number(prompt("Digite a Hora HH sem 0 à esquerda (1am = 1): "));
          let minutoAltitudes = Number(prompt("Digite o Minuto MM sem 0 à esquerda (1 minuto = 1): "));

          let dataAltitudes = new Date(anoAltitudes, mesAltitudes - 1, diaAltitudes, horaAltitudes, minutoAltitudes);
          sistema.altitudesLivres(idAeroviaAltitudes, dataAltitudes);
        } else {
          console.log("Aeronave não encontrada.");
        }
      }
      break;





    case "10":
      console.log("========= Listar um Plano a partir do ID =========");
      let idplano = prompt("Digite o ID do Plano de Voo: ");
      sistema.listarPlanoPorNumero(idplano)
      break


    default:
      console.log("###Opção inválida. Por favor, escolha uma opção válida.###");
      break;

    case "11":
      fim = true;
      console.log("==== Programa Encerrado ==== ")
  };
};