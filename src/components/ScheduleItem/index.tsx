import React from 'react';
import { IScheduleProps } from '../../pages/ScheduleEdit';
import * as s from "./styles";

const ScheduleItem = ({title, startDate, endDate}: IScheduleProps) => {
  return (
    <s.Wrapper>
      <s.LeftSide>
        <s.DeleteBtn>

        </s.DeleteBtn>
        <s.Title>
          {title}
        </s.Title>
      </s.LeftSide>
      <s.RightSide>{startDate} ~ {endDate}</s.RightSide>
    </s.Wrapper>
  )
};

export default ScheduleItem;
