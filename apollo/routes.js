import gql from 'graphql-tag';

export const GET_COLORS = gql`
  query Colors {
    getColors {
      colorName
      colorList
    }
  }
`

export const ADD_COLOR = gql`
  mutation AddColor($colorName: String!, $colorList: [String]!){
    addColor(colorName: $colorName, colorList: $colorList) {
      colorName: colorName
      colorList: colorList
    }
  }
`;