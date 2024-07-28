import { aeronaveParticular } from "../objetos/aeronaveParticular.js";

describe('aeronaveParticular', () => {
  let aeronaveP;

  beforeEach(() => {
    // Parâmetros para instanciar Aeronave Particular
    const prefixo = 'ABC123';
    const velocidadeCruzeiro = 800;
    const autonomia = 3000;
    const respManutencao = "Fulano";


    // Instanciando Aeronave Particular com os parâmetros definidos
        aeronaveP = new aeronaveParticular(prefixo, velocidadeCruzeiro, autonomia, respManutencao);
  });

  test('Verificando as entradas e os getter da classe aeronaveCarga', () => {
    
    expect(aeronaveP.prefixo).toBe('ABC123');
    expect(aeronaveP.velocidadeCruzeiro).toBe(800);
    expect(aeronaveP.autonomia).toBe(3000);
    expect(aeronaveP.respManutencao).toBe("Fulano");
    
  });

  test('Deve lançar um erro quando os parâmetros são inválidos', () => {
    expect(() => {
      // Tentando instanciar Aeronave Particular com parâmetros inválidos
      new aeronaveParticular(null, 800, 3000, "Fulano");
    }).toThrowError(new Error("Argument #0: expected string but got null"));

    expect(() => {
      new aeronaveParticular('ABC123', null, 3000, "Fulano");
    }).toThrowError(new Error("Argument #1: expected number but got null"));

    expect(() => {
      new aeronaveParticular('ABC123', 800, null, "Fulano");
    }).toThrowError(new Error("Argument #2: expected number but got null"));

    expect(() => {
      new aeronaveParticular('ABC123', 800, 3000, null);
    }).toThrowError(new Error("Argument #3: expected string but got null"));
  });

  
});
