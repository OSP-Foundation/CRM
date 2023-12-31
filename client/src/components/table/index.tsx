import React from 'react'

interface props {
  children: React.ReactNode;
  className?: string
}

const Table = ({ children }: props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Table