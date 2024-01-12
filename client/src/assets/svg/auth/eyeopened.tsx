interface props {
  className?: string;
  classPath?: string;
}

const Eyeopened = ({ className, classPath }: props) => {
  return (
    <svg
      width="22"
      height="22"
      className={className}
      viewBox="0 0 0.72 0.72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className={classPath}
        stroke="#000"
        strokeWidth=".045"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M.45.36C.45.41.41.45.36.45S.27.41.27.36.31.27.36.27s.09.04.09.09Z" />
        <path d="M.36.578a.337.337 0 0 0 .273-.15.126.126 0 0 0 0-.137A.336.336 0 0 0 .36.142a.337.337 0 0 0-.273.15.126.126 0 0 0 0 .137.339.339 0 0 0 .273.149Z" />
      </g>
    </svg>
  );
};

export default Eyeopened;
