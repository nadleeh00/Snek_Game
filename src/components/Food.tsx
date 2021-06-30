import React from "react";

export default (props: any) => {
  const style = {
    left: `${props.seg[0]}%`,
    top: `${props.seg[1]}%`
  };

  return <div className="snek-food" style={style}></div>;
};
