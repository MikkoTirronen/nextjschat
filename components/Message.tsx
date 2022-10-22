import React from 'react'
import styled from 'styled-components'

function Message({message}:any){
  return (
      <Container>{message.message }</Container>
  )
}

export default Message

const Container = styled.div``