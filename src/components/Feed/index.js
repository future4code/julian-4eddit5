import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';
import {TelaToda} from '../common/styled'
import logo from '../../img/logo.png'

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

const ImagemLogo = styled.img`
  height: 50px;
  margin: 16px;
  box-sizing: border-box;
`

const DivPostar=styled.div`
  width: 60%;
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

const Feed = () => {
  document.title="labeddit"

  const token = localStorage.getItem("token");
  const history = useHistory();

  if(token===null)
    history.push('/login')

  return (
    <TelaToda>
      <DivInterna>
        <ImagemLogo src={logo} alt="labeddit" />
        <DivPostar>
          <PostTextInput placeholder="Escreva seu post" />
          <Botao>Postar</Botao>
        </DivPostar>
      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
