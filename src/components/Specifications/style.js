export default {
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: 'rgb(68, 68, 68)',
    fontSize: 12,
    letterSpacing: 1,
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  specs: {
    errors: {
      color: 'red',
      message: {
        backgroundColor: 'rgb(250, 250, 250)',
        padding: '10px',
        margin: '10px'
      }
    },
    pass: {
      color: "green"
    }
  }
}
