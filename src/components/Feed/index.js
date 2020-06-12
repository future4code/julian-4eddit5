import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {TelaToda} from '../common/styled';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import axios from 'axios';
import {useHistory, useParams } from 'react-router-dom';
import {DivInterna,
       ContainerCriarPost,
       BotaoCriarPost,
       ContainerPostUsuario,
       NomeUsuario,
       ContainerComentarios,
       TextoPost,
       Comentario,
       Votos,
       TituloPost
      } from './style';


const Feed = () => {
   const history = useHistory();
   const params = useParams();
   const[inputTitle, setInputTitle] = useState('');
   const[inputPost, setInputPost] = useState('');
   const[listaPost, setListaPost] = useState([]);
   
   const irParaPaginaPost = () => {
    history.push("/post")
    };

  
    const criarPost = () => {
     const body = {
      text: inputPost,
      title: inputTitle
     };

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts", body, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log("token", response.data);
      pegarListaPost()
    }) 
     .catch(error => {
       console.log(error.data)
     })
   
   };
   
   const onChangeInputTitle = event => {
     setInputTitle(event.target.value);
   }; 

   const onChangeInputPost = event => {
     setInputPost(event.target.value);
   };

    useEffect(() => {
     const token = localStorage.getItem("token");

     if(token === null){
      history.push("/login")
     }
   }, [history]);

   const pegarListaPost = () => {
     
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
         setListaPost(response.data.posts)
        
      })
      .catch(err => {
        console.log(err);
      })
   };

   useEffect(() => {
    pegarListaPost()
   }, []);
   
   const baseUrl = `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/:postId/vote`
   const onClickVotar = () => {
    const body = {
      direction: 0
    };
     axios
     .put(`${baseUrl}/:postId/vote`, body , {
       headers: {
         Authorization:localStorage.getItem("token")
       }
     })
     .then((response => {
       console.log(response.data)
      
     }))
     .catch(error => {
       console.log(error)
     })
   };
  

   
   
  return (
    <TelaToda>
      <DivInterna>
         <ContainerCriarPost> 
          <input
          type="text"
          placeholder="Título"
          value={inputTitle}
          onChange={onChangeInputTitle}
          />     

          <textarea
          type="text"
          placeholder="Escreva seu post"
          value={inputPost}
          onChange={onChangeInputPost}
          />
        </ContainerCriarPost>

        <BotaoCriarPost>
        <button onClick={criarPost}>Postar</button>
        </BotaoCriarPost> 

      
         {listaPost.map((lista) => {
           return <ContainerPostUsuario onClick={irParaPaginaPost} >
               <NomeUsuario>Postado por {lista.username}  </NomeUsuario>
                <TituloPost >{lista.title}</TituloPost>
                <TextoPost>{lista.text}</TextoPost>
                <ContainerComentarios>
                <FaArrowUp onClick={onClickVotar} size="12px"  />
                <Votos>{lista.votesCount}</Votos>
                <FaArrowDown  size="12px"  />
                <Comentario> {lista.commentsCount} comentários</Comentario>
                </ContainerComentarios> 
       </ContainerPostUsuario>  
       
         })}
       
      
      
      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
