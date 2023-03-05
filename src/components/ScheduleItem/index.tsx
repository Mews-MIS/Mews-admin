import React from 'react';
import { IScheduleProps } from '../../pages/ScheduleEdit';
import * as s from "./styles";
import DeleteScheduleItem from "../../assets/Icon/DeleteScheduleItem.svg";

const ScheduleItem = ({title, startDate, endDate}: IScheduleProps) => {
  const startYear = startDate[0];
  let startMonth = ("00"+startDate[1]).slice(-2);
  let startDay = ("00"+startDate[2]).slice(-2);
  

  const endYear = endDate[0];
  let endMonth = ("00"+endDate[1]).slice(-2);
  let endDay = ("00"+endDate[2]).slice(-2);
  
  return (
    <s.Wrapper>
      <s.LeftSide>
        <s.DeleteBtn src={DeleteScheduleItem} alt="삭제버튼" />
        <s.Title>{title}</s.Title>
      </s.LeftSide>

      <s.RightSide>{startYear}.{startMonth}.{startDay} - {endYear}.{endMonth}.{endDay}</s.RightSide>
    </s.Wrapper>
  )
};

export default ScheduleItem;
