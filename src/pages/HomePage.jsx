import React, { useEffect, useState } from "react";
import ThreadItem from "../components/ThreadItem";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ThreadTag from "../components/ThreadTag";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import {
  asyncUpVoteProcess,
  asyncDownVoteProcess,
  asyncNeutralVoteProcess,
} from "../states/voteThreads/action";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ searchQuery }) => {
  const { threads, users, authUser } = useSelector(
    (state) => ({
      users: state.users,
      threads: state.threads,
      authUser: state.authUser,
      voteThreads: state.voteThreads,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

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
      .includes(searchQuery?.toLowerCase() || "");
    return isCategoryMatch && isSearchMatch;
  });

  const threadsWithUser = filteredData.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  const handleCreateThread = () => {
    navigate("/new");
  };

  const handleLikeClick = (value, threadId) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (value) {
      dispatch(asyncUpVoteProcess(threadId));
    } else {
      dispatch(asyncNeutralVoteProcess(threadId));
    }
  };

  const handleDislikeClick = (value, threadId) => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    if (value) {
      dispatch(asyncDownVoteProcess(threadId));
    } else {
      dispatch(asyncNeutralVoteProcess(threadId));
    }
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
            const upVotesBy = Array.isArray(item.upVotesBy)
              ? item.upVotesBy
              : [];
            const downVotesBy = Array.isArray(item.downVotesBy)
              ? item.downVotesBy
              : [];

            const hasUpVoted = authUser
              ? upVotesBy.includes(authUser.id)
              : false;
            const hasDownVoted = authUser
              ? downVotesBy.includes(authUser.id)
              : false;

            return (
              <ThreadItem
                key={item.id}
                data={{
                  ...item,
                  likes: upVotesBy.length,
                  dislikes: downVotesBy.length,
                  comments: item.totalComments,
                  authUser: authUser,
                  isDetail: false,
                }}
                onLikeClick={(value) => handleLikeClick(value, item.id)}
                onDislikeClick={(value) => handleDislikeClick(value, item.id)}
                initialLikeActive={hasUpVoted}
                initialDislikeActive={hasDownVoted}
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

      {authUser && (
        <button
          className="fab"
          onClick={handleCreateThread}
          aria-label="Tambah diskusi"
        >
          <Plus size={20} color="white" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
