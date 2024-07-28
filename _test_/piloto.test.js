import { piloto } from '../objetos/piloto.js';
import { ServicoPiloto } from '../objetos/servicoPiloto.js';

describe('piloto', () => {
  let servicoPilototeste;
  let pilotoTeste;

  beforeEach(() => {
    // Inicializar o serviço de pilotos
      servicoPilototeste = new ServicoPiloto();

    // Inicializar um novo piloto para cada teste
    pilotoTeste = new piloto(servicoPilototeste);
  });

  test('Adicionar um piloto válido', () => {
    // Parâmetros válidos
    const cadastro = {
      matricula: 'P001',
      nome: 'Nicollas',
      habilitacaoAtiva: true
    };

    // Verifica se o piloto é adicionado corretamente
    pilotoTeste.addPilot(cadastro);

    // Verifica se os getters funcionam corretamente
    expect(pilotoTeste.matricula).toBe('P001');
    expect(pilotoTeste.nome).toBe('Nicollas');
    expect(pilotoTeste.habilitacaoAtiva).toBe('Ativa');
  });

  test('Deve lançar um erro quando os parâmetros são inválidos', () => {
    expect(() => {
      // Tentando adicionar um piloto com matrícula inválida (deveria ser string)
      pilotoTeste.addPilot({ matricula: null, nome: 'Bruna', habilitacaoAtiva: true });
    }).toThrowError(new Error("property #matricula expected string but got null"));

    expect(() => {
      // Tentando adicionar um piloto com nome inválido (deveria ser string)
      pilotoTeste.addPilot({ matricula: 'P002', nome: null, habilitacaoAtiva: true });
    }).toThrowError(new Error("property #nome expected string but got null"));

    expect(() => {
      // Tentando adicionar um piloto com habilitacaoAtiva inválida (deveria ser boolean)
      pilotoTeste.addPilot({ matricula: 'P003', nome: 'Juan', habilitacaoAtiva: null });
    }).toThrowError(new Error("property #habilitacaoAtiva expected boolean but got null"));
  });

  test('Deve lançar erro se tentar adicionar um piloto com habilitação inativa', () => {
    expect(() => {
      pilotoTeste.addPilot({ matricula: 'P004', nome: 'Vitor', habilitacaoAtiva: false });
    }).toThrowError(new Error("A habilitação do piloto deve estar ativa."));
  });

  test('Deve lançar erro se tentar adicionar um piloto com matrícula já existente', () => {
    // Adiciona um piloto válido primeiro
    pilotoTeste.addPilot({ matricula: 'P005', nome: 'Ana Paula', habilitacaoAtiva: true });

    expect(() => {
      // Tenta adicionar um piloto com a mesma matrícula
      pilotoTeste.addPilot({ matricula: 'P005', nome: 'Pedro Alves', habilitacaoAtiva: true });
    }).toThrowError(new Error("Piloto com matrícula P005 já existe no serviço."));
  });

});
