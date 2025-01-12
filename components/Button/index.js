import React from "react";

const Button = ({ children, type, onClick, classes }) => {
  const getButtonStyle = () => {
    switch (type) {
      case "primary":
        return "bg-purple-600 text-white hover:bg-purple-700";
      case "secondary":
        return "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600";
      case "outline":
        return "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800";
      default:
        return "bg-purple-600 text-white hover:bg-purple-700";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors duration-300 font-medium 
        ${getButtonStyle()} 
        ${classes || ""}`}
    >
      {children}
    </button>
  );
};

export default Button; 