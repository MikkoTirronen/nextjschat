
import React from 'react'
import {  SpinnerRoundOutlined} from 'spinners-react';

 
    function Loading() {
    
  return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      

          <SpinnerRoundOutlined />
    </div>
  );
}

export default Loading