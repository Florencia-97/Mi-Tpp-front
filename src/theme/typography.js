const typography = {
  h1: {
    fontWeight: 500,
    fontSize: 35,
    '@media (max-width:600px)': {
      fontSize: 24,
    },
    letterSpacing: '-0.24px'
  },
  h2: {
    fontWeight: 500,
    fontSize: 29,
    letterSpacing: '-0.24px',
    '@media (max-width:600px)': {
      fontSize: 24,
    },
  },
  h3: {
    fontWeight: 500,
    fontSize: 24,
    letterSpacing: '-0.06px'
  },
  h4: {
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: '-0.06px'
  },
  h5: {
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: '-0.05px',
    '@media (max-width:600px)': {
      fontSize: 12,
    },
  },
  h6: {
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: '-0.05px'
  },
  overline: {
    fontWeight: 500
  }
};


export default typography;

