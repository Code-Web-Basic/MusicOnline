import React, { useEffect, useState } from 'react';
import { db } from '~/connectFirebase/config';
import { collection, getDocs } from 'firebase/firestore';

import './ManagerListMusic.css';

function ManagerListMusic() {
  // musicData, setMusicData
  const [musicData, setMusicData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'music');
      const querySnapshot = await getDocs(colRef);
      const musics = [];
      querySnapshot.forEach((doc) => {
        musics.push(doc.data());
      });
      setMusicData(musics);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchKeyword.trim() !== '') {
      const results = musicData.filter((user) =>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(musicData);
    }
  }, [searchKeyword, musicData]);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = searchResults.slice(startIndex, endIndex);

  return (
    <div className="ManagerUser-container">
      <h2 className="table-heading">List Music</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchKeyword}
          onChange={handleSearch}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Singer</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((music) => (
            <tr key={music.uid}>
              <td>{music.name}</td>
              <td>{music.description}</td>
              <td>{music.singer}</td>
              <td>{music.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={handleClickPrev}
        >
          Prev
        </button>
        <span className="pagination-page">{currentPage}</span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ManagerListMusic;
