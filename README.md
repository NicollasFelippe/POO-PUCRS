
# Programação Orientada a Objetos (POO)

Este projeto foi desenvolvido para a cadeira de Programação Orientada a Objetos da PUC-RS
no curso de Análise e desenvolvimento de sistemas: Full-stack e Mobile.

Este projeto implementa um sistema de gerenciamento de planos de voo para uma rede de aerovias, verificando a disponibilidade de altitudes e horários, e considerando as restrições específicas de diferentes tipos de aeronaves.

## Tecnologias utilizadas
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)


## Estrutura do Projeto 📂
O projeto é composto por várias classes que representam diferentes entidades e funcionalidades do sistema:

- Piloto: Representa os pilotos.
- Aeronave: Representa aeronaves e suas subclasses (Particular, Passageiros, Carga).
- Aerovia: Representa as rotas aéreas.
- PlanoDeVoo: Representa os planos de voo.
- OcupacaoAerovia: Gerencia a ocupação das aerovias em termos de altitudes e horários.
- Serviço Piloto: Singleton que guarda os pilotos.
- Serviço Aeronave: Guarda as Aeronaves.
- Servico Aerovia: Guarda as Aerovias 
- Serviço Plano: Singleton que guarda os planos de Voo
- Sistema: Integra todos os serviços e gerencia a lógica de negócios.


## Classes e Principais Métodos  📈

### Piloto 👨‍✈️
> addPilot: coloca o piloto no serviço de pilotos.

> habilitacaoAtiva: Verifica se a habilitação do piloto está ativa.

### Aeronave ✈️

> aeronaveParticular: Representa uma aeronave particular que herda as características comuns de Aeronave e recebe mais um responsável pela manutenção.

> aeronavePassageiros: Representa uma aeronave de passageiros que herda as características comuns de Aeronave e recebe mais uma capacidade maxima de passageiros.

> aeronaveCarga: Representa uma aeronave de carga que herda as características comuns de Aeronave e recebe mais uma capacidade maxima de peso em KG.

### Aerovia 🛣️
> aerovia: Representa uma rota aérea, com origem, destino e tamanho.

### PlanoDeVoo 📆
PlanoDeVoo: Representa um plano de voo com ID, matrícula do piloto, ID da aerovia, data, altitude e slots de horário.

isSlotOcupado- Verifica se um determinado slot de horário está ocupado.


### OcupacaoAerovia 📌
addAerovias: Adiciona aerovias ao sistema de ocupação.

ocupando: Ocupa uma aerovia com um plano de voo.

isocupado: Verifica se uma aerovia está ocupada.

altitudesLivres: Retorna as altitudes livres em uma aerovia para uma data específica.

ocupa: Ocupa uma altitude específica em uma aerovia.

getOcupacao: Retorna a ocupação atual das aerovias.

isAltitudeLivre: Verifica se uma altitude está livre para um horário específico.

### Serviço Piloto 📝👨‍✈️
addPiloto - Adiciona um piloto ao serviço de pilotos ativos.

## Serviço Aeronave 📝✈️
addAeronave: adiciona uma aeronave a lista criada.

verificarAeronave: Verifica se a Aeronave esta na lista pelo Prefixo.

obterAeronave: Verifica se Aeronave já foi criada.

## Serviço Aerovia 📝🛣️
addAerovia: Adiciona Aerovia a lista.

existeAerovia: Verifica se existe uma aerovia pelo ID.

getAeroviaById: Retorna a aerovia pelo ID.

## Serviço Plano 📝📆
existePlano: Verifica se existe um plano com o ID passado.

findPlano: Busca um plano pelo ID e retorno o plano.

### Sistema 💻
listarAerovias: Lista todas as aerovias.

altitudesLivres: Lista as altitudes livres de uma aerovia em uma data específica.

submeterPlanoDeVoo: Submete um plano de voo, verificando todas as restrições e ocupações.

listarPlanoPorNumero: Lista um plano de voo por seu ID.

