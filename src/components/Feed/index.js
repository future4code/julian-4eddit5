import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {TelaToda} from '../common/styled';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
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
   const[inputTitle, setInputTitle] = useState('');
   const[inputPost, setInputPost] = useState('');
   const[listaPost, setListaPost] = useState([]);
   const[curtir, setCurtir] = useState(true);
   const[descurtir, setDescurtir] = useState(false);

  
    const criarPost = () => {
     const body = {
      text: inputPost,
      title: inputTitle
     }
     
    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts", body, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(response => {
      console.log("token", response.data);
      history.push('/')
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

  //  useEffect(() => {
  //   pegarListaPost(pathParams.postId)
  //     .then((response) => setListaPost(response))
  //     .then(pegarData(listaPost));
  //  },[])

  //  const pegarData = (listaPost) => {
  //    let data = Date(listaPost.createAt);
  //    setData(data.toString());
  //  }



   useEffect(() => {
     const token = localStorage.getItem("token");

     if(token === null){
      history.push("/login")
     }
   }, [history])

   const pegarListaPost = () => {
     
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
         setListaPost(response.data.posts)
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
           return <ContainerPostUsuario>
               <NomeUsuario>Postado por {lista.username}</NomeUsuario>
                <TituloPost>{lista.title}</TituloPost>
                <TextoPost>{lista.text}</TextoPost>
                <ContainerComentarios>
                <FaArrowUp size="12px" />
                <Votos>{lista.votesCount}</Votos>
                <FaArrowDown size="12px" />
                <Comentario> {lista.commentsCount} comentários</Comentario>
                </ContainerComentarios> 
       </ContainerPostUsuario>  
       
         })}
       
      
      
      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
