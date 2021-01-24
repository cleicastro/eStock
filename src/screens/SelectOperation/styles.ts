import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  flex-direction: column;
  background-color: #63c2d1;
`
export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
`
export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`
export const ButtonContainer = styled.View`
  width: 300px;
  justify-content: space-around;
  flex-direction: row;
`
export const ButtonOperation = styled.TouchableOpacity`
  height: 80px;
  width: 124px;
  background-color: #fef;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`
