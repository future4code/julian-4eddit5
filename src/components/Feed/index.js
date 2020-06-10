import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {TelaToda} from '../common/styled';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {DivInterna,
       ContainerCriarPost,
       ContainerBotao,
       ContainerTextoUsuario,
       NomeUsuario,
       ContainerComentarios
      } from './style';


const Feed = () => {
   const[inputPost, setInputPost] = useState('');
   const[contador, setContador] = useState(0)
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
   
   const history = useHistory();

   const somarContador = () => {
     setContador(contador + 1);
   };

   const subtrairContador = () => {
     setContador(contador - 1);
   };

   const onChangeInputPost = event => {
     setInputPost(event.target.value);
   };

   useEffect(() => {
     const token = localStorage.getItem("token");

     if(token === null){
      history.push("/login")
     }
   }, [])

   const pegarListaPost = () => {
     
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
         console.log(response.data)
         history.push('/')
      })
      .catch(err => {
        console.log(err);
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

      
         {listaPost.map((lista) => {
           return  <ContainerTextoUsuario>
               <NomeUsuario>{lista.username}</NomeUsuario>
                <p>{lista.text}</p>
       </ContainerTextoUsuario>  
         })}
       
       {listaPost.map((comentarios) => {
         return  <ContainerComentarios>
         <FaArrowUp onClick={somarContador}/>
        <p>{comentarios.votesCount}</p>
         <FaArrowDown onClick={subtrairContador}/>
         <p> {comentarios.commentsCount} comentários</p>
       </ContainerComentarios>
       })}
      
      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
