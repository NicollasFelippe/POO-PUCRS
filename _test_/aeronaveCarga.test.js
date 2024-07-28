import { aeronaveCarga } from '../objetos/aeronaveCarga.js';

describe('aeronaveCarga', () => {
  let aeronaveCargaTeste;

  beforeEach(() => {
    // Parâmetros para instanciar aeronaveCarga
    const prefixo = 'ABC123';
    const velocidadeCruzeiro = 800;
    const autonomia = 3000;
    const nomeCIA = "TAM";
    const pesoMax = 500;

    // Instanciando aeronaveCarga com os parâmetros definidos
    aeronaveCargaTeste = new aeronaveCarga(prefixo, velocidadeCruzeiro, autonomia, nomeCIA, pesoMax);
  });

  test('Verificando as entradas e os getter da classe aeronaveCarga', () => {
    expect(aeronaveCargaTeste.prefixo).toBe('ABC123');
    expect(aeronaveCargaTeste.velocidadeCruzeiro).toBe(800);
    expect(aeronaveCargaTeste.autonomia).toBe(3000);
    expect(aeronaveCargaTeste.nomeCIA).toBe("TAM");
    expect(aeronaveCargaTeste.pesoMax).toBe(500);
  });

  test('Deve lançar um erro quando os parâmetros são inválidos', () => {
    expect(() => {
      // Tentando instanciar aeronaveCarga com parâmetros inválidos
      new aeronaveCarga(null, 800, 3000, "TAM", 500);
    }).toThrowError(new Error("Argument #0: expected string but got null"));

    expect(() => {
      new aeronaveCarga('ABC123', null, 3000, "TAM", 500);
    }).toThrowError(new Error("Argument #1: expected number but got null"));

    expect(() => {
      new aeronaveCarga('ABC123', 800, null, "TAM", 500);
    }).toThrowError(new Error("Argument #2: expected number but got null"));

    expect(() => {
      new aeronaveCarga('ABC123', 800, 3000, null, 500);
    }).toThrowError(new Error("Argument #3: expected string but got null"));

    expect(() => {
      new aeronaveCarga('ABC123', 800, 3000, "TAM", null);
    }).toThrowError(new Error("Argument #4: expected number but got null"));
  });
});
