import React from "react";

function Icon({fill='white'}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill={fill}
      viewBox="0 0 2048 2048"
    >
      <path
        fillOpacity="1"
        d="M324.531 275.738h-440.719c-209.875 0-381.451-171.576-381.451-381.451 0-209.874 171.576-381.451 381.451-381.451 114.894 0 222.13 49.022 297.194 139.406 15.32 18.383 44.426 21.447 62.809 6.128 18.384-15.32 21.448-44.426 6.128-62.81-90.384-108.767-222.13-171.576-363.068-171.576-261.96 0-471.835 212.939-471.835 470.303 0 257.365 212.939 470.303 470.303 470.303h440.72c24.511 0 44.426-18.383 44.426-44.426 0-26.043-21.447-44.426-45.958-44.426zm-682.765-381.451c0-133.278 108.768-243.577 243.577-243.577 72.001 0 140.938 32.171 186.896 87.32 15.32 18.383 44.426 21.447 62.809 6.128 18.384-15.319 21.447-44.426 6.128-62.809-62.81-76.597-156.257-121.023-255.833-121.023-183.831 0-332.429 148.597-332.429 332.429 0 183.832 148.598 332.429 332.429 332.429h341.145c24.51 0 44.426-18.383 44.426-44.426 0-26.042-18.384-44.426-44.426-44.426h-342.676c-133.278 1.532-242.046-108.767-242.046-242.045zM-114.657 1.522l-3.063 85.788h443.783c24.511 0 44.426-18.383 44.426-44.425 0-26.043-18.383-41.363-41.362-41.363h-443.784z"
        transform="translate(1024 1024)"
      ></path>
    </svg>
  );
}

export default Icon;