import { servicoAerovias } from '../objetos/servicoAerovias';
import { aerovia } from '../objetos/aerovia';
//preparando aerovias
describe('servicoAerovias', () => {
  let service;

  beforeEach(() => {
    service = new servicoAerovias();
  });

  test('Deve adicionar uma aerovia à lista', () => {
    const novaAerovia = new aerovia("ID", "Origem", "Destono", 400);

    service.addAerovia(novaAerovia);

    expect(service.aerovias).toContain(novaAerovia.toString());
  });

  test('Deve lançar um erro ao tentar adicionar objeto inválido', () => {
    const objetoInvalido = { id: "ID002", nome: "NomeAerovia", localizacao: "LocalizaçãoAerovia" };

    expect(() => {
      service.addAerovia(objetoInvalido);
    }).toThrowError("Este objeto não é uma aerovia");
  });

  test('Deve verificar se uma aerovia existe pelo ID', () => {
    const aeroviaExistente = new aerovia("ID","Origem","Destono", 400);
    service.addAerovia(aeroviaExistente);

    const idAerovia = "ID";
    const existe = service.existeAerovia(idAerovia);

    expect(existe).toBe(true);
  });

  test('Deve retornar a aerovia correta pelo ID', () => {
    const aeroviaEncontrada = new aerovia("ID","Origem","Destono", 400);
    service.addAerovia(aeroviaEncontrada);

    const idAerovia = "ID";
    const aeroviaObtida = service.getAeroviaById(idAerovia);

    expect(aeroviaObtida.id).toBe(idAerovia);
    
  });

  test('Deve retornar undefined se a aerovia não existir pelo ID', () => {
    const idAerovia = "ID005";
    const aeroviaObtida = service.getAeroviaById(idAerovia);

    expect(aeroviaObtida).toBeUndefined();
  });
});
