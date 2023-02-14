import React, { useState } from "react";
import AddCuration from "../components/Curation/AddCuration";
import CurationList from "../components/Curation/CurationList";

const CurationEdit = () => {
  const [curationList, setCurationList] = useState([]);
  return (
    <div>
      <AddCuration
        curationList={curationList}
        setCurationList={setCurationList}
        setCuraitonList={function (...args: any[]) {
          throw new Error("Function not implemented.");
        }}
      />
      <CurationList
        title={"전체 글"}
        curationList={curationList}
        setCurationList={setCurationList}
        checkedList={false}
      />

      <CurationList
        title={"선택된 글"}
        curationList={curationList}
        setCurationList={setCurationList}
        checkedList={true}
      />
    </div>
  );
};

export default CurationEdit;
