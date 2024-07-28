import { aerovia } from '../objetos/aerovia.js';

describe('aerovia', () => {
  let aeroTeste;;

  beforeEach(() => {
    // Parâmetros para instanciar aeroTeste
    const id = 'ID_TEST';
    const origem = "PORTO_ALEGRE";
    const destino = "Santa_Catarina";
    const tamano = 400;

    // Instanciando aeroTeste com os parâmetros definidos
      aeroTeste = new aerovia(id, origem, destino, tamano);
  });

  test('Verificando as entradas e os getter da classe aerivua', () => {
    expect(aeroTeste.id).toBe('ID_TEST');
    expect(aeroTeste.origem).toBe("PORTO_ALEGRE");
    expect(aeroTeste.destino).toBe("Santa_Catarina");
    expect(aeroTeste.tamanho).toBe(400);

  });

  test('Deve lançar um erro quando os parâmetros são inválidos', () => {
    expect(() => {
      // Tentando instanciar aerovia com parâmetros inválidos
      new aerovia(null, "PORTO_ALEGRE", "Santa_Catarina", 400);
    }).toThrowError(new Error("Argument #0: expected string but got null"));

    expect(() => {
      new aerovia('ID_TEST', null, "Santa_Catarina", 400);
    }).toThrowError(new Error("Argument #1: expected string but got null"));

    expect(() => {
      new aerovia('ID_TEST', "PORTO_ALEGRE", null, 400);
    }).toThrowError(new Error("Argument #2: expected string but got null"));

    expect(() => {
      new aerovia('ID_TEST', "PORTO_ALEGRE", "Santa_Catarina", null);
    }).toThrowError(new Error("Argument #3: expected number but got null"));
  });
});
