import React from 'react'

const Pills = ({isActive}) => {

  return (
    <span className={`text-[8px] p-[1px] px-2 py-0.5 rounded-full w-[50px] border  text-center bg-opacity-20 ${isActive ? "border-success bg-success text-success": "bg-gray-300 border-gray-600 text-dark"}`}>{isActive ? "Active": "Inactive"}</span>
  )
}

export default Pills