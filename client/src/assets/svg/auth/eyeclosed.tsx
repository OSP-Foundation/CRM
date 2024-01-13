interface props {
  className?: string;
  classPath?: string;
}

const Eyeclosed = ({ className, classPath }: props) => {
  return (
    <svg
      width="22"
      height="22"
      className={className}
      viewBox="0 0 0.45 0.45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={classPath}
        d="M.225.27A.2.2 0 0 1 .075.2.281.281 0 0 1 .032.135.152.152 0 0 1 .03.13L.015.135.001.141a.063.063 0 0 0 .001.002l.002.005A.311.311 0 0 0 .052.22C.088.26.144.3.225.3V.27Zm.21-.135A2.067 2.067 0 0 1 .421.129V.13L.419.134a.281.281 0 0 1-.043.065.202.202 0 0 1-.151.071V.3C.306.3.362.26.397.22A.311.311 0 0 0 .445.148.185.185 0 0 0 .448.141L.435.135ZM.24.36V.285H.21V.36h.03ZM.041.311l.06-.06L.08.23.02.29l.021.021ZM.35.251l.06.06L.431.29.371.23.35.251Z"
      />
    </svg>
  );
};

export default Eyeclosed;
