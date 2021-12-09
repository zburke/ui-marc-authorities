import buildQuery from './buildQuery';
import { searchableIndexesValues } from '../../constants';

describe('Given buildQuery', () => {
  describe('when index without any prefix provided', () => {
    it('should return correct query', () => {
      const query = buildQuery(searchableIndexesValues.IDENTIFIER);

      expect(query).toBe('(identifier=="%{query}*")');
    });
  });

  describe('when index with plain, sft, and saft prefixes provided', () => {
    it('should return correct query', () => {
      const query = buildQuery(searchableIndexesValues.PERSONAL_NAME);

      expect(query).toBe('(personalName=="%{query}*" or sftPersonalName=="sft %{query}*" or saftPersonalName=="saft %{query}*")');
    });
  });

  describe('when index with different names for plain, sft, and saft prefixes provided', () => {
    it('should return correct query', () => {
      const query = buildQuery(searchableIndexesValues.GEOGRAPHIC_NAME);

      expect(query).toBe('(geographicName=="%{query}*" or sftGeographicTerm=="sft %{query}*" or saftGeographicTerm=="saft %{query}*")');
    });
  });

  describe('when index keyword index provided', () => {
    it('should return correct query for keyword index', () => {
      const query = buildQuery('');

      expect(query).toBe('(keyword=="%{query}*")');
    });
  });
});