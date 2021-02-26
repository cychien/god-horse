import React from "react";
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";

function Ticket() {
  const ticket = useSelector((state) => state.ticket);

  return (
    <Container>
      <HeadSection>
        <Link href="/bike">
          <BackButton>
            <ArrowLeftIcon />
          </BackButton>
        </Link>
        <Title>你的箴言</Title>
      </HeadSection>
      <Main>
        {ticket?.bgImg && ticket?.words && (
          <div>
            <TicketWrapper>
              <TicketBgImg src={ticket?.bgImg} />
              {/* <Image src='' alt="箴言" layout="fill" /> */}
              <TicketWords>{ticket?.words}</TicketWords>
            </TicketWrapper>
            <Reminder>
              👍{" "}
              <span style={{ marginLeft: "2px" }}>
                箴言已儲存進你的個人檔案
              </span>
            </Reminder>
            <DownloadLink>下載至手機</DownloadLink>
            <Later>
              👨‍💻 <span style={{ marginLeft: "0px" }}>稍後推出</span>
            </Later>
          </div>
        )}
      </Main>
    </Container>
  );
}

export default Ticket;

const Container = styled.div`
  padding-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
`;

const HeadSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
`;

const BackButton = styled.div`
  display: inline-block;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  border-radius: 4px;
  color: #6c757d;
  padding-bottom: 6px;
  margin-right: 20px;
`;

const Title = styled.h1`
  color: #343a40;
  font-size: 20px;
  font-weight: 500;
`;

const Main = styled.div``;

const TicketWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const TicketBgImg = styled.img`
  width: 100%;
`;

// TODO: get position from db
const TicketWords = styled.div`
  position: absolute;
  left: 15px;
  top: 30px;
  word-break: break-all;
  margin-right: 15px;
`;

const Reminder = styled.div`
  width: 100%;
  padding: 8px;
  text-align: center;
  background: #eff2f5;
  border-radius: 200px;
  color: #888c90;
  margin-bottom: 32px;
  font-size: 15px;
`;

const DownloadLink = styled.button`
  border: none;
  background: transparent;
  color: #adb5bd;
  text-align: center;
  margin: auto;
  font-size: 14px;
  display: block;
  position: relative;

  &::after {
    content: "";
    height: 1px;
    background-color: #adb5bd;
    position: absolute;
    bottom: 1px;
    left: 6px;
    right: 6px;
  }
`;

const Later = styled.div`
  display: inline-block;
  color: #3e906a;
  padding: 6px 12px;
  background: #dfece7;
  border-radius: 20px;
  font-size: 14px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
`;
