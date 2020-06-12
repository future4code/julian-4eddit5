import React, {useState, useEffect} from 'react';
import {TelaToda} from '../common/styled';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import logo from '../../img/logo.png'
import {DivInterna,
        ContainerPost, 
       BotaoCriarPost,
       EspacoHeader,
       InputTextoPost,
       NomeUsuario,
       ContainerComentarios,
       TextoPost,
       QuantidadeComentarios,
       QuantidadeVotos,
       TituloPost,
       Header,
       ImagemLogo,
       IconeLogout,
       ContainerVotos
      } from './style';


const Feed = () => {
  document.title = "labeddit - Feed"
  
  const history = useHistory();
  const token = localStorage.getItem("token");
  if(token === null)
    history.push("/login")

  const [inputTitle, setInputTitle] = useState('');
  const [inputPost, setInputPost] = useState('');
  const [listaPost, setListaPost] = useState([]);

  const criarPost = () => {
    const body = {
      text: inputPost,
      title: inputTitle
    };

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts", body, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        console.log("token", response.data);
        pegarListaPost()
      }) 
      .catch(error => {
        console.log(error.response)
     })
   };
   
  const onChangeInputTitle = event => {
    setInputTitle(event.target.value);
  }; 
  const onChangeInputPost = event => {
    setInputPost(event.target.value);
  };

  const irParaPost = (id) =>{
    history.push(`/post/${id}`);
  }

  const pegarListaPost = () => {
    axios
      .get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {
        headers: {
          Authorization: token
      }})
      .then((response) => {
        setListaPost(response.data.posts)
      })
     .catch(err => {
       console.log(err);
     })
  };

   useEffect(() => {
    pegarListaPost()
   }, []);
   
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
        pegarListaPost()
     }))
     .catch(error => {
       console.log(error)
     })
   };   

   const logout = () =>{
    localStorage.clear();
    history.push("/login");
   }
   
  return (
    <TelaToda>
      <DivInterna>
          <Header>
            <EspacoHeader />
            <ImagemLogo src={logo} alt="labeddit" onClick={()=>{history.push('/')}} />
            <IconeLogout onClick={logout} />
          </Header>
         <ContainerPost> 
          <input
          type="text"
          placeholder="Título"
          value={inputTitle}
          onChange={onChangeInputTitle}
          />     

          <InputTextoPost
          type="text"
          placeholder="Escreva seu post"
          value={inputPost}
          onChange={onChangeInputPost}
          />
          <BotaoCriarPost onClick={criarPost}>Postar</BotaoCriarPost>
        </ContainerPost>
      
        {listaPost.map((lista) => {
           return(
            <ContainerPost key={lista.id}>
              <div onClick={()=>{irParaPost(lista.id)}} >
                <NomeUsuario>Postado por {lista.username}</NomeUsuario>
                <TituloPost >{lista.title}</TituloPost>
                <TextoPost>{lista.text}</TextoPost>
              </div>
              <ContainerComentarios>
                <ContainerVotos>
                  <FaArrowUp onClick={()=>onClickVotar(lista.id, 1, lista.userVoteDirection)} size="12px"  />
                  <QuantidadeVotos>{lista.votesCount}</QuantidadeVotos>
                  <FaArrowDown onClick={()=>onClickVotar(lista.id, -1, lista.userVoteDirection)} size="12px"  />
                </ContainerVotos>
                <QuantidadeComentarios onClick={()=>{irParaPost(lista.id)}}> {lista.commentsCount} comentários</QuantidadeComentarios>
              </ContainerComentarios> 
            </ContainerPost>  
        )})} 
      </DivInterna>
    </TelaToda>
  );
}

export default Feed;
