import React, { useEffect, useState } from "react";
import queryString from "query-string";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserExcerpt from "../components/Body/Admin/UserExcerpt";
import Pagination from "../components/Body/global/Pagination";

const getUserURL = `/api/user`;
const AdminPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [allUserCount, setAllUserCount] = useState(0);

  const getUserList = async () => {
    const response = await axiosPrivate.get(getUserURL, {
      params: {
        page,
        itemPerPage,
      },
    });
    setUserList(response.data?.foundUser);
    setAllUserCount(response.data?.allUserCount);
  };

  useEffect(() => {
    if (queryString?.parse(window.location.search)?.page) {
      setPage(parseInt(queryString.parse(window.location.search).page));
    }
  }, []);

  useEffect(() => {
    if (page === "") return;
    getUserList();
  }, [page]);

  return (
    <div>
      <div className="flex justify-center min-h-[500px]">
        <ul className="w-4/5">
          {userList.map((element, idx) => (
            <UserExcerpt userInfo={element} key={idx} />
          ))}
        </ul>
      </div>
      <section>
        <Pagination
          allUserCount={allUserCount}
          itemPerPage={itemPerPage}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </section>
    </div>
  );
};

export default AdminPage;
