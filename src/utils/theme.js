export default () => ({
  table: {
    borderSpacing: "1",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "6px",
    overflow: "hidden",
    width: "100%",
    margin: "0 auto",
    position: "relative",
  },
  title: {
    fontSize: '22px',
    fontColor: 'rgba(0,0,0,.87)',
    backgroundColor: 'transparent',
    // height: '56px',
    textAlign : 'center'
  },
  header: {
    fontSize: '12px',
    fontWeight: '500',
    fontColor: 'rgba(0,0,0,.54)',
    fontColorActive: 'rgba(0,0,0,.87)',
    backgroundColor: 'transparent',
    height: '48px',
    denseHeight: '32px',
  },
  contextMenu: {
    backgroundColor: '#e3f2fd',
    fontSize: '18px',
    fontColor: 'rgba(0,0,0,.87)',
    transitionTime: '225ms',
  },
  rows: {
    // default || spaced
    spacing: 'default',
    fontSize: '13px',
    fontColor: 'rgba(0,0,0,.87)',
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderColor: 'rgba(0,0,0,.12)',
    stripedColor: 'rgba(0,0,0,.03)',
    hoverFontColor: 'rgba(0,0,0,.87)',
    hoverBackgroundColor: 'rgba(0,0,0,.08)',
 
    denseHeight: '32px',
    textAlign: 'center'
  },
  cells: {
    cellPadding: '48px',
  },
  expander: {
    fontColor: 'rgba(0,0,0,.87)',
    expanderColor: 'rgba(0,0,0,.54)',
    expanderColorDisabled: 'rgba(0,0,0,.12)',
    backgroundColor: 'transparent',
  },
  pagination: {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    fontSize: '13px',
    fontColor: 'rgba(0,0,0,.54)',
    backgroundColor: 'transparent',
    buttonFontColor: 'rgba(0,0,0,.54)',
    buttonHoverBackground: 'rgba(0,0,0,.12)',
    float:'left'
  },
  search: {
    display: "flex",
    flexGrow: "1",
    float: "right",
    flexDirection: "row",
    maxWidth: "15em",
    margin: "5px",
    padding: "5px"
  }

});