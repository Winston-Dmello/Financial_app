import React from 'react'

const Layout = ({children}) => {
  /*replace Home, Transactions, Categories, Analysis*/
  return (
    <>
      <nav>
        <ul>
          <li>Home</li>
          <li>Transactions</li>
          <li>Categories</li>
          <li>Analysis</li>
          <li>Profile</li>
        </ul>
      </nav>
      <div className='main-body'> 
        {children}
      </div>
    </>
  )
}

export default Layout