import React, { useEffect, useState } from "react";
import ThreadItem from "../components/ThreadItem";
import { useDispatch, useSelector } from "react-redux";
import ThreadTag from "../components/ThreadTag";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";

const HomePage = ({ searchQuery }) => {
  const { threads = [], users = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
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

  const threadsWithUser = filteredData.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

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
        {threadsWithUser.length > 0 ? (
          threadsWithUser.map((item) => {
            return (
              <ThreadItem
                key={item.id}
                title={item.title}
                tag={item.category}
                body={item.body}
                likes={item.upVotesBy.length}
                dislikes={item.downVotesBy.length}
                comments={item.totalComments}
                createdBy={item.user?.name}
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
