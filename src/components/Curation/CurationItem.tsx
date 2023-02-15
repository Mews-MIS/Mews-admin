import React, { useState, useRef, useEffect } from "react";
import CurationEditIcon from "../../assets/Icon/CurationEditIcon.svg";
import CurationDeleteIcon from "../../assets/Icon/CurationDeleteIcon.svg";
import EditComplete from "../../assets/Icon/EditComplete.svg";
import PropTypes from "prop-types";

const CurationItem = ({ curationItem, curationList, setCurationList }) => {
  const onChangeCheckbox = () => {
    const nextCurationList = curationList.map(
      (item: { id: number; checked: boolean }) => ({
        ...item,
        checked: item.id === curationItem.id ? !item.checked : item.checked,
      })
    );

    setCurationList(nextCurationList);
  };

  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(curationItem.text);

  const editInputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const onClickSubmitButton = () => {
    const nextCurationList = curationList.map((item) => ({
      ...item,
      text: item.id === curationItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
    }));
    setCurationList(nextCurationList); // 새로운 리스트를 넣어줌

    setEdited(false); // 수정모드를 다시 읽기모드로 변경
  };

  return (
    <div>
      <li>
        {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
        <input
          type="checkbox"
          checked={curationItem.checked}
          onChange={onChangeCheckbox}
        />
        {/* 아이템 내용 */}
        {edited ? (
          <input
            type="text"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
          />
        ) : (
          <span
            className={`todoapp__item-ctx ${
              curationItem.checked ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {curationItem.text}
          </span>
        )}
        {/* 수정 버튼 */}
        {!curationItem.checked ? (
          edited ? (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickSubmitButton}
            >
              <img src={EditComplete} alt={"큐레이션수정"} />
            </button>
          ) : (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              <img src={CurationEditIcon} alt={"큐레이션수정"} />
            </button>
          )
        ) : null}
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
