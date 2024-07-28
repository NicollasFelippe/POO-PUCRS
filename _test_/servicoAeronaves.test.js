import { servicoAeronaves } from '../objetos/servicoAeronaves';
import { aeronaveCarga } from '../objetos/aeronaveCarga';
//preparando o servico
describe('servicoAeronaves', () => {
  let service;

  beforeEach(() => {
    service = new servicoAeronaves();
  });

  test('Deve adicionar uma aeronave à lista', () => {
    const novaAeronave = new aeronaveCarga("Prefixo123", 1000, 3300, "Nome CIA", 5000);

    service.addAeronave(novaAeronave);

    expect(service.aeronaves).toContain(novaAeronave.toString());
  });

  test('Deve lançar um erro ao tentar adicionar objeto inválido', () => {
    const objetoInvalido = { prefixo: "Prefixo456", modelo: "Modelo2", capacidade: 150 };

    expect(() => {
      service.addAeronave(objetoInvalido);
    }).toThrowError("Este objeto não é uma aeronave");
  });

  test('Deve verificar se uma aeronave existe pelo prefixo', () => {
    const aeronaveExistente = new aeronaveCarga("Prefixo789", 1000, 3300, "Nome CIA", 5000);
    service.addAeronave(aeronaveExistente);

    const prefixo = "Prefixo789";
    const existe = service.verificarAeronave(prefixo);

    expect(existe).toBe(true);
  });

  test('Deve retornar null se a aeronave não existir pelo prefixo', () => {
    const prefixo = "Prefixo789";
    const aeronaveObtida = service.obterAeronave(prefixo);

    expect(aeronaveObtida).toBeNull();
  });
});
