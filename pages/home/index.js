import React from "react";
import styled from "styled-components";

function Home() {
  return (
    <div>
      <Later>
        👨‍💻 <span style={{ marginLeft: "0px" }}>稍後推出</span>
      </Later>
    </div>
  );
}

export default Home;

const Later = styled.div`
  display: inline-block;
  color: #3e906a;
  padding: 6px 12px;
  background: #dfece7;
  border-radius: 20px;
  font-size: 14px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  margin-top: 20px;
`;
