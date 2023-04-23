import ScheduleItem from "../components/ScheduleItem";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import CalendarAPI from "../api/CalendarAPI";

export interface IDataType {
  id?: number;
  title: string;
  category?: string;
  startDate: string;
  endDate: string;
}

const ScheduleEdit = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [schedules, setSchedules] = useState<IDataType[]>([]);
  const [existSchedules, setExistSchedules] = useState([]); // 기존 DB에 존재하는 일정 리스트 상태

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setStartDate(e.target.value);
    console.log({ startDate });
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEndDate(e.target.value);
    console.log({ endDate });
  };

  const addSchedule = () => {
    console.log({ startDate }, { endDate });
    const newSchedule: IDataType = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      category: category,
    };
    console.log({ newSchedule });
    CalendarAPI.postSchedule(newSchedule);
  };

  const resetSchedule = () => {
    confirmDelete?.();
  };

  const useConfirm = (message: any, onConfirm: any, onCancel: any) => {
    if (!onConfirm || typeof onConfirm !== "function") return;
    if (onCancel && typeof onCancel !== "function") return;

    const confirmAction = () => {
      if (window.confirm(message)) onConfirm();
      else onCancel();
    };

    return confirmAction;
  };

  const deleteConfirm = () => {
    setSchedules([...existSchedules]);
    console.log("삭제했습니다.");
  };
  const cancelConfirm = () => {
    console.log("취소했습니다.");
  };

  const confirmDelete = useConfirm(
    "추가/삭제한 데이터가 사라집니다.\n삭제하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );

  useEffect(() => {
    const schedules: Promise<any> = CalendarAPI.getSchedule();
    schedules.then((data) => {
      setSchedules(data);
      setExistSchedules(data);
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>현재 적용된 스케줄</Title>
        <ScheduleListContainer>
          {schedules &&
            schedules.map((item: IDataType) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <ScheduleItem
                  key={item.id}
                  id={item.id}
                  category={item.category}
                  title={item.title}
                  startDate={item.startDate}
                  endDate={item.endDate}
                />
              );
            })}
        </ScheduleListContainer>
      </Container>

      <Container>
        <Title>스케줄 추가</Title>

        <ScheduleInput>
          <ScheduleSelect placeholder="일정 종류" onChange={handleCategory}>
            <option key="동국대학교" value="동국대학교">
              동국대학교
            </option>
            <option key="경영정보학과" value="경영정보학과">
              경영정보학과
            </option>
            <option key="Mews" value="Mews">
              Mews
            </option>
          </ScheduleSelect>
          <ScheduleTitleInput type="text" value={title} onChange={handleTitle} />
          <ScheduleDateInput type="date" placeholder="시작 날짜" onChange={handleStartDate} />
          <ScheduleDateInput type="date" placeholder="종료 날짜" onChange={handleEndDate} />
        </ScheduleInput>
      </Container>

      <Container>
        <BtnContainer>
          <CancelBtn onClick={resetSchedule}>취소</CancelBtn>
          <AddBtn onClick={addSchedule}>추가</AddBtn>
        </BtnContainer>
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
`;

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

const ScheduleSelect = styled.select``;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  margin-top: 10px;
  font-weight: bold;
  color: white;
`;

const CancelBtn = styled.button`
  width: 85px;
  height: 42px;
  background-color: #808080;
  border: 0px;
  border-radius: 10px;
  margin-right: 50px;
`;

const AddBtn = styled.button`
  width: 85px;
  height: 42px;
  background-color: #ff9136;
  border: 0px;
  border-radius: 10px;
`;

export default ScheduleEdit;
