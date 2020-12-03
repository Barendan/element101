import React, { createContext, useReducer, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Please from 'pleasejs';

import AppReducer from './AppReducer';
import { GET_COLORS, ADD_COLOR } from './routes';

const initialState = {
  colorSelect: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Gray'],
  colorList: [],
  activeColor: '',
  tintArr: []
}

const createColorStore = () => {
  let colorData = [];
  initialState.colorSelect.forEach((color) => {
    if (color === 'Gray') {
      const grayArr = [];
      for (let i = 0; i < 15; i++) {
        let rNum = Math.floor(Math.random() * 160) + 1;
        let newGray = { r: rNum, g: rNum, b: rNum }
        grayArr.push(Please.RGB_to_HEX(newGray))
      }
      // addColor({ variables: { colorName: color, colorList: grayArr } })
      colorData.push({ colorName: color, colorList: grayArr })
    } else {
      const fixColor = (color === 'Brown') ? 'burlywood' : color;
      let colorSet = Please.make_color({
        golden: true,
        base_color: fixColor,
        colors_returned: 15,
        format: 'hex'
      })
      // addColor({ variables: { colorName: color, colorList: colorSet } })
      colorData.push({ colorName: color, colorList: colorSet })
    }
  })
  // console.log('create', colorData)
  return colorData
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const [addColor] = useMutation(ADD_COLOR, {
    onCompleted: (data) => {
      console.log("Data from mutation", data)
    },
    onError: (error) => console.error("Error creating a color", error),
  });

  const { data } = useQuery(GET_COLORS, {
    onCompleted: (data) => {
      let dbColors = data.getColors;

      if (dbColors.length < 1) {
        createColorStore().map(item => {
          addColor({ variables: { colorName: item.colorName, colorList: item.colorList } })
        })
        dbColors = createColorStore()
      }

      console.log('dbcolors', dbColors)

      let allColors = [];
      dbColors.map(colorObj => {
        colorObj.colorList.map(color => {
          allColors.push(color)
        })
      })
      dispatch({
        type: 'GET_COLORS',
        payload: allColors
      })

    },
    onError: (error) => console.error("Error getting colors", error),
  })

  const getColorDetails = (color) => {
    const hsv = Please.HEX_to_HSV(color)
    const tintArr = Please.make_scheme(hsv, {
      scheme_type: 'mono',
      format: 'hex'
    })
    dispatch({
      type: 'GET_COLOR_DETAILS',
      payload: { tints: tintArr, activeColor: color }
    })
  }

  const getRandomDetails = () => {
    const randomColor = Please.make_color({
      golden: true,
      full_random: true
    })
    const hsv = Please.HEX_to_HSV(randomColor[0])
    const tintArr = Please.make_scheme(hsv, {
      scheme_type: 'mono',
      format: 'hex'
    })
    dispatch({
      type: 'GET_RANDOM_DETAILS',
      payload: { tints: tintArr, activeColor: randomColor }
    })
  }

  const getSearchDetails = (str) => {
    const searchColor = Please.make_color({
      golden: false,
      base_color: str,
      colors_returned: 1,
      format: 'hex'
    })
    console.log('hexy', str, searchColor)

    const hsv = Please.HEX_to_HSV(searchColor[0])
    const tintArr = Please.make_scheme(hsv, {
      scheme_type: 'mono',
      format: 'hex'
    })
    dispatch({
      type: 'GET_SEARCH_DETAILS',
      payload: { tints: tintArr, activeColor: searchColor }
    })
  }

  const getCategory = (e, color) => {
    e.preventDefault();
    const catColor = data.getColors.find(({ colorName }) => colorName === color)

    dispatch({
      type: 'GET_CATEGORY',
      payload: catColor.colorList
    })
  }

  const clearColor = () => {
    dispatch({
      type: 'CLEAR_COLOR'
    })
  }

  return (
    <GlobalContext.Provider value={{
      colorSelect: initialState.colorSelect,
      colorList: state.colorList,
      activeColor: state.activeColor,
      tintArr: state.tintArr,
      loading: state.loading,
      getColorDetails,
      getRandomDetails,
      getSearchDetails,
      getCategory,
      clearColor
    }}>
      {children}
    </GlobalContext.Provider>
  )
}