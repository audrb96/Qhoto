import {
  STAMP_HEALTH,
  STAMP_LIFE,
  STAMP_GREEN,
  STAMP_SPECIAL,
  STAMP_COLOR,
} from '../image';

export default {
  questTypes: {
    H: {
      typeName: '건강',
      iconName: 'running',
      colorCode: '#C25445',
      stamp: STAMP_HEALTH,
    },
    D: {
      typeName: '일상',
      iconName: 'sun',
      colorCode: '#ECB21D',
      stamp: STAMP_LIFE,
    },
    E: {
      typeName: '환경',
      iconName: 'leaf',
      colorCode: '#70A348',
      stamp: STAMP_GREEN,
    },
    S: {
      typeName: '이색',
      iconName: 'star',
      colorCode: '#2271CE',
      stamp: STAMP_SPECIAL,
    },
    C: {
      typeName: '색깔',
      iconName: 'palette',
      colorCode: '#592CB8',
      stamp: STAMP_COLOR,
    },
  },
  levelInfo: {
    red: {
      colorCode: '#F94720',
      colorName: '레드',
      nextColor: '오렌지',
      minPoint: 0,
      maxPoint: 50,
    },
    orange: {
      colorCode: '#FEAD0F',
      colorName: '오렌지',
      nextColor: '옐로우',
      minPoint: 0,
      maxPoint: 100,
    },
    yellow: {
      colorCode: '#FFEB3B',
      colorName: '옐로우',
      nextColor: '그린',
      minPoint: 200,
      maxPoint: 500,
    },
    green: {
      colorCode: '#72D200',
      colorName: '그린',
      nextColor: '블루',
      minPoint: 500,
      maxPoint: 1000,
    },
    blue: {
      colorCode: '#30C1FF',
      colorName: '블루',
      nextColor: '네이비',
      minPoint: 1000,
      maxPoint: 2500,
    },
    navy: {
      colorCode: '#3CA1FF',
      colorName: '네이비',
      nextColor: '퍼플',
      minPoint: 2500,
      maxPoint: 5000,
    },
    purple: {
      colorCode: '#8343E8',
      colorName: '퍼플',
      nextColor: '코토',
      minPoint: 5000,
      maxPoint: 10000,
    },
  },
};
