  import { OcupacaoAerovia } from '../objetos/OcupacaoAerovia';
  import { aerovia } from '../objetos/aerovia';
  import { PlanoDeVoo } from '../objetos/PlanoDeVoo';
  
  //criando uma Ocupacao de Aerovia
  describe('OcupacaoAerovia', () => {
    let ocupacaoAerovia;
  
    beforeEach(() => {
      ocupacaoAerovia = new OcupacaoAerovia();
    });
    //adicionando e verificando
    test('Adicionar e verificar aerovias', () => {
      const aerovias = [
        { id: 'A001' },
        { id: 'A002' },
        { id: 'A003' }
      ];
  
      ocupacaoAerovia.addAerovias(aerovias);
  
      expect(ocupacaoAerovia.getOcupacao()).toEqual({
        'A001': [],
        'A002': [],
        'A003': []
      });
    });
  
    test('Verificar altitudes livres', () => {
      const aeroviaId = 'A001';
      const data = new Date(2024,6,20,12,0);
  
      ocupacaoAerovia.addAerovias([{ id: 'A001' }]);
      ocupacaoAerovia.ocupando({
        idAerovia: aeroviaId,
        data,
        altitude: 30000,
        slots: [1]
      });
  
      const altitudesLivres = ocupacaoAerovia.altitudesLivres(aeroviaId, data);
      expect(altitudesLivres).toEqual([25000, 26000, 27000, 28000, 29000, 31000, 32000, 33000, 34000, 35000]);
    });
  
    test('Ocupar e verificar se altitude está livre', () => {
      const aeroviaId = 'A001';
      const data = new Date(2024, 6, 20, 12, 30);
      const altitude = 30000;
      const slotsNecessarios = 2;
  
      ocupacaoAerovia.addAerovias([{ id: 'A001' }]);
      ocupacaoAerovia.ocupando({
        idAerovia: aeroviaId,
        data,
        altitude,
        slots: [1]
      });
  
      // Verifica se a altitude está livre para 2 slots a partir da altitude especificada
      const altitudeLivre = ocupacaoAerovia.isAltitudeLivre(aeroviaId, altitude, data, slotsNecessarios);
      //console.log(altitudeLivre);
      expect(altitudeLivre).toBe(false);
    });
  
  
  
  
    test('Deve lançar erro ao tentar ocupar aerovia inexistente', () => {
      expect(() => {
        ocupacaoAerovia.ocupando({
          idAerovia: 'A001',
          data: new Date(),
          altitude: 30000,
          slots: [1]
        });
      }).toThrowError(new Error("Aerovia não encontrada"));
    });
  
    test('Deve lançar erro ao tentar verificar aerovia inexistente', () => {
      expect(() => {
        ocupacaoAerovia.isocupado('A001', new Date(), 30000, 1);
      }).toThrowError(new Error("Aerovia não encontrada"));
    });
  
  });
  