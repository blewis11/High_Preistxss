import React, { useState } from 'react'

import { SideNav } from './SideNav'

const FirstScene = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="sidebarContainer">
      <SideNav open={open} setOpen={setOpen} />
    </div>
  )
}

export {
  FirstScene
}
