import styled from 'styled-components/native'

export const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`
export const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  margin-top: -20px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid #4eadbe;
`
