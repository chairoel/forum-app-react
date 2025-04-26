import React, { useEffect, useState } from "react";
import ThreadItem from "../components/ThreadItem";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveThreads } from "../states/threads/action";
import ThreadTag from "../components/ThreadTag";

const HomePage = ({ searchQuery }) => {
  const { threads = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredData = threads.filter((item) => {
    const isCategoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    const isSearchMatch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  const handleThreadClick = () => {
    alert("Thread diklik!");
  };

  return (
    <div className="home-container">
      <div className="categories">
        {categories.map((category) => (
          <ThreadTag
            key={category}
            tag={category}
            isSelected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            return (
              <ThreadItem
                key={item.id}
                title={item.title}
                tag={item.category}
                body={item.body}
                likes={item.upVotesBy.length}
                dislikes={item.downVotesBy.length}
                comments={item.totalComments}
                createdBy={item.ownerId}
                createdAt={item.createdAt}
                onClick={handleThreadClick}
              />
            );
          })
        ) : (
          <div
            className="not-found-container"
            style={{
              height: `${windowHeight * 0.8}px`,
            }}
          >
            <p>Data tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
