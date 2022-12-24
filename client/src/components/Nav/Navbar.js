import React from "react";
import { NavLink } from "react-router-dom";
import { category } from "../../data";

const Navbar = () => {
  const activeClassName = "pb-[5px] border-b-2 border-sky-500 text-sky-500";

  const menu = category.map((element, index) => {
    return (
      <li key={index}>
        <NavLink
        // to={`${element.title}`}
        // className={({ isActive }) =>
        //   (isActive ? activeClassName : undefined) ||
        //   "transition hover:text-sky-500"
        // }
        >
          {element.subTitle}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="flex justify-center py-[30px]">
      <ul className="flex justify-between w-[450px]">{menu}</ul>
    </div>
  );
};

export default Navbar;
