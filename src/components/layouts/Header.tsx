import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: fletx-start;
  width: 100%;
  height: 50px;
  background-color: #3cb371;
  position: fixed;
  top: 0;
  left: 0;
`;

const HeaderText = styled.div`
  width: 100%;
  font-size: 22px;
  line-height: 50px;
  text-align: center;
  margin-left: 3em;
`;

const DecoratedLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const Header: FC = () => (
  <>
    <HeaderWrapper>
      <HeaderText>
        <DecoratedLink to="/individuals">牛の治療管理</DecoratedLink>
      </HeaderText>
    </HeaderWrapper>
  </>
);
export default Header;
