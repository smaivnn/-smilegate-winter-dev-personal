import React from "react";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();
  return (
    <div className="text-6xl" onClick={() => navigate(`/`)}>
      Authorization
    </div>
  );
};

export default Title;
