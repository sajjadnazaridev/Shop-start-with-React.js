import React from "react";
import PropTypes from "prop-types";
import { RiFileList2Fill } from "react-icons/ri";

function Sidebar(props) {
  return (
    <div className="size-full p-4 rounded-2xl bg-gray-100">
      <div>
        <RiFileList2Fill />
      </div>
      <ul className="*:cursor-pointer *:mb-2">
        <li>All</li>
        <li>Electronics</li>
        <li>Jewelery</li>
        <li>Men&apos;s clothing</li>
        <li>Women&apos;s clothing</li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
