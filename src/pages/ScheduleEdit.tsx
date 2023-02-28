import ScheduleItem from "../components/ScheduleItem";
import styled from "@emotion/styled";
import axios, { AxiosStatic } from "axios";
import { useEffect, useState } from "react";

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
  /* api 받아 옴 */

  async function getData() {
    return await axios.get(
      'http://13.209.163.188:8080/calendar/getall',
      {
        headers: {
          Authorization: `
            Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dGVzdDMxOUBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjc2OTY2NDYzLCJleHAiOjE2NzY5NzAwNjN9.4tcQkHsPiIlQcOzqtBVmSKAQceqELNxf-jlOznf0qehD7VgGOreh7M3p1ILmkB0OZS7z3C7oJA4AIvnnoi0lKw
          `
        }
      }
    )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      })
    ;
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <Wrapper>
      <Container>
        <Title>현재 적용된 스케줄</Title>
        <ScheduleListContainer>
          {
            data.map((item: IDataType) => {
              return <ScheduleItem title={item.title} startDate={item.startDate} endDate={item.endDate} />
            })
          }
        </ScheduleListContainer>
      </Container>

      <Container>
        <Title>스케줄 추가</Title>
          <ScheduleInput>
            <ScheduleTitleInput type="text"/>
            <ScheduleDateInput type="date" placeholder="시작 날짜"/>
            <ScheduleDateInput type="date" placeholder="종료 날짜"/>
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

export default ScheduleEdit;
