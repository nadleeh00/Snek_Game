import React from "react";

export default (props: any) => {
  return (
    <div>
      {props.snekBodys.map((seg: any, i: number) => {
        const style = {
          left: `${seg[0]}%`,
          top: `${seg[1]}%`
        };
        return <div className="snek-seg" key={i} style={style}></div>;
      })}
    </div>
  );
};
