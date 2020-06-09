import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {TelaToda} from '../common/styled';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import axios from 'axios';
import {DivInterna,
       ContainerCriarPost,
       ContainerBotao,
       ContainerTextoUsuario,
       NomeUsuario,
       ContainerComentarios
      } from './style';

const Feed = () => {
   const[inputPost, setInputPost] = useState('');
   const[listaPost, setListaPost] = useState([
    {
      userVoteDirection: 0,
      id: "QUEEf0KWjsVmS6w7xD7Y",
      text: "Just a perfect day, feed animals in the zoo, then later, a movie, too, and then home",
      title: "Lou Reed!",
      commentsCount: 0,
      username: "fe",
      votesCount: 0,
      createdAt: 1591723787295
  }
   ])

   const onChangeInputPost = event => {
     setInputPost(event.target.value);
   };

   const pegarListaPost = () => {
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts').then(
      (response) => {
         console.log(response.data)
      })
   }
   useEffect(() => {
    pegarListaPost()
   }, [])

  return (
    <TelaToda>
      <DivInterna>
        <ContainerCriarPost>
          <input
          type="text"
          placeholder="Escreva seu post"
          value={inputPost}
          onChange={onChangeInputPost}
          />
        </ContainerCriarPost>

        <ContainerBotao>
        <button >Postar</button>
        </ContainerBotao>

       <ContainerTextoUsuario>
         <NomeUsuario>Nome do usuário</NomeUsuario>
         <p>Texto</p>
       </ContainerTextoUsuario>  
       
       <ContainerComentarios>
         <FaArrowUp/>
         <p>0</p>
         <FaArrowDown/>
         <p> 0 comentários</p>
       </ContainerComentarios>
      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
