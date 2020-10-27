import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
`
export const InputArea = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`
export const Input = styled.TextInput`
  flex: 1;
  background-color: #fff;
  font-size: 16px;
  color: #000;
  padding: 10px;
`

export const ButtonArea = styled.View`
  flex-direction: row;
`
export const ActionButton = styled.TouchableOpacity`
  flex: 1;
  height: 60px;
  margin-top: 30px;
  margin-bottom: 40px;
  background-color: #63c2d1;
  justify-content: center;
  align-items: center;
`
export const ActionButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`
