import { ServicoPlanos } from '../objetos/ServicoPlanos';
import { PlanoDeVoo } from '../objetos/PlanoDeVoo';
import { ServicoPiloto } from '../objetos/servicoPiloto';
import { piloto } from '../objetos/piloto'
describe('ServicoPlanos', () => {
  let servicoPlanos;
  let servicoPiloto;
  let Piloto1;
  beforeEach(() => {
    // Resetando a instância estática antes de cada teste
    ServicoPlanos.instance = null;
    ServicoPiloto.instance = null;
    // criando as dependências
    servicoPlanos = new ServicoPlanos();
    servicoPiloto = new ServicoPiloto();
    Piloto1 = new piloto(servicoPiloto);
  });

  test('Deve adicionar um plano de voo à lista', () => {
      Piloto1.addPilot({ matricula: "102", nome: "Nicollas", habilitacaoAtiva: true });
    const novoPlano = new PlanoDeVoo("1","102","BR1",new Date(2024, 11, 17, 15, 0),25000, servicoPiloto);
    servicoPlanos.addPlano(novoPlano);

    expect(servicoPlanos.planos).toContain(novoPlano.toString());
  });

  test('Deve lançar um erro ao tentar adicionar um objeto que não é um PlanoDeVoo', () => {
    const objetoInvalido = { id: '002', origem: 'Origem', destino: 'Destino', partida: '13:00', chegada: '16:00' };

    expect(() => {
      servicoPlanos.addPlano(objetoInvalido);
    }).toThrowError('Você está tentando adicionar um objeto que não é um PlanoDeVoo.');
  });

  test('Deve verificar se um plano de voo existe pelo ID', () => {
    Piloto1.addPilot({ matricula: "102", nome: "Nicollas", habilitacaoAtiva: true });
    const planoExistente = new PlanoDeVoo("1","102","BR1",new Date(2024, 11, 17, 15, 0),25000, servicoPiloto);
    servicoPlanos.addPlano(planoExistente);

    const planosEncontrados = servicoPlanos.existePlano('1');
    expect(planosEncontrados).toContain(planoExistente.toString());
  });

  test('Deve lançar um erro se um plano de voo não existe pelo ID', () => {
    expect(() => {
      servicoPlanos.existePlano('004');
    }).toThrowError('Plano de voo com ID 004 não encontrado.');
  });

  test('Deve encontrar um plano de voo pelo ID', () => {
    Piloto1.addPilot({ matricula: "102", nome: "Nicollas", habilitacaoAtiva: true });
    const planoEncontrado = new PlanoDeVoo("1","102","BR1",new Date(2024, 11, 17, 15, 0),25000, servicoPiloto);
    servicoPlanos.addPlano(planoEncontrado);

    const encontrado = servicoPlanos.findPlano('1');
    expect(encontrado).toBe(planoEncontrado);
  });

  test('Deve lançar um erro se não encontrar um plano de voo pelo ID', () => {
    expect(() => {
      servicoPlanos.findPlano('006');
    }).toThrowError('Plano de voo com ID 006 não encontrado.');
  });

  test('Deve garantir que seja criada apenas uma instância de ServicoPlanos', () => {
    const servico1 = new ServicoPlanos();
    const servico2 = new ServicoPlanos();
    expect(servico1).toBe(servico2);
  });
});
