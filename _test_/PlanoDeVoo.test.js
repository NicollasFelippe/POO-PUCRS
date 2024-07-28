import { PlanoDeVoo } from '../objetos/PlanoDeVoo';
//criando o necessário para o teste
describe('PlanoDeVoo', () => {
  let servicoPilotos;

  beforeEach(() => {
    servicoPilotos = {
      existePiloto: jest.fn(matricula => true) 
    };
  });

  test('Deve criar um plano de voo válido', () => {
    const data = new Date(2024, 10, 17, 15, 0); // 17 de novembro de 2024, 15:00
    const plano = new PlanoDeVoo("1", "102", "A001", data, 25000, servicoPilotos);

    expect(plano.id).toBe("1");
    expect(plano.matriculaPiloto).toBe("102");
    expect(plano.idAerovia).toBe("A001");
    expect(plano.data).toEqual(data);
    expect(plano.horario).toBe("15:0");
    expect(plano.altitude).toBe(25000);
    expect(plano.slots).toEqual([]);
    expect(plano.cancelado).toBe(true);
    expect(plano.servicoPiloto).toBe(servicoPilotos);
  });

  test('Deve lançar erro se o piloto não existir', () => {
    servicoPilotos.existePiloto = jest.fn(matricula => false); // Piloto não existe
    const data = new Date(2024, 10, 17, 15, 0);

    expect(() => {
      new PlanoDeVoo("1", "102", "A001", data, 25000, servicoPilotos);
    }).toThrowError("Piloto com matrícula 102 não encontrado.");
  });

  test('Deve adicionar e remover slots ocupados', () => {
    const data = new Date(2024, 10, 17, 15, 0);
    const plano = new PlanoDeVoo("1", "102", "A001", data, 25000, servicoPilotos);

    plano.adicionarSlotOcupado(1);
    expect(plano.slots).toContain(1);
    expect(plano.isSlotOcupado(1)).toBe(true);

    plano.removerSlotOcupado(1);
    expect(plano.slots).not.toContain(1);
    expect(plano.isSlotOcupado(1)).toBe(false);
  });

  test('Deve ativar o plano de voo', () => {
    const data = new Date(2024, 10, 17, 15, 0);
    const plano = new PlanoDeVoo("1", "102", "A001", data, 25000, servicoPilotos);

    plano.ativaPlano = true;
    expect(plano.cancelado).toBe(false);

    plano.ativaPlano = false;
    expect(plano.cancelado).toBe(true);
  });

  test('Deve retornar a representação correta do plano', () => {
    const data = new Date(2024, 10, 17, 15, 0);
    const plano = new PlanoDeVoo("1", "102", "A001", data, 25000, servicoPilotos);

    const expectedPlano = {
      id: "1",
      matriculaPiloto: "102",
      idAerovia: "A001",
      data: data,
      horario: "15:0",
      altitude: 25000,
      slots: [],
      cancelado: true,
      servicoPiloto: servicoPilotos
    };

    expect(plano.plano()).toEqual(expectedPlano);
  });

  test('Deve retornar a string correta do plano', () => {
    const data = new Date(2024, 10, 17, 15, 0);
    const plano = new PlanoDeVoo("1", "102", "A001", data, 25000, servicoPilotos);

    const expectedString = `Id: 1 Matricula: 102 Id Aerovia: A001 Data: ${data.toLocaleDateString()} Horario: 15:0 Altitude: 25000 Slots: ${[]} Cancelado: true`;
    expect(plano.toString()).toBe(expectedString);
  });
});
