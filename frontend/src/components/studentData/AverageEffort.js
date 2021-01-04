import React from 'react';
import styled from 'styled-components';
import CirclePercentage from '../CirclePercentage';

const AverageEffort = ({ averageEffortArray }) => {
  console.log(averageEffortArray);
  const currentEffort = averageEffortArray[0];
  const previousEffort = averageEffortArray[1];
  const currentEffortPercentage = (currentEffort / 5) * 100;

  const effortColor = () => {
    console.log(currentEffort, previousEffort);

    // Determine the colour for the Effort Circle
    if (currentEffort > previousEffort) {
      return 'green';
    } else if (currentEffort === previousEffort) {
      return 'orange';
    } else {
      return 'red';
    }
  };
  return (
    <div>
      {averageEffortArray.length > 1 ? (
        <>
          <h2>Average Effort</h2>
          <p>Across all subjects</p>
        </>
      ) : averageEffortArray.length === 1 ? (
        <p>Effort: {averageEffortArray[0]}</p>
      ) : (
        <p>No effort data to show</p>
      )}
      <CirclePercentage
        progress={currentEffortPercentage}
        effort={currentEffort}
        previousEffort={previousEffort}
        size={250}
        strokeWidth={30}
        circleOneStroke='#ddd'
        circleTwoStroke={effortColor()}
      />
    </div>
  );
};

export default AverageEffort;
