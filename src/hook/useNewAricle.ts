import { useQuery } from "react-query";
import CurationAPI from "../api/CurationAPI";

const usePostByPageNumber = (pageNumber: number) => {
  const { data, isLoading } = useQuery(["posts", pageNumber], async () => {
    const posts = await CurationAPI.getPageArticles(pageNumber, {});
    return posts;
  });

  return { data, isLoading };
};

export default usePostByPageNumber;
