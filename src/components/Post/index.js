import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';
import {TelaToda} from '../common/styled'
import logo from '../../img/logo.png'
import {GrLogout} from 'react-icons/gr';
import {AiOutlineHome} from 'react-icons/ai'

const DivInterna = styled.div`
  width: 400px;
  box-sizing: border-box;
  height: 600px;
  margin: 5px;
  border: 1px solid black;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const Header = styled.header`
  height: 50px;
  width: 100%;
  margin: 16px;
  padding: 4px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ImagemLogo = styled.img`
  height: 100%;
  cursor: pointer;
`

const DivPostar=styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const PostTextInput = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  ::placeholder{
    text-align: center;
    line-height: 70px;
  }
`

const Botao = styled.button`
  width: 100%;
`

const IconeHome = styled(AiOutlineHome)`
  font-size: 24px;
  cursor: pointer;
`

const IconeLogout = styled(GrLogout)`
  font-size: 20px;
  cursor: pointer;
`

const Post = () => {
  document.title="labeddit"

  const token = localStorage.getItem("token");
  const history = useHistory();

  if(token===null)
    history.push('/login')

  return (
    <TelaToda>
      <DivInterna>
        <Header>
          <IconeHome onClick={()=>{history.push('/')}} />
          <ImagemLogo src={logo} alt="labeddit" onClick={()=>{history.push('/')}} />
          <IconeLogout onClick={()=>{history.push('/logout')}} />
        </Header>
        <DivPostar>
          <PostTextInput placeholder="Escreva seu comentário" />
          <Botao>Comentar</Botao>
        </DivPostar>
      </DivInterna>
    </TelaToda>
  );
}

export default Post;
