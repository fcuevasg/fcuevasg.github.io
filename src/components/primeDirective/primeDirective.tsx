import React from "react";

import "./primeDirective.scss"

interface PrimeDirectiveProps {
  content: string;
}

export const PrimeDirective = (
  props: PrimeDirectiveProps
): React.ReactElement => {
  return (
    <div className="pdContainer">
      <h3 className="pdContent">{props.content}</h3>
    </div>
  );
};
