import ScheduleItem from "../components/ScheduleItem";
import styled from "@emotion/styled";
import axios, { AxiosStatic } from "axios";
import { useEffect, useState } from "react";
import CalendarAPI from "../api/CalendarAPI";

export interface IScheduleProps {
  title: string,
  startDate: number[],
  endDate: number[]
}

interface IDataType {
  id?: number,
  title: string,
  category: string,
  startDate: number[],
  endDate: number[]
}

const ScheduleEdit = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedules, setSchedules] = useState([]);
  
  const [category, setCategory] = useState("");

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setStartDate(e.target.value);
  }

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEndDate(e.target.value);
  }

  /* api 받아 옴 */
  useEffect(() => {
    const schedules: Promise<any> = CalendarAPI.getSchedule();
    schedules.then((data) => {
      setSchedules(data);
    })
  }, []);

  // async function getData() {
  //   return await axios.get('http://13.209.163.188:8080/calendar/getall')
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //   ;
  // };

  // useEffect(() => {
  //   getData();
  // }, [])

  return (
    <Wrapper>
      <Container>
        <Title>현재 적용된 스케줄</Title>
        <ScheduleListContainer>
          {
            schedules &&
            schedules.map((item: IDataType) => {
              return <ScheduleItem title={item.title} startDate={item.startDate} endDate={item.endDate} />
            })
          }
        </ScheduleListContainer>
      </Container>

      <Container>
        <Title>스케줄 추가</Title>

          <ScheduleInput>
            <ScheduleSelect placeholder="일정 종류" onChange={handleCategory}>
              <option key="동국대학교" value="동국대학교">동국대학교</option>
              <option key="경영정보학과" value="경영정보학과">경영정보학과</option>
              <option key="Mews" value="Mews">Mews</option>
            </ScheduleSelect>
            <ScheduleTitleInput type="text"/>
            <ScheduleDateInput type="date" placeholder="시작 날짜" onChange={handleStartDate}/>
            <ScheduleDateInput type="date" placeholder="종료 날짜" onChange={handleEndDate}/>
          </ScheduleInput>
      </Container>


    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 50px;
`

const Title = styled.div`
  font-size: large;
  font-weight: bold;
`;

const ScheduleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid;
`;

const ScheduleInput = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid;
`;

const ScheduleTitleInput = styled.input`
  width: 60%;
`;

const ScheduleDateInput = styled.input`
  width: 20%;
`;

const ScheduleSelect = styled.select`
  
`

export default ScheduleEdit;
