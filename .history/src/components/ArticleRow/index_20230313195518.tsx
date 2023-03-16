import { useNavigate } from "react-router-dom";

interface ArticleRowProps {
  id: number;
  title: string;
}

const ArticleRow = ({ id, title }: ArticleRowProps) => {
  const navigate = useNavigate();

  const handleClickEvent = (id: number) => {
    navigate(`${id}`);
  };
  return (
    <div className="flex h-10 items-center border-b-2" onClick={() => handleClickEvent(id)}>
      <div className="mr-[20px]">{id}</div>
      <div>{title}</div>
    </div>
  );
};

export default ArticleRow;
