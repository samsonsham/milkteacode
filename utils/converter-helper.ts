// Basic Latin: 0000-007F
const CODE_POINT_RANGE = {
  MIN: 0,
  MAX: '10FFFF',
  ASCII_MIN: '0000',
  ASCII_MAX: '007e',
};

export const helpers = {
  // Check Hex value is in Unicode Code Point Range
  isInRange: (value: string | number) =>
    value > CODE_POINT_RANGE.MIN && value <= parseInt(CODE_POINT_RANGE.MAX, 16),

  // Check Hex value is in ASCII Code Point Range
  isAscii: (value: number | undefined) => {
    const min = parseInt(CODE_POINT_RANGE.ASCII_MIN, 16);
    const max = parseInt(CODE_POINT_RANGE.ASCII_MAX, 16);
    if (value) {
      return value >= min && value < max;
    }
    return false;
  },
  dec2hex: (i: number) => {
    let result = '0000';
    if (i >= 0 && i <= 15) {
      result = `000${i.toString(16)}`;
    } else if (i >= 16 && i <= 255) {
      result = `00${i.toString(16)}`;
    } else if (i >= 256 && i <= 4095) {
      result = `0${i.toString(16)}`;
    } else if (i >= 4096 && i <= 65535) {
      result = i.toString(16);
    }
    return result;
  },
  char2Charcode: (str: string): number[] => {
    const charCodeArr = [];
    for (let i = 0; i < str.length; i += 1) {
      charCodeArr.push(str.charCodeAt(i));
    }
    return charCodeArr;
  },
  char2CodePt: (str: string) => {
    const codePtArr = [];
    codePtArr.push(str.codePointAt(0));
    return codePtArr;
  },
};

export const unicodePlane = [
  {
    id: 0,
    plane: '0 BMP',
    AllocCodePt: '65520',
    assignedChar: 55632,
  },
  {
    id: 1,
    plane: '1 SMP',
    AllocCodePt: 25696,
    assignedChar: 22982,
  },
  {
    id: 2,
    plane: '2 SIP',
    AllocCodePt: 60912,
    assignedChar: 60872,
  },
  {
    id: 3,
    plane: '3 TIP',
    AllocCodePt: 4944,
    assignedChar: 4939,
  },
  {
    id: 4,
    plane: '14 SSP',
    AllocCodePt: 368,
    assignedChar: 337,
  },
  {
    id: 5,
    plane: '15 SPUA-A',
    AllocCodePt: 65536,
    assignedChar: 'none',
  },
  {
    id: 6,
    plane: '16 SPUA-B',
    AllocCodePt: 65536,
    assignedChar: 'none',
  },
];

export const aboutBoxStyle = {
  box1_bg_light: 'gray.200',
  box1_bg_dark: 'blue.800',
  box2_bg_light: 'orange.200',
  box2_bg_dark: 'yellow.700',
  box3_bg_light: 'yellow.200',
  box3_bg_dark: 'teal.800',
  box4_bg_light: 'green.200',
  box4_bg_dark: 'cyan.800',
  box5_bg_light: 'blue.200',
  box5_bg_dark: 'pink.900',
  box6_bg_light: 'purple.200',
  box6_bg_dark: 'gray.700',
};
