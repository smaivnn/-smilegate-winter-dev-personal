import React, { useState, useEffect } from "react";
import { roles_list } from "../../../data";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { userStore } from "../../../app/store";

const roleChangeURL = `/api/user/role`;
const deleteUserURL = `/api/user`;
const UserExcerpt = (props) => {
  const axiosPrivate = useAxiosPrivate();

  const { accessToken } = userStore();
  // const [roleArray, setRoleArray] = useState(new Set());
  const [id, setId] = useState(props.userInfo.id);
  const roleArray = new Set();
  const setCheckedItemToArray = (role) => {
    if (!roleArray.has(role)) {
      roleArray.add(role);
      // setRoleArray(roleArray);
    } else {
      roleArray.delete(role);
      // setRoleArray(roleArray);
    }
  };

  const deleteBtnClk = async () => {
    const response = await axiosPrivate.delete(deleteUserURL, {
      data: { id },
    });
    if (response.data.success) {
      alert(`탈퇴처리가 되었습니다.`);
      window.location.reload();
    }
  };

  const roleChangeBtnClk = async () => {
    const roles = Array.from(roleArray);
    const response = await axiosPrivate.patch(roleChangeURL, {
      id,
      roles,
    });

    if (response.data.success) {
      alert("변경 되었습니다.");
      window.location.reload();
    }
  };

  let checkBox = Object.keys(roles_list).map((element, idx) => {
    if (props?.userInfo?.roles[element] === roles_list[element]) {
      roleArray.add(element);
      // setRoleArray(roleArray);
      return (
        <label key={idx} className="mr-[10px]">
          {element}
          <input
            type="checkbox"
            role={element}
            className="ml-[3px]"
            onChange={() => setCheckedItemToArray(element)}
            defaultChecked
          />
        </label>
      );
    } else
      return (
        <label key={idx} className="mr-[10px]">
          {element}
          <input
            type="checkbox"
            role={element}
            className="ml-[3px]"
            onChange={() => setCheckedItemToArray(element)}
          />
        </label>
      );
  });

  return (
    <div className="">
      <li className="mb-[15px] border border-1 border-black h-[80px] rounded-md flex justify-around items-center text-sm">
        <span className="">{props.userInfo._id}</span>
        <span className="">{props.userInfo.id}</span>
        <span className="">{props.userInfo.name}</span>
        <span className="">{props.userInfo.nickname}</span>
        <span className="">{props.userInfo.email}</span>
        <div className="border border-1 border-black p-[8px] rounded-md">
          {checkBox}
          <button onClick={() => roleChangeBtnClk()}>변경</button>
        </div>

        <button onClick={() => deleteBtnClk()}>탈퇴</button>
      </li>
    </div>
  );
};

export default UserExcerpt;
