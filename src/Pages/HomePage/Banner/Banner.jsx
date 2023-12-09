import React, { useState } from "react";
import banner from "../../../assets/logo/banner.png";
import Container from "../../../components/Container";
import "react-awesome-button/dist/styles.css";
import usePublicAxios from "../../../hooks/usePublicAxios";
import usePosts from "../../../hooks/usePosts";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";


const Banner = () => {
  const [search, setSearch] = useState("");
  const publicAxios = usePublicAxios()
  const [posts] = usePosts()

  const filterSearchPost = posts.find(
    (item) => item?.tag.toLowerCase() === search.toLowerCase()
  );
  console.log(filterSearchPost?._id);
  const handleSearch = async () => {
    try {
      const res = await publicAxios.post('/search', {search})
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container>
      <div className="lg:flex items-center">
        <div className="lg:w-2/3 mb-7 text-center lg:text-left space-y-5  items-center">
          <h1 className="text-5xl font-extrabold text-blue-200">
            DiscussHub: Engage, Share, LearnKE <br />
            <span data-aos="flip-down" className="text-[#ff56229a]">
              Search & Discover
            </span>
          </h1>
          <p className="md:w-3/4 text-gray-400">
            Effortlessly find relevant discussions using our powerful search
            functionality. Unearth valuable insights and connect with
            like-minded individuals
          </p>
          <div>
            <div className="join flex justify-center items-center lg:mr-20">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input w-full input-bordered join-item bg-black text-white"
                placeholder="Search Tag Here...."
              />
              <Link
                to={`posts/${filterSearchPost?._id}`}
                onClick={handleSearch}
              >
                <AwesomeButton type="primary">Search</AwesomeButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center lg:justify-start">
          <img className="rounded-full w-full md:w-96" src={banner} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
