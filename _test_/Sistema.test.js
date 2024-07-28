import { Sistema } from "../objetos/Sistema";
import { ServicoPiloto } from "../objetos/servicoPiloto";
import { aeronaveParticular } from "../objetos/aeronaveParticular.js";
import { PlanoDeVoo } from "../objetos/PlanoDeVoo.js";
import { piloto } from "../objetos/piloto.js";
import { ServicoAeronaves } from "../objetos/servicoAeronaves";
import {servicoAerovias}     from "../objetos/servicoAerovias.js"
import { OcupacaoAerovia } from '../objetos/OcupacaoAerovia.js';
import { ServicoPlanos } from '../objetos/ServicoPlanos.js'

// Criando os mocks
describe('Sistema', () => {
  let sistema;
  let mockServicoAerovias;
  let mockServicoPilotos;
  let mockServicoAeronaves;
  let mockServicoPlanos;
  let mockOcupacaoAerovia;
  //simulando o que deve ser testado com as ferramentas do jest
  beforeEach(() => {
    mockServicoAerovias = {
      aerovias: [{ id: 'A1', tamanho: 1000 }],
      getAeroviaById: jest.fn().mockReturnValue({ id: 'A1', tamanho: 1000 })
    };

    mockServicoPilotos = new ServicoPiloto();
    jest.spyOn(mockServicoPilotos, 'existePiloto').mockReturnValue(true);

    mockServicoAeronaves = {
      verificarAeronave: jest.fn().mockReturnValue(true),
      obterAeronave: jest.fn().mockReturnValue({ prefixo: 'ABCD', velocidadeCruzeiro: 500, autonomia: 1500 })
    };

    mockServicoPlanos = new ServicoPlanos();
    jest.spyOn(mockServicoPlanos, 'addPlano').mockImplementation(() => {});

    mockOcupacaoAerovia = new OcupacaoAerovia();
    jest.spyOn(mockOcupacaoAerovia, 'isAltitudeLivre').mockReturnValue(true);
    jest.spyOn(mockOcupacaoAerovia, 'ocupa').mockImplementation(() => {});
    jest.spyOn(mockOcupacaoAerovia, 'altitudesLivres').mockReturnValue([25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000]);
    sistema = new Sistema(mockServicoAerovias, mockServicoPilotos, mockServicoAeronaves, mockServicoPlanos, mockOcupacaoAerovia);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('deve listar todas as aerovias', () => {
    console.log = jest.fn();

    sistema.listarAerovias();

    expect(console.log).toHaveBeenCalledWith("Lista de Aerovias:");
    expect(console.log).toHaveBeenCalledWith({ id: 'A1', tamanho: 1000 });
  });

  test('deve retornar altitudes livres', () => {
    const altitudes = sistema.altitudesLivres('A1', new Date());

    expect(altitudes).toEqual([25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000]);
  });

  test('deve submeter um plano de voo', () => {
    const planoDeVoo = new PlanoDeVoo('P1', 'P123', 'A1', new Date(), 30000, mockServicoPilotos);
    const aeronave = { prefixo: 'ABCD', velocidadeCruzeiro: 500, autonomia: 1500, instanceof: jest.fn().mockReturnValue(false) };

    const resultado = sistema.submeterPlanoDeVoo(planoDeVoo, aeronave);

    expect(resultado).toEqual('P1');
    expect(mockServicoPlanos.addPlano).toHaveBeenCalledWith(planoDeVoo);
    expect(mockOcupacaoAerovia.ocupa).toHaveBeenCalled();
  });

  test('deve listar um plano de voo por número', () => {
    const planoDeVoo = new PlanoDeVoo('P1', 'P123', 'A1', new Date(), 30000, mockServicoPilotos);
    jest.spyOn(mockServicoPlanos, 'findPlano').mockReturnValue(planoDeVoo);
    console.log = jest.fn();

    sistema.listarPlanoPorNumero('P1');

    expect(console.log).toHaveBeenCalledWith(`Plano de Voo ID: ${planoDeVoo.id}`);
    expect(console.log).toHaveBeenCalledWith(`Piloto: ${planoDeVoo.matriculaPiloto}`);
    expect(console.log).toHaveBeenCalledWith(`Aeronave: ${planoDeVoo.idAerovia}`);
    expect(console.log).toHaveBeenCalledWith(`Data M/D/Y: ${planoDeVoo.data.toLocaleDateString()}`);
    expect(console.log).toHaveBeenCalledWith(`Horário: ${planoDeVoo.horario}`);
    expect(console.log).toHaveBeenCalledWith(`Altitude: ${planoDeVoo.altitude}`);
    expect(console.log).toHaveBeenCalledWith(`Slots de Horário: ${planoDeVoo.slots}`);
    expect(console.log).toHaveBeenCalledWith(`Cancelado: ${planoDeVoo.cancelado}`);
  });
});