import React from "react";
import { StepBlock } from "../../util/store";

interface Props {
  stepBlock: StepBlock;
}

const CurrentStepBlock: React.FC<Props> = ({ stepBlock }) => {
  const listSteps = stepBlock.steps.map((step) => {
    return (
      <li key={step.stepNumber}>
        <h5 key={step.stepNumber}>{step.stepText}</h5>
      </li>
    );
  });

  return (
    <ol>
      <h5>{stepBlock.for}</h5>
      {listSteps}
    </ol>
  );
};

export default CurrentStepBlock;
