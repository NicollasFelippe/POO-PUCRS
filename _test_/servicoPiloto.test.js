import { ServicoPiloto } from '../objetos/servicoPiloto';
import { piloto } from '../objetos/piloto';

describe('ServicoPiloto', () => {
  let service;

  beforeEach(() => {
    // Resetando a instância estática antes de cada teste
    ServicoPiloto.instance = null;
    service = new ServicoPiloto();
  });

  test('Deve adicionar um piloto à lista', () => {
    const novoPiloto = new piloto(service);
    novoPiloto.addPilot({ matricula: "101", nome: "João", habilitacaoAtiva: true });

    expect(service.pilotos).toContain(novoPiloto.toString());
  });


  test('Deve lançar um erro ao tentar adicionar piloto com matrícula duplicada', () => {
    const p1 = new piloto(service);
    const p2 = new piloto(service);

    // Adicionando os pilotos
    p1.addPilot({ matricula: "101", nome: "João", habilitacaoAtiva: true });
    expect(() => {
      p2.addPilot({ matricula: "101", nome: "Nicollas", habilitacaoAtiva: true });
    }).toThrowError(`Piloto com matrícula 101 já existe no serviço.`);
  });



  test('Deve lançar um erro ao tentar adicionar objeto inválido', () => {
  const objetoInvalido = { matricula: "103", nome: "NomePiloto", habilitacaoAtiva: "Ativa" };

  expect(() => {
    service.addPiloto(objetoInvalido);
    }).toThrowError("Algo deu errado, você tem certeza que está tentando cadastrar um piloto?");
  });


  
  
  test('Deve verificar se piloto existe pela matrícula', () => {
    const pilotoExistente = new piloto(service);
    pilotoExistente.addPilot({ matricula: "101", nome: "Nicollas", habilitacaoAtiva: true });

    const existe = service.existePiloto("101");
    expect(existe).toBe(true);
  });

  test('Deve retornar false se piloto não existe pela matrícula', () => {
    const matriculaPiloto = "105";
    const existe = service.existePiloto(matriculaPiloto);
    expect(existe).toBe(false);
  });

  test('Deve garantir que seja criada apenas uma instância de ServicoPiloto', () => {
    const service1 = new ServicoPiloto();
    const service2 = new ServicoPiloto();
    expect(service1).toBe(service2);
    });
  });
