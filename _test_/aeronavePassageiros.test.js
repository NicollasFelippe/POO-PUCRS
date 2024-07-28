import { aeronavePassageiros } from "../objetos/aeronavePassageiros.js";

describe('aeropassageiros', () => {
  let aeropassageiros;

  beforeEach(() => {
    // Parâmetros para instanciar aeropassageiros
    const prefixo = 'ABC123';
    const velocidadeCruzeiro = 800;
    const autonomia = 3000;
    const nomeCIA = "TAM";
    const maxPassageiros = 150

    // Instanciando aeropassageiros com os parâmetros definidos
          aeropassageiros = new aeronavePassageiros(prefixo, velocidadeCruzeiro, autonomia, nomeCIA,maxPassageiros );
  });

  test('Verificando as entradas e os getter da classe aeronaveCarga', () => {

    expect(aeropassageiros.prefixo).toBe('ABC123');
    expect(aeropassageiros.velocidadeCruzeiro).toBe(800);
    expect(aeropassageiros.autonomia).toBe(3000);
    expect(aeropassageiros.nomeCIA).toBe("TAM");
    expect(aeropassageiros.maxPassageiros).toBe(150);

  });

  test('Deve lançar um erro quando os parâmetros são inválidos', () => {
    expect(() => {
      // Tentando instanciar Aeronave Particular com parâmetros inválidos
      new aeronavePassageiros(null, 800, 3000, "TAM", 150);
    }).toThrowError(new Error("Argument #0: expected string but got null"));

    expect(() => {
      new aeronavePassageiros('ABC123', null, 3000, "TAM", 150);
    }).toThrowError(new Error("Argument #1: expected number but got null"));

    expect(() => {
      new aeronavePassageiros('ABC123', 800, null, "TAM", 150);
    }).toThrowError(new Error("Argument #2: expected number but got null"));

    expect(() => {
      new aeronavePassageiros('ABC123', 800, 3000, null, 150);
    }).toThrowError(new Error("Argument #3: expected string but got null"));
  });


});
