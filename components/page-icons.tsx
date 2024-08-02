type IconType = {
  color: string
  className?: string
}

export const Hamburger = ({ color, className }: IconType) => {
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const ham = event.currentTarget.querySelector(".ham")
    if (ham) {
      ham.classList.toggle("active")
    }
  }

  return (
    <svg
      fill={color}
      className={`${className} ham hamRotate ham4`}
      viewBox="0 0 100 100"
      width="80"
      onClick={handleClick}
    >
      <path
        className="line top"
        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
      />
      <path className="line middle" d="m 70,50 h -40" />
      <path
        className="line bottom"
        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
      />
    </svg>
  )
}
