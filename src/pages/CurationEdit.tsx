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
      />
      <CurationList
        title={"선택된일"}
        curationList={curationList}
        setCurationList={setCurationList}
      />
    </div>
  );
};

export default CurationEdit;
