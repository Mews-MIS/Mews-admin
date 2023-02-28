import styled from "@emotion/styled";

export const Wrapper = styled.div`
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
`;

export const LeftSide = styled.div`
    display: flex;
    align-items: center;
`;

export const DeleteBtn = styled.img`
    src: ${(props) => props.src};
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-left: 10px;
`;

export const Title = styled.div`
    margin-left: 10px;
`;

export const RightSide = styled.div`
    margin-right: 20px;
`;