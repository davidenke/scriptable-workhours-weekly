import { getItemNear } from './auxiliary.utils';

describe('auxiliary.utils', () => {
  describe('formatMinutes', () => {
    it('should return first item for 0% to 32%', () => {
      expect(getItemNear(['foo', 'bar', 'baz'], 0)).toBe('foo');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.2)).toBe('foo');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.33)).toBe('foo');
    });

    it('should return second item for 34% to 65%', () => {
      expect(getItemNear(['foo', 'bar', 'baz'], 0.34)).toBe('bar');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.45)).toBe('bar');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.5)).toBe('bar');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.65)).toBe('bar');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.66)).toBe('bar');
    });

    it('should return last item for 67% to 100%', () => {
      expect(getItemNear(['foo', 'bar', 'baz'], 0.67)).toBe('baz');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.75)).toBe('baz');
      expect(getItemNear(['foo', 'bar', 'baz'], 0.9)).toBe('baz');
      expect(getItemNear(['foo', 'bar', 'baz'], 1)).toBe('baz');
    });

    it('should align negative and greater than 1 values', () => {
      expect(getItemNear(['foo', 'bar', 'baz'], -0.23)).toBe('foo');
      expect(getItemNear(['foo', 'bar', 'baz'], 1.25)).toBe('baz');
    });
  });
});
