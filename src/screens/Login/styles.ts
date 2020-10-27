import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #63c2d1;
  justify-content: center;
  align-items: center;
`
export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`
export const InputArea = styled.View`
  padding: 40px;
  width: 100%;
`
export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #268596;
  margin-left: 10px;
`
export const SignInput = styled.View`
  width: 100%;
  height: 60px;
  background-color: #83d6e3;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`
export const CustomButtom = styled.TouchableOpacity`
  height: 60px;
  margin-top: 10px;
  background-color: #268596;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`
export const CustomButtomText = styled.Text`
  font-size: 18px;
  color: #fff;
`

export const SignQrCode = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`
