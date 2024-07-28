import { typedef, validate } from "bycontract";
import { error } from "console";
import promptsync from "prompt-sync";

const prompt = promptsync({ sigint: true });


//Aqui abaixo você encontra a execução do código linha a linha de uma maneira "hard code" para entender melhor as classes
// Por favor comente o trecho de código que inicia na linha 80 para ter uma melhor experiência se deseja utilizar o "hard code"

// EXEMPLO DE USO ADICIONANDO PILOTOS E DEPOIS COLOCANDO ELES NA CLASSE DE PILOTOS:

//importando os pilotos
import { piloto } from "./objetos/piloto.js";;

// importando a classe de servicoPiloto
import { ServicoPiloto } from "./objetos/servicoPiloto.js";
//criando o servico Piloto
const servicoPilotos = new ServicoPiloto();

//criando os pilotos passando como parametro SerivoPilto, o mesmo agora é um singleton
const p1 = new piloto(servicoPilotos);
const p2 = new piloto(servicoPilotos);
//const p3 = new piloto(ServicoPiloto); //<- Piloto que ocasionará um erro na linha 29

//adicionando os pilotos
p1.addPilot({ matricula: "101", nome: "João", habilitacaoAtiva: true });
p2.addPilot({ matricula: "102", nome: "Nicollas", habilitacaoAtiva: true });
//p3.addPilot({ matricula: "103", nome: "Bruna", habilitacaoAtiva: false });// <- receberá mensagem de erro ao tentar introduzir na lista

// imprimindo a lista de pilotos da classe de serviço de pilotos
console.log(servicoPilotos.pilotos)

//=============================================================================================

//Exemplo de uso da classe Aeronave e suas extensões sendo importada
import { aeronaveParticular } from "./objetos/aeronaveParticular.js";
//Cria a aerona particular que tem como propriedade adicional quem fez a manutenção
let aParticular = new aeronaveParticular("A112", 1500, 3301, "João");//
//console.log(aParticular.toString()) //<- imprime os dados da aeronave

//Cria a aeronave de carga que extende aeronave comercial e recebe a CIA e a capacidade de carga e importando
import { aeronaveCarga } from "./objetos/aeronaveCarga.js";
let ACA = new aeronaveCarga("A112", 1000, 3400,"TAM", 2000);
//console.log(ACA.toString()) //<- Impre os dados da aeronave

//Cria a aeronave de passageiros que extende aeronave comercial, e recebe a CIA e Cap Passageiros e importando
import { aeronavePassageiros } from "./objetos/aeronavePassageiros.js";
let aPassageiros = new aeronavePassageiros("A112", 2000, 3301,"TAM", 200);
//console.log(aPassageiros.toString()) // <- Imprime os dados da aeronave


//Exemplo de uso da classe servicoAeronaves e sua importação 
import { servicoAeronaves } from "./objetos/servicoAeronaves.js";
let sa = new servicoAeronaves();
sa.addAeronave(ACA);
sa.addAeronave(aPassageiros);
sa.addAeronave(aParticular);
console.log(sa.aeronaves); // <-- Imprime as aeronaves cadastradas

//==============================================================================================

//Exemplo de uso da classe aerovia e importação para uso
import { aerovia } from "./objetos/aerovia.js";
let aero = new aerovia('BR1', 'Brasilia', 'Rio de Janeiro', 4000.12);
let aero2 = new aerovia('BR2', 'POA', 'São Paulo', 3000);
//console.log(aero.toString()) // <- Imprime os dados da aerovia  
//console.log(aero2.toString()) // <- Imprime os dados da aerovia

//exemplo de uso servicoAerovia e sua importação para uso:
import { servicoAerovias } from "./objetos/servicoAerovias.js";
let aeroservice = new servicoAerovias(); // - cria uma lista do servicoAerovia;
aeroservice.addAerovia(aero);   //Adiciona a via ao servicoAerovia
aeroservice.addAerovia(aero2); //Adciona a Via ao servicoAerovia
console.log(aeroservice.aerovias);  // Printa a lista de aerovias

