import React from 'react';
import { IScheduleProps } from '../../pages/ScheduleEdit';
import * as s from "./styles";
import DeleteScheduleItem from "../../assets/Icon/DeleteScheduleItem.svg";

const ScheduleItem = ({title, startDate, endDate}: IScheduleProps) => {
  const startYear = startDate[0];
  const startMonth = startDate[1];
  const startDay = startDate[2];

  const endYear = endDate[0];
  const endMonth = endDate[1];
  const endDay = endDate[2];
  
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
