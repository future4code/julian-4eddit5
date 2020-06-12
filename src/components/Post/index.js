import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {useHistory, useParams} from 'react-router-dom';
import {TelaToda} from '../common/styled'
import logo from '../../img/logo.png'
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
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

const ContainerPost=styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 16px;
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

const ContainerComentarios = styled.div`
  display: flex;
  height: 20px;  
  padding: 0 8px;
  :first-of-type{
    justify-content: space-between;  
  }
`
const QuantidadeComentarios = styled.div`
   font-size: 10px;
`
const QuantidadeVotos = styled.div`
  font-size: 10px;
  margin: 0 4px;
`
const ContainerVotos = styled.div`
  display: flex;
`

const NomeUsuario = styled.div`
  font-size: 8px;
  font-weight:600;
  padding: 5px;
   
`
const TituloPost = styled.div`
   padding: 5px;
   font-size: 14px;
   font-weight: 600;
`
const TextoPost = styled.div`
   font-size: 14px;
   margin: 10px 0;
   padding-left: 10px;
   display:flex;
   justify-content:center;
   height:50%;
   box-sizing: border-box;
`

const Post = () => {
  document.title="labeddit"

  const token = localStorage.getItem("token");
  const history = useHistory();

  if(token===null)
    history.push('/login')

  const pathParams = useParams();
  const {form, changeValue, clearForm} = useForm({comentario: ''})
  const [listaComentarios, setListaComentarios] = useState([]);

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value);
  }

  const pegarComentarios = () => {
    axios
      .get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.id}`, {
        headers:{
          Authorization: token
        }
      })
      .then(response=>{
        console.log(response.data.post);
        setListaComentarios(response.data.post);
      })
      .catch(error=>{
        console.log(error.response);
      })
  }

  useEffect(() => {
    pegarComentarios()
   }, []);

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
        pegarComentarios();
        clearForm();
      })
      .catch(error=>{
        console.log(error.response)
      })
  }

  const logout = () =>{
    localStorage.clear();
    history.push("/login");
  }

  const onClickVotar = (id, direcao, direcaoUsuario) => {
    let novaDirecao = direcao;

    if(direcao === direcaoUsuario)
      novaDirecao = 0;

   const body = {
     direction: novaDirecao
   };
    axios
    .put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`, body , {
      headers: {
        Authorization: token
      }
    })
    .then((response => {
       pegarComentarios()
    }))
    .catch(error => {
      console.log(error)
    })
  };   

  const onClickVotarComentario = (id, direcao, direcaoUsuario) => {
    let novaDirecao = direcao;

    if(direcao === direcaoUsuario)
      novaDirecao = 0;

   const body = {
     direction: novaDirecao
   };
    axios
    .put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.id}/comment/${id}/vote`, body , {
      headers: {
        Authorization: token
      }
    })
    .then((response => {
       pegarComentarios()
    }))
    .catch(error => {
      console.log(error)
    })
  };   

  return (
    <TelaToda>
      <DivInterna>
        <Header>
          <IconeHome onClick={()=>{history.push('/')}} />
          <ImagemLogo src={logo} alt="labeddit" onClick={()=>{history.push('/')}} />
          <IconeLogout onClick={logout} />
        </Header>
        <ContainerPost>
          <NomeUsuario>Postado por {listaComentarios.username}</NomeUsuario>
          <TituloPost >{listaComentarios.title}</TituloPost>
          <TextoPost>{listaComentarios.text}</TextoPost>
          <ContainerComentarios>
            <ContainerVotos>
              <FaArrowUp onClick={()=>onClickVotar(listaComentarios.id, 1, listaComentarios.userVoteDirection)} size="12px"  />
              <QuantidadeVotos>{listaComentarios.votesCount}</QuantidadeVotos>
              <FaArrowDown onClick={()=>onClickVotar(listaComentarios.id, -1, listaComentarios.userVoteDirection)} size="12px"  />
            </ContainerVotos>
            <QuantidadeComentarios> {listaComentarios.commentsCount} comentários</QuantidadeComentarios>
          </ContainerComentarios> 
        </ContainerPost>
        <DivComentar>
          <InputComentario 
            placeholder="Escreva seu comentário" 
            name="comentario" 
            value={form.comentario} 
            onChange={onChangeInput}
          />
          <Botao onClick={comentar}>Comentar</Botao>
        </DivComentar>
        {listaComentarios.comments && listaComentarios.comments.map(comentario=>{
          return(
          <ContainerPost>
            <NomeUsuario>{comentario.username}</NomeUsuario>
            <TextoPost>{comentario.text}</TextoPost>
            <ContainerComentarios>
              <FaArrowUp onClick={()=>onClickVotarComentario(comentario.id, 1, comentario.userVoteDirection)} size="12px"  />
              <QuantidadeVotos>{comentario.votesCount}</QuantidadeVotos>
              <FaArrowDown onClick={()=>onClickVotarComentario(comentario.id, -1, comentario.userVoteDirection)} size="12px"  />
            </ContainerComentarios>
          </ContainerPost>
        )})}
      </DivInterna>
    </TelaToda>
  );
}

export default Post;
