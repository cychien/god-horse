import Router from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { saveBgImg, saveTicket } from "../../features/ticket";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";

export default function Bike() {
  const user = useSelector((state) => state.user);
  const ticket = useSelector((state) => state.ticket);

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const axiosInstance = axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_HOST
        : process.env.NEXT_PUBLIC_PROD_HOST,
    headers: { "x-api-key": "god-horse" },
  });

  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: true,
  });

  const {
    isLoading: isLoadingEventStatus,
    isError: isEventStatusError,
    data: eventStatus,
  } = useQuery("event_status", () =>
    axiosInstance.get("/api/v1/get_status").then((res) => res.data)
  );

  const { isLoading: isLoadingTickets, refetch } = useQuery(
    "refresh_tickets",
    () =>
      axiosInstance
        .get("/api/v1/refresh?sheet_name=20210227")
        .then((res) => res.data)
        .then(() => {
          queryClient.invalidateQueries("event_status");
        }),
    {
      enabled: false,
    }
  );

  const {
    isLoading: isSendingEmails,
    refetch: sendEmail,
  } = useQuery(
    "send_email",
    () =>
      axiosInstance
        .post("/api/v1/send_all_emails", { dir_name: "20210227" })
        .then((res) => res.data),
    { enabled: false }
  );

  // .get("/api/v1/img/20210227/template.jpg", { responseType: "blob" })
  const { isFetching: isFetchingBgImg } = useQuery(
    "ticket_bg_img",
    () =>
      axiosInstance
        .post("/api/v1/img/20210227/template2.jpg", null, {
          responseType: "blob",
        })
        .then((res) => {
          const data = res.data;
          dispatch(saveBgImg(URL.createObjectURL(data)));
        }),
    { staleTime: 5 * 60 * 1000 }
  );

  const { isFetching: isFetchingTicket, refetch: refetchTicket } = useQuery(
    "fetch_ticket",
    () =>
      axiosInstance
        .get(
          `/api/v1/get_ticket?sheet_name=20210227&email=${user.email}&name=${user.name}`
        )
        .then((res) => res.data)
        .then((json) =>
          dispatch(saveTicket({ number: json.number, words: json.words }))
        ),
    {
      enabled: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  const canStartLot = !isLoadingTickets && !eventStatus?.tickets;
  const canSendEmail = !isSendingEmails && !eventStatus?.user_email_dict;
  const canDrawLot = !isLoadingEventStatus && eventStatus?.tickets;
  const hasTicket = ticket?.number && ticket?.number !== -1;

  return (
    <Container>
      <Head ref={ref}>
        <SubTitle>神駒團</SubTitle>
        <Title>南神駒</Title>
      </Head>
      <AnimatePresence>
        {!inView && (
          <StickyHead
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 48, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <StickyHeadTitle>南神駒</StickyHeadTitle>
          </StickyHead>
        )}
      </AnimatePresence>
      <Main>
        <JourneySection>
          <SectionHead>
            <SectionTitle>今日行程</SectionTitle>
            <Operations>
              {user?.role === "admin" && (
                <StartLotButton
                  disabled={!canSendEmail}
                  onClick={() => sendEmail()}
                >
                  {eventStatus?.user_email_dict ? "已寄送" : "寄送完騎證明"}
                </StartLotButton>
              )}
              {user?.role === "admin" && (
                <StartLotButton
                  disabled={!canStartLot}
                  onClick={() => refetch()}
                >
                  {eventStatus?.tickets ? "已抽過箴言" : "開始抽箴言"}
                </StartLotButton>
              )}
              <DrawLotButton
                disabled={!canDrawLot}
                onClick={() => {
                  if (!hasTicket) {
                    refetchTicket();
                    // TODO: wait
                    Router.push("/bike/ticket");
                  } else {
                    Router.push("/bike/ticket");
                  }
                }}
                //{number: "146", words: "test146"}
              >
                {/* TODO: */}
                {hasTicket ? "查看箴言" : "抽箴言"}
              </DrawLotButton>
            </Operations>
          </SectionHead>
          <SectionBody>
            <Later>
              👨‍💻 <span style={{ marginLeft: "0px" }}>稍後推出</span>
            </Later>
            <Calendar disabled>
              <Timeline>
                <TimePoint>06:00</TimePoint>
                <TimePoint>07:00</TimePoint>
                <TimePoint>08:00</TimePoint>
                <TimePoint>09:00</TimePoint>
                <TimePoint>10:00</TimePoint>
                <TimePoint>11:00</TimePoint>
                <TimePoint>12:00</TimePoint>
              </Timeline>
              <Events></Events>
            </Calendar>
          </SectionBody>
        </JourneySection>
      </Main>
      {/* <TicketWrapper>
        {hasTicket && <TicketBgImg src={ticket.bgImg} />}
        <TicketWords>{ticket.words}</TicketWords>
      </TicketWrapper> */}
    </Container>
  );
}

const Container = styled.div`
  padding-top: 24px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Head = styled.div`
  margin-bottom: 32px;
`;

const SubTitle = styled.div`
  color: #6c757d;
  font-size: 14px;
`;

const Title = styled.h1`
  margin: 0;
  color: #343a40;
  font-size: 24px;
  font-weight: 500;
`;

const Main = styled.div`
  margin-bottom: 120px;
`;

const JourneySection = styled.div``;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #6c757d;
  font-size: 18px;
  font-weight: 400;
`;

const Operations = styled.div`
  display: flex;
  align-items: center;

  & *:not(:last-child) {
    margin-right: 6px;
  }
`;

const SectionBody = styled.div`
  position: relative;
`;

const Later = styled.div`
  left: 50%;
  top: 5%;
  transform: translate(-50%, -5%);
  color: #3e906a;
  position: absolute;
  padding: 6px 12px;
  background: #dfece7;
  border-radius: 20px;
  font-size: 14px;
  z-index: 99;
`;

const Calendar = styled.div`
  opacity: ${(props) => (props.disabled ? "0.2" : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "default")};
  background: ${(props) => (props.disabled ? "#ddd" : "transparent")};
`;

const Timeline = styled.div``;

const TimePoint = styled.div`
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: #343a40;
  font-weight: 600;
  margin-bottom: 61px;
  position: relative;

  &::after {
    content: "";
    height: 1px;
    width: 20px;
    background-color: #ced4da;
    position: absolute;
    left: 0;
    bottom: -30px;
    border-radius: 4px;
  }
`;

const Events = styled.div``;

const StartLotButton = styled.button`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 3px;
  background: #21a4f4;
  color: #fff;
  border: none;
  font-size: 14px;

  &:disabled {
    opacity: 30%;
  }
`;

const DrawLotButton = styled.button`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 3px;
  background: #ffcd00;
  color: #343a40;
  border: none;
  font-size: 14px;

  &:disabled {
    opacity: 30%;
  }
`;

const TicketWrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;

const TicketBgImg = styled.img`
  width: 100%;
`;

const TicketWords = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StickyHead = styled(motion.div)`
  background: #fff;
  padding: 0px 20px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  z-index: 99;
`;

const StickyHeadTitle = styled.div`
  color: #343a40;
  font-size: 16px;
`;

// box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
