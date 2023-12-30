interface props {
  width: string,
  height: string,
  className?: string,
}

const Expense = ({ width, height, className }: props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="miter"
    >
      <rect x={2} y={2} width={20} height={20} rx={0} />
      <line x1={7} y1={8} x2={17} y2={8} />
      <line x1={7} y1={12} x2={17} y2={12} />
      <line x1={7} y1={16} x2={12} y2={16} />
    </svg>
  )
}

export default Expense