import styled from 'styled-components/native'

export const Modal = styled.Modal``
export const ModalArea = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`
export const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`

export const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`

export const ItemInfo = styled.View`
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`
export const ItemDescrible = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`
export const ItemInfoDescrible = styled.View`
  justify-content: space-between;
  flex-direction: row;
`
export const RowItem = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`
export const ColItem = styled.View`
  flex-direction: column;
`
export const Span = styled.Text`
  font-size: 12px;
  color: #333;
  text-align: center;
`

export const ExitButton = styled.TouchableOpacity`
  background-color: #268596;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-radius: 10px;
`
export const ExitButtonText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: bold;
`
