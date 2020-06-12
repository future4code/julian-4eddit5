import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {TelaToda} from '../common/styled'
import logo from '../../img/logo.png'
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import axios from 'axios';
import { useForm } from '../hooks/useForm';
import {DivInterna, 
        Header,
        ImagemLogo,
        DivComentar,
        InputComentario,
        ContainerPost,
        Botao,
        IconeHome,
        IconeLogout,
        ContainerComentarios,
        QuantidadeComentarios,
        QuantidadeVotos,
        ContainerVotos,
        NomeUsuario,
        TituloPost,
        TextoPost
  } from './style'

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
