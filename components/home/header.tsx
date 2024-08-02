"use client"

import clsx from "clsx"
type HeaderPropsType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

const Header = ({ setIsOpen, isOpen }: HeaderPropsType) => {
  const handleNavClick = () => {
    setIsOpen((prev) => {
      console.log(prev)
      return !prev
    })
  }
  return (
    <header className="bg-[#8B0105] h-[20vh] w-full flex justify-center items-center mb-14">
      <div
        onClick={handleNavClick}
        className={clsx(`tham tham-e-squeeze tham-w-10`, {
          "tham-active": isOpen,
        })}
      >
        <div className="md:hidden tham-box mx-3">
          <div className="tham-inner bg-white" />
        </div>
      </div>
      <div className="flex justify-between p-9 w-full">
        <span className="logo relative font-semibold text-[#eef2f3]">Le</span>
        <span className="logo relative font-semibold text-[#eef2f3]">
          Diables
        </span>
        <span className="logo relative font-semibold text-[#eef2f3]">
          Rouges
        </span>
        <span className="logo relative font-semibold text-[#eef2f3]">.</span>
      </div>
    </header>
  )
}

export default Header
