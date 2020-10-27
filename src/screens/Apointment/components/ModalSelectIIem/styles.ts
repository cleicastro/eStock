import styled from 'styled-components/native'

export const Modal = styled.Modal``
export const ModalArea = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
`
export const TextModalTile = styled.Text`
  font-size: 20px;
  color: #fff;
`
export const ModalHeader = styled.View`
  flex: 1;
  background-color: #83d6e3;
  padding: 10px 20px 40px 20px;
`
export const ModalBody = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex: 3;
  padding: 10px 20px 40px 20px;
  margin-top: -15px;
`
export const InputArea = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
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
  height: 48px;
  margin-top: 10px;
  background-color: #63c2d1;
  justify-content: center;
  align-items: center;
  margin: 5px;
`
export const ActionButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`