## Exemplos de uso 📋

```javascript
// Importe as classes
import { classe } from "./objetos/classe.js";

// Criação dos serviços
const servicoPilotos = new ServicoPiloto();
const sa = new servicoAeronaves();
const aeroservice = new servicoAerovias();
const servicoPlanos = new ServicoPlanos();
const ocupacaoAerovia = new OcupacaoAerovia();

// Criação dos pilotos
const p1 = new piloto(servicoPilotos);
p1.addPilot({ matricula: "101", nome: "João", habilitacaoAtiva: true });

// Criação das aeronaves
let aParticular = new aeronaveParticular("A112", 1500, 3301, "João");
let ACA = new aeronaveCarga("A112", 1000, 3400, "TAM", 2000);
let aPassageiros = new aeronavePassageiros("A112", 2000, 3301, "TAM", 200);

// Adicionando aeronaves ao serviço
sa.addAeronave(ACA);
sa.addAeronave(aPassageiros);
sa.addAeronave(aParticular);

// Criação das aerovias
let aero = new aerovia('BR1', 'Brasilia', 'Rio de Janeiro', 4000.12);
let aero2 = new aerovia('BR2', 'POA', 'São Paulo', 3000);
aeroservice.addAerovia(aero);
aeroservice.addAerovia(aero2);

// Criação dos planos de voo
const plano = new PlanoDeVoo(
  "1",             // ID do plano
  "102",           // Matrícula do piloto
  "BR1",           // ID da aerovia
  new Date(2024, 11, 17, 15, 0), // Objeto Date contendo ano, mês, dia, hora, minuto
  25000,           // Altitude
  servicoPilotos   // Serviço de pilotos
);
const plano2 = new PlanoDeVoo("2", "101", "BR2", new Date(2024, 10, 16, 11, 0), 29000, servicoPilotos);
const plano3 = new PlanoDeVoo("3", "101", "BR2", new Date(2024, 11, 15, 10, 0), 25000, servicoPilotos);

// Adicionando planos de voo ao serviço
servicoPlanos.addPlano(plano);
servicoPlanos.addPlano(plano2);
servicoPlanos.addPlano(plano3);

// Adicionando aerovias à ocupação
ocupacaoAerovia.addAerovias([aero, aero2]);

// Ocupando aerovias com planos de voo
ocupacaoAerovia.ocupando(plano.plano());
ocupacaoAerovia.ocupando(plano2.plano());

// Verificando ocupação das aerovias
console.log(JSON.stringify(ocupacaoAerovia.getOcupacao(), null, 2));

// Verificando altitudes livres
console.log(ocupacaoAerovia.altitudesLivres("BR1", new Date(2024, 11, 17, 15, 0)));

// Ocupando uma altitude específica
console.log(ocupacaoAerovia.ocupa("BR1", new Date(1995, 11, 17, 11, 0), 27000, 2));

// Criando o sistema e integrando os serviços
const sistema = new Sistema(aeroservice, servicoPilotos, sa, servicoPlanos, ocupacaoAerovia);

// Listando aerovias
sistema.listarAerovias();

// Listando altitudes livres
sistema.altitudesLivres(aero.id, new Date(2024, 11, 17, 15, 0));

// Submetendo um plano de voo
sistema.submeterPlanoDeVoo(plano3, aParticular);

// Listando um plano de voo por ID
sistema.listarPlanoPorNumero("3");
```

## Executando o Projeto ⏯
    1. Certifique-se de ter o Node.js instalado.
    2. Clone este repositório.
    3. Navegue até o diretório do projeto.
    4. Execute npm install para instalar as dependências.
    5. Execute node index.js para iniciar o sistema.


## Testes Unitários 💬
O projeto inclui testes unitários para garantir que todas as funcionalidades estejam funcionando corretamente. Os testes foram escritos utilizando a biblioteca Jest.

    1. Instale as dependências do projeto, incluindo o Jest: 
    npm install

    2. Execute os testes:
    npm test