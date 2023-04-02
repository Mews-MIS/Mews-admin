import { useEffect, useState } from "react";
import CurationAPI from "../../api/CurationAPI";
import AddCurationItem from "../../assets/Icon/CurationAdd.svg";
import DeleteScheduleItem from "../../assets/Icon/DeleteScheduleItem.svg";
import { CurationAllProps, CurationData, CurationUpdateProps } from "../UpdateCuration";
import * as s from "./styles";

const checkCuration = () => {
  const [curations, setCurations] = useState<CurationAllProps>();
  const [curation, setCuration] = useState<CurationUpdateProps | null>(null);
  const [ischecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    CurationAPI.getAllCuration(curations).then((data) => {
      setCurations(data);
    });
  }, []);
  const checkedCuration = async (id: number, ischecked: boolean) => {
    try {
      // const res = await CurationAPI.checkCurationId(id, true);
      // console.log("78787878", res);
      const data = await CurationAPI.getCurationId(id);
      const info: CurationData = {
        id: id,
        title: data.title,
      };
      // setCurations((prevState: any) => {
      //   return {
      //     ...prevState.chekced,
      //     checked: prevState.checked.concat(info),
      //   };
      // });
      const res = await CurationAPI.checkCurationId(info.id, true);
      console.log("78787878", res);
      console.log("aaaaaaaa", curations);
      setIsChecked(!ischecked);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelCuration = async (id: number, ischecked: boolean) => {
    try {
      await CurationAPI.checkCurationId(id, false);

      setCurations((prevState: any) => {
        return {
          ...prevState,
          checked: prevState.checked.filter((curation: any) => curation.id !== id),
        };
      });
      setIsChecked(!ischecked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen text-gray-900">
      <div className="w-full h-full pl-8 pt-8 flex">
        <div className="w-1/2">
          <p className="text-md font-bold">큐레이션 목록</p>
          <div className="flex flex-col justify-center mt-2">
            {curations?.allCuration &&
              curations.allCuration.map((data) => (
                <div
                  key={data.id}
                  className="flex flex-row items-center border-solid border-[1px] w-5/6 h-[45px] cursor-pointer"
                >
                  <s.AddBtn
                    src={AddCurationItem}
                    alt="추가버튼"
                    onClick={() => data.id != null && checkedCuration(data.id, ischecked)}
                  />
                  <div className="text-lg ml-2 font-bold">{data.title}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-md font-bold">표시된 큐레이션</p>
          <div className="flex flex-col justify-center mt-2">
            {curations?.checked &&
              curations.checked.map((data) => (
                <div
                  key={data.id}
                  className="flex flex-row items-center border-solid border-[1px] w-5/6 h-[45px] cursor-pointer"
                >
                  <s.DeleteBtn
                    src={DeleteScheduleItem}
                    alt="삭제버튼"
                    onClick={() => data.id != null && cancelCuration(data.id, ischecked)}
                  />
                  <div className="text-lg ml-2 font-bold">{data.title}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default checkCuration;
