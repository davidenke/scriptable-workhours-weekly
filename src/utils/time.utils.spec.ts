import { formatMinutes } from './time.utils';

describe('time.utils', () => {
  describe('formatMinutes', () => {
    it('should return 1h when minutes is 60', () => {
      expect(formatMinutes(60)).toBe('1h');
    });

    it('should return 1,25h when minutes is 75', () => {
      expect(formatMinutes(90)).toBe('1,5h');
    });

    it('should return 1,5h when minutes is 90', () => {
      expect(formatMinutes(90)).toBe('1,5h');
    });

    it('should floor 80 minutes to quarter hours 1,25h', () => {
      expect(formatMinutes(80)).toBe('1,25h');
    });

    it('should floor 40 minutes to quarter hours 0,5h as well', () => {
      expect(formatMinutes(40)).toBe('0,5h');
    });
  });
});
