import React from "react";

const HomePage = ({ searchQuery }) => {
  const data = [
    { id: 1, title: "Diskusi React" },
    { id: 2, title: "Diskusi Vue" },
    { id: 3, title: "Diskusi Angular" },
  ];

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Beranda</h1>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((item) => <div key={item.id}>{item.title}</div>)
        ) : (
          <p>Data tidak ditemukan</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
