import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Post from "./Post";
import usePublicAxios from "../../../hooks/usePublicAxios";
import "./post.css";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const publicAxios = usePublicAxios();
  const [count, setCount] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    publicAxios.get("/postCount").then((res) => {
      setCount(res.data.count);
    });
  }, []);

  useEffect(() => {
    publicAxios
      .get(`/posts?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      });
  }, [currentPage, itemsPerPage]);
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  // console.log(pages);
  const handlePre = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePopularity = () => {};

  return (
    <Container>
      <SectionTitle
        header={"All Post"}
        miniHeader={"User All Post here"}
      ></SectionTitle>

      <div className="text-center py-6">
        <button
          onClick={handlePopularity}
          className="btn btn-outline btn-success w-40"
        >
          popularity
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {posts.map((post) => (
          <Post key={post._id} post={post}></Post>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <button onClick={handlePre} className="btn-page">
          <FaAngleDoubleLeft></FaAngleDoubleLeft>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`btn-page ${currentPage === page ? "active-page" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn-page">
          <FaAngleDoubleRight></FaAngleDoubleRight>
        </button>
      </div>
    </Container>
  );
};

export default Posts;
