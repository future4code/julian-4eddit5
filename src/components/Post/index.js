import React, {useState} from 'react';
import styled from 'styled-components'
import {useHistory, useParams} from 'react-router-dom';
import {TelaToda} from '../common/styled'
import logo from '../../img/logo.png'
import {GrLogout} from 'react-icons/gr';
import {AiOutlineHome} from 'react-icons/ai'
import axios from 'axios';
import { useForm } from '../hooks/useForm';

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
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background: #8f8c8c;
    border-radius: 8px;
  }
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

const DivComentar=styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const InputComentario = styled.textarea`
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

  const pathParams = useParams();
  const {form, changeValue} = useForm({comentario: ''})
  const [listaComentarios, setListaComentarios] = useState([]);

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value);
  }

  const pegarComentarios = () => {
    axios
      .get("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/:postId", {
        headers:{
          Authoriation: token
        }
      })
      .then(response=>{
        setListaComentarios(response.data);
      })
      .catch(error=>{
        console.log(error.response);
      })
  }

  const comentar = () => {
    const body = {
      text: form.comentario
    }

    axios
      .post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.id}/comment`,
        body, {
        headers:{
          Authorization: token
        }
      }) 
      .then(response=>{
        console.log(response.data)
      })
      .catch(error=>{
        console.log(error.response)
      })
  }

  const logout = () =>{
    localStorage.clear();
    history.push("/login");
  }

  return (
    <TelaToda>
      <DivInterna>
        <Header>
          <IconeHome onClick={()=>{history.push('/')}} />
          <ImagemLogo src={logo} alt="labeddit" onClick={()=>{history.push('/')}} />
          <IconeLogout onClick={logout} />
        </Header>
        <DivComentar>
          <InputComentario 
            placeholder="Escreva seu comentário" 
            name="comentario" 
            value={form.comentario} 
            onChange={onChangeInput}
          />
          <Botao>Comentar</Botao>
        </DivComentar>
      </DivInterna>
    </TelaToda>
  );
}

export default Post;
