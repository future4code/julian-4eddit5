import styled from 'styled-components';

export const DivInterna = styled.div`
  width: 400px;
  box-sizing: border-box;
  height: 600px;
  margin: 5px;
  border: 1px solid black;
  background-color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background: #8f8c8c;
    border-radius: 8px;
  }
`
export const ContainerCriarPost = styled.div`
  border: 1px solid black;
  margin-top: 1rem;
  margin-left: 5px;
  height: 50px;
      
  display: flex;
  flex-direction:column;
  justify-content: center;
`

export const BotaoCriarPost = styled.div`
   display: flex;
   justify-content: center;
   margin-left: 5px;
   border-bottom: 1px solid black;
   border-left: 1px solid black;
   border-right: 1px solid black;
   
`

export const ContainerPostUsuario = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: flex-start; 
  border: solid 1px black;
  height: 50%;
  margin: 3rem auto;
  margin-left: 5px;
 `

export const NomeUsuario = styled.div`
  font-size: 8px;
  font-weight:600;
  padding: 5px;
   
`
export const TituloPost = styled.div`
   padding: 5px;
   font-size: 14px;
   font-weight: 600;

`
export const TextoPost = styled.div`
   font-size: 14px;
   margin-top: 10px;
   padding-left: 10px;
   display:flex;
   justify-content:center;
   height:50%;
   box-sizing: border-box;
   margin-bottom:45px;
`

export const ContainerComentarios = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;  
  height: 20px;  
`

export const Comentario = styled.div`
   font-size: 10px;
`

export const Votos = styled.div`
  font-size: 10px;
`




