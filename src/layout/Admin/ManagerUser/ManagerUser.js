import React, { useEffect, useState } from 'react';
import { db } from '~/connectFirebase/config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './ManagerUser.css';

function ManagerUser() {
  const [userData, setUserData] = useState([]);
  const [isUserBanned, setIsUserBanned] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'user');
      const querySnapshot = await getDocs(colRef);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUserData(users);
    };

    fetchData();
  }, []);

  const handleBanUser = async (userId) => {
    const confirmBan = window.confirm('Are you sure you want to ban this user?');
    if (!confirmBan) {
      return;
    }

    try {
      const userRef = doc(db, 'user', userId);
      await updateDoc(userRef, { banned: true });
      console.log(`User with ID ${userId} has been banned.`);

      // Update the user's status in the local state
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.uid === userId ? { ...user, banned: true } : user
        )
      );
      setIsUserBanned(true); // Set the flag to display the ban message
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  // Calculate the indexes of the first and last users of the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div
      className="ManagerUser-container"
      style={{
        minHeight: 'calc(100vh - 70px - 90px)',
        backgroundColor: '#ffff',
        height: '100%',
        textOverflow: 'auto',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '1rem',
      }}
    >
      <h2 className="table-heading">User List</h2>
      {isUserBanned && <p>User has been banned.</p>} {/* Display the ban message */}
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>DisplayName</th>
            <th>Email</th>
            <th>CreatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>{user.createAt}</td>
              <td>
                {user.banned ? (
                  'Banned'
                ) : (
                  <button onClick={() => handleBanUser(user.uid)}>Cấm</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: Math.ceil(userData.length / usersPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === Math.ceil(userData.length / usersPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ManagerUser;
