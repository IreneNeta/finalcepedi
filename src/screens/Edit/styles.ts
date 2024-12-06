import { styled } from 'styled-components/native';
import theme from '../../theme';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_01};
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 16px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Header = styled.View`
  width: 100%;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-weight: 700;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const Form = styled.View`
  flex: 1;
  gap: 16px;
  width: 100%;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  width: max-content;
`;

export const TextBlack = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const TextLinkContainer = styled.TouchableOpacity`
  width: auto;
`;

export const TextLink = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_03};
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
`;
