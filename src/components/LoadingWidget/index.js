/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import Widget from '../Widget';
import animationData from './animation.json';

export default function LoadingWidget() {
  // const [animationState, setAnimationState] = useState({
  //   isStopped: false,
  //   isPaused: false,
  // });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Widget>
      <Widget.Header>
        Carregando ...
      </Widget.Header>
      <Widget.Content>
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
          // isStopped={animationState.isStopped}
          // isPaused={animationState.isPaused}
        />
      </Widget.Content>

    </Widget>
  );
}
