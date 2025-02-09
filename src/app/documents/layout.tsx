import React from 'react'

interface DocumentLayoutProps{
    children:React.ReactNode
}

const layout = ({children}: DocumentLayoutProps) => {
  return (
    <div>{children}</div>
  )
}

export default layout