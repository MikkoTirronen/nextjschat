import React, { FC } from "react";
import styled from "styled-components";

function SideBar() {
  return (
    <Container>
      <h1>SideBar</h1>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  `
