import React from "react";

import "./primeDirective.scss"

interface PrimeDirectiveProps {
  content: string;
  author?:string;
}

export const PrimeDirective = (
  props: PrimeDirectiveProps
): React.ReactElement => {
  return (
    <div className="pdContainer">
      <p className="pdContent">{props.content}</p>
      <p className="pdAuthor">{props.author}</p>
    </div>
  );
};
