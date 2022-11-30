type Platform = 'macOS' | 'iOS' | 'watchOS';

// define structure of color collection
export type AppleColors = Record<Platform, Record<string, Color>>;

// taken from Apple UI guidelines
// https://developer.apple.com/design/human-interface-guidelines/foundations/color/#specifications
export const Colors: AppleColors = {
  iOS: {
    red: Color.dynamic(new Color('#ff3b30', 1), new Color('#ff453a', 1)),
    orange: Color.dynamic(new Color('#ff9500', 1), new Color('#ff9f0a', 1)),
    yellow: Color.dynamic(new Color('#ffcc00', 1), new Color('#ffd60a', 1)),
    green: Color.dynamic(new Color('#34c759', 1), new Color('#30d158', 1)),
    mint: Color.dynamic(new Color('#00c7be', 1), new Color('#66d4cf', 1)),
    teal: Color.dynamic(new Color('#30b0c7', 1), new Color('#40c8e0', 1)),
    cyan: Color.dynamic(new Color('#32ade6', 1), new Color('#64d2ff', 1)),
    blue: Color.dynamic(new Color('#007aff', 1), new Color('#0a84ff', 1)),
    indigo: Color.dynamic(new Color('#5856d6', 1), new Color('#5e5ce6', 1)),
    purple: Color.dynamic(new Color('#af52de', 1), new Color('#bf5af2', 1)),
    pink: Color.dynamic(new Color('#ff2d55', 1), new Color('#ff375f', 1)),
    brown: Color.dynamic(new Color('#a2845e', 1), new Color('#ac8e68', 1)),
    gray: Color.dynamic(new Color('#8e8e93', 1), new Color('#8e8e93', 1)),

    gray2: Color.dynamic(new Color('#aeaeb2', 1), new Color('#636366', 1)),
    gray3: Color.dynamic(new Color('#c7c7cc', 1), new Color('#48484a', 1)),
    gray4: Color.dynamic(new Color('#d1d1d6', 1), new Color('#3a3a3c', 1)),
    gray5: Color.dynamic(new Color('#e5e5ea', 1), new Color('#2c2c2e', 1)),
    gray6: Color.dynamic(new Color('#f2f2f7', 1), new Color('#1c1c1e', 1))
  },
  macOS: {
    red: Color.dynamic(new Color('#ff3b30', 1), new Color('#ff453a', 1)),
    orange: Color.dynamic(new Color('#ff9500', 1), new Color('#ff9f0a', 1)),
    yellow: Color.dynamic(new Color('#ffcc00', 1), new Color('#ffd60a', 1)),
    green: Color.dynamic(new Color('#28cd41', 1), new Color('#32d74b', 1)),
    mint: Color.dynamic(new Color('#00c7be', 1), new Color('#66d4cf', 1)),
    teal: Color.dynamic(new Color('#59adc4', 1), new Color('#6ac4dc', 1)),
    cyan: Color.dynamic(new Color('#55bef0', 1), new Color('#5ac8f5', 1)),
    blue: Color.dynamic(new Color('#007aff', 1), new Color('#0a84ff', 1)),
    indigo: Color.dynamic(new Color('#5856d6', 1), new Color('#5e5ce6', 1)),
    purple: Color.dynamic(new Color('#af52de', 1), new Color('#bf5af2', 1)),
    pink: Color.dynamic(new Color('#ff2d55', 1), new Color('#ff375f', 1)),
    brown: Color.dynamic(new Color('#a2845e', 1), new Color('#ac8e68', 1)),
    gray: Color.dynamic(new Color('#8e8e93', 1), new Color('#98989d', 1))
  },
  watchOS: {
    red: Color.dynamic(new Color('#ff3b30', 1), new Color('#ff3b30', 1)),
    orange: Color.dynamic(new Color('#ff9500', 1), new Color('#ff9500', 1)),
    yellow: Color.dynamic(new Color('#ffe620', 1), new Color('#ffe620', 1)),
    green: Color.dynamic(new Color('#04de71', 1), new Color('#04de71', 1)),
    mint: Color.dynamic(new Color('#66d4cf', 1), new Color('#66d4cf', 1)),
    teal: Color.dynamic(new Color('#6ac4dc', 1), new Color('#6ac4dc', 1)),
    cyan: Color.dynamic(new Color('#5ac8fa', 1), new Color('#5ac8fa', 1)),
    blue: Color.dynamic(new Color('#2094fa', 1), new Color('#2094fa', 1)),
    indigo: Color.dynamic(new Color('#787aff', 1), new Color('#787aff', 1)),
    purple: Color.dynamic(new Color('#bf5af2', 1), new Color('#bf5af2', 1)),
    pink: Color.dynamic(new Color('#fa114f', 1), new Color('#fa114f', 1)),
    brown: Color.dynamic(new Color('#ac8e68', 1), new Color('#ac8e68', 1)),
    gray: Color.dynamic(new Color('#9ba0aa', 1), new Color('#9ba0aa', 1))
  }
};

// convenience function to get the system color for a given platform
export const getSystemColor = (color: keyof AppleColors[Platform]): Color => {
  let platform = Device.systemName() as Platform;
  // narrow down to the iOS platform
  if (['iPadOS', 'tvOS', 'realityOS'].includes(platform)) platform = 'iOS';
  return Colors[platform][color];
};
