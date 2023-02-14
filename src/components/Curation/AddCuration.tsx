import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const AddCuration = ({ curationList, setCurationList }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (e: any) => {
    setText(e.target.value);
  };

  const onClickAddButton = () => {
    const nextCurationList = curationList.concat({
      id: curationList.length,
      text,
    });
    setCurationList(nextCurationList);

    setText("");
    inputRef.current.focus();
  };

  return (
    <div>
      <div className="md: font-bold">큐레이션 제목</div>
      <input
        type="text"
        name="curationItem"
        value={text}
        placeholder="제목을 입력해주세요."
        onChange={onChangeInput}
        ref={inputRef}
      />
      <button
        type="submit"
        onClick={onClickAddButton}
        className="rounded-[10px] ml-2 hover:bg-[#FFBD29] bg-[#FF9136] px-4 py-3 text-xs text-white"
      >
        추가
      </button>
    </div>
  );
};

AddCuration.propTypes = {
  curationList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ),
  setCuraitonList: PropTypes.func.isRequired,
};

export default AddCuration;
