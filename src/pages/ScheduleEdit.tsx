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
      '서버url/calendar/getall',
      {
        headers: {
          Authorization: `토큰값`
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
      {
        data.map((item: IDataType) => {
          return <ScheduleItem title={item.title} startDate={item.startDate} endDate={item.endDate} />
        })
      }
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default ScheduleEdit;
