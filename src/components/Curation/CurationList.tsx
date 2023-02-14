import React from "react";
import PropTypes from "prop-types";
import CurationItem from "./CurationItem";

const CurationList = ({ title, curationList, setCurationList }) => {
  return (
    <div>
      <p className="md: font-bold">{title}</p>
      <ul>
        {curationList &&
          curationList.map((curationItem: any) => (
            <CurationItem
              key={curationItem.id}
              curationItem={curationItem}
              curationList={curationList}
              setCurationList={setCurationList}
            />
          ))}
      </ul>
    </div>
  );
};

CurationList.propTypes = {
  title: PropTypes.string.isRequired,
  curationList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setCurationList: PropTypes.func.isRequired,
};

export default CurationList;