//================================================================================================
//importando o plano de voo
import { PlanoDeVoo } from "./objetos/PlanoDeVoo.js";
const plano = new PlanoDeVoo(
  "1",             // ID do plano
  "102",           // Matrícula do piloto
  "BR1",           // ID da aerovia
  new Date(2024, 11, 17, 15, 0), // Objeto Date contendo ano, mês, dia, hora, minuto
  25000,           // Altitude
  servicoPilotos   // Serviço de pilotos
);
const plano2 = new PlanoDeVoo(
  "2",             // ID do plano
  "101",           // Matrícula do piloto
  "BR2",           // ID da aerovia
  new Date(2024, 10, 16, 11, 0), // Objeto Date contendo ano, mês, dia, hora, minuto
  29000,           // Altitude
  servicoPilotos   // Serviço de pilotos
);
const plano3 = new PlanoDeVoo(
  "3",             // ID do plano
  "101",           // Matrícula do piloto
  "BR2",           // ID da aerovia
  new Date(2024, 11, 15, 10, 0), // Objeto Date contendo ano, mês, dia, hora, minuto
  25000,           // Altitude
  servicoPilotos   // Serviço de pilotos
);

//importante a classe servico Planos
import { ServicoPlanos } from "./objetos/ServicoPlanos.js";
//Adicionando e imprimindo os planos de voo
const servicoPlanos = new ServicoPlanos();
//adicionando plano de voo recebendo o proprio plano
servicoPlanos.addPlano(plano);
servicoPlanos.addPlano(plano2);
servicoPlanos.addPlano(plano3);

//imprimindo TODOS planos de voo cadastrados
console.log(servicoPlanos.planos);
//imprimindo um UNICO servico de planos de voo pelo ID do plano

console.log(servicoPlanos.existePlano("2"));

//criando a ocupacao
import { OcupacaoAerovia } from "./objetos/OcupacaoAerovia.js";
const ocupacaoAerovia = new OcupacaoAerovia();

//adicionando as aerovias a ocupacao de aerovias
ocupacaoAerovia.addAerovias([aero, aero2]);

// Ocupando a aerovia com o plano de voo
ocupacaoAerovia.ocupando(plano.plano());
ocupacaoAerovia.ocupando(plano2.plano());
//ocupacaoAerovia.ocupando(plano3.plano());

// Verificando ocupação das aerovias após adicionar os planos de voo - Lembrando que a ocupação da aerovia não diz que o Voo esta autoriza.
console.log(JSON.stringify(ocupacaoAerovia.getOcupacao(), null, 2)); 

// verifica se a aerovia esta ocupada - retornara false pois br2 esta ocupada nos planos de voo com outras datas
console.log(ocupacaoAerovia.isocupado("BR2", new Date(1995, 11, 17, 11, 0), 25000, 1)); 

// Verificando altitudes livres não aparecerá os 2500 pos já esta "reservado" para um plano de voo
console.log(ocupacaoAerovia.altitudesLivres("BR1", new Date(2024, 11, 17, 15, 0)));

// Ocupando uma altitude que deve retornar true se a ocupação for bem-sucedida - utilizando uma data onde não há "reservas" para essa aerovia
console.log(ocupacaoAerovia.ocupa("BR1", new Date(1995, 11, 17, 11, 0), 27000, 2));

// Verificando se uma altitude está ocupada - Deve retornar true se a altitude estiver ocupada
console.log(ocupacaoAerovia.isocupado("BR1", new Date(1995, 11, 17, 11, 0), 27000, 2)); 
//=============================================================================================================

// importando e atribuindo a classe sistemas

import { Sistema } from "./objetos/Sistema.js";
const sistema = new Sistema(aeroservice, servicoPilotos, sa, servicoPlanos, ocupacaoAerovia );

//utilizando o método listar aerovias que foi injetado na classe sistema (criterio 1)
sistema.listarAerovias();

//utilizando o método altitudes livres que foi injetado na classe sistema (creitério 2)
sistema.altitudesLivres(aero.id, new Date(2024, 11, 17, 15, 0));

// submetendo um plano de voo - aprovará pois a autonomia da nave é 10% maior que o tamanho da aerovia (critério 3)
sistema.submeterPlanoDeVoo(plano3, aParticular);

//sistema.submeterPlanoDeVoo(plano2, ACA) - // vai recusar o plano de voo pelo horario

//sistema.submeterPlanoDeVoo(plano2, aParticular) //Recusa, altitude é maior do que a aeronave particular pode voar

//sistema.submeterPlanoDeVoo(plano3, aPassageiros) // recusa, deve voar apena acima de 28 mil pes

//listar um plano a partir do número do plano (critério 4)
sistema.listarPlanoPorNumero("3");