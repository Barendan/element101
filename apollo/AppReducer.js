export default (state, action) => {
  switch (action.type) {
    case 'GET_COLORS':
      return {
        ...state,
        colorList: action.payload
      }
    case 'GET_COLOR_DETAILS':
      return {
        ...state,
        activeColor: action.payload.activeColor,
        tintArr: action.payload.tints
      }
    case 'GET_RANDOM_DETAILS':
      return {
        ...state,
        activeColor: action.payload.activeColor,
        tintArr: action.payload.tints
      }
    case 'GET_SEARCH_DETAILS':
      return {
        ...state,
        activeColor: action.payload.activeColor,
        tintArr: action.payload.tints
      }
    case 'GET_CATEGORY':
      return {
        ...state,
        colorList: action.payload
      }
    case 'CLEAR_COLOR':
      return {
        ...state,
        setActiveColor: '',
        tintArr: []
      }
    default:
      return state
  }
}