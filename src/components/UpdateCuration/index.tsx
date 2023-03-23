import React, { useEffect, useState } from "react";
import CurationAPI from "../../api/CurationAPI";
import DeleteScheduleItem from "../../assets/Icon/DeleteScheduleItem.svg";
import * as s from "./styles";

export interface CurationData {
  id: number;
  title: string;
}

export interface CurationAllProps {
  allCuration: CurationData[];
  checked: CurationData[];
}

export interface GetOneCurationProps {
  list: [];
  title: string;
  modifiedAt?: string;
}

const UpdateCuration = () => {
  const [curations, setCurations] = useState<CurationAllProps>();
  const [curation, setCuration] = useState<GetOneCurationProps | null>(null);
  const [curatinId, setCurationId] = useState<number>(0);

  useEffect(() => {
    CurationAPI.getAllCuration(curations).then((data) => {
      setCurations(data);
    });
  }, []);

  return (
    <div className="w-full h-screen text-gray-900">
      <div className="w-full h-full pl-8 pt-8">
        <p className="text-md w-2/5 font-bold">생성된 큐레이션</p>
        <div className="flex justify-center mt-2">
          <div className="w-1/2">
            {curations?.allCuration &&
              curations.allCuration.map((data) => (
                <div
                  key={data.id}
                  className="flex flex-row items-center border-solid border-[1px] w-5/6 h-[45px] cursor-pointer"
                  // onClick={() => data.id != null && showEditor(data.id)}
                >
                  {/* // onClick={() => data.id != null && deleteEditor(data.id)} */}
                  <s.DeleteBtn src={DeleteScheduleItem} alt="삭제버튼" />
                  <div className="text-lg ml-2 font-bold">{data.title}</div>
                </div>
              ))}
          </div>
          <div className="w-1/2 border-solid border-[1px]">기사들 보여할 곳</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCuration;
