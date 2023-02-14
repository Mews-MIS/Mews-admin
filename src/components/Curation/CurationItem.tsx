import React from "react";
import CurationEditIcon from "../../assets/Icon/CurationEditIcon.svg";
import CurationDeleteIcon from "../../assets/Icon/CurationDeleteIcon.svg";
import PropTypes from "prop-types";

const CurationItem = ({ curationItem, curationList, setCurationList }) => {
  return (
    <div>
      <li>
        {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
        <input type="checkbox" className="todoapp__item-checkbox" />
        {/* 아이템 내용 */}
        <span className="todoapp__item-ctx">{curationItem.text}</span>
        {/* 수정 버튼 */}
        <button type="button" className="todoapp__item-edit-btn">
          <img src={CurationEditIcon} alt={"큐레이션수정"} />
        </button>
        {/* 삭제 버튼 */}
        <button type="button" className="todoapp__item-delete-btn">
          <img src={CurationDeleteIcon} alt={"큐레이션삭제"} />
        </button>
      </li>
    </div>
  );
};

CurationItem.propTypes = {
  curationItem: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
  }),
  curationList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setCurationList: PropTypes.func.isRequired,
};

export default CurationItem;
