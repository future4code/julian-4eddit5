import styled from 'styled-components'
import {GrLogout} from 'react-icons/gr';
import {AiOutlineHome} from 'react-icons/ai'

export const DivInterna = styled.div`
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

export const Header = styled.header`
  height: 50px;
  width: 100%;
  margin: 16px;
  padding: 4px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ImagemLogo = styled.img`
  height: 100%;
  cursor: pointer;
`

export const DivComentar=styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

export const InputComentario = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  ::placeholder{
    text-align: center;
    line-height: 70px;
  }
`

export const ContainerPost=styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 16px;
`

export const Botao = styled.button`
  width: 100%;
`

export const IconeHome = styled(AiOutlineHome)`
  font-size: 24px;
  cursor: pointer;
`

export const IconeLogout = styled(GrLogout)`
  font-size: 20px;
  cursor: pointer;
`

export const ContainerComentarios = styled.div`
  display: flex;
  height: 20px;  
  padding: 0 8px;
  :first-of-type{
    justify-content: space-between;  
  }
`
export const QuantidadeComentarios = styled.div`
   font-size: 10px;
`
export const QuantidadeVotos = styled.div`
  font-size: 10px;
  margin: 0 4px;
`
export const ContainerVotos = styled.div`
  display: flex;
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
   margin: 10px 0;
   padding-left: 10px;
   display:flex;
   justify-content:center;
   height:50%;
   box-sizing: border-box;
`

