'use client'
import '../styles/sliders.css';
import * as Slider from '@radix-ui/react-slider';
import Mixer from '../utils/mixer';
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MixTable } from '../types';
import {
  updateCrossFader,
  updateTransitionInProcess,
  updateVolume,
} from '../store/playerSlice';

export default function HorizontalSlider() {
  const dispatch = useDispatch();

  const transitionInProcess = useSelector((state: MixTable) => state.player.mixer.transitionInProcess);
  const position = useSelector((state: MixTable) => state.player.mixer.position);
  const autoMixDuration = useSelector((state: MixTable) => state.player.mixer.autoMixDuration);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const setVolume = useCallback((value: number[]) => {
    const crossfaderVal = value[0];
    dispatch(updateCrossFader(crossfaderVal));
    dispatch(updateVolume({ deck: 'deckA', volume: Mixer(crossfaderVal).volumeA }));
    dispatch(updateVolume({ deck: 'deckB', volume: Mixer(crossfaderVal).volumeB }));
  }, [dispatch]);

  const startTransition = useCallback((start: number, end: number, durationInSeconds: number) => {
    let current = start;
    const steps = 100;
    const stepSize = (end - start) / steps;
    const interval = (durationInSeconds * 1000) / steps;

    if (intervalRef.current) clearTimeout(intervalRef.current);

    function update() {
      const reachedEnd = (stepSize > 0) ? current >= end : current <= end;

      if (reachedEnd) {
        setVolume([end]);
        dispatch(updateTransitionInProcess(false));
        return;
      }

      current += stepSize;
      setVolume([current]);

      intervalRef.current = setTimeout(update, interval);
    }

    update();
  }, [dispatch, setVolume]);

 useEffect(() => {
  if (!transitionInProcess) return;

  
  if (position < 0) {
    startTransition(position, 50, autoMixDuration);
  } else if (position > 0) {
    startTransition(position, -50, autoMixDuration);
  }

  
}, [transitionInProcess, autoMixDuration, startTransition]);

  return (
    <div className='w-full flex h-[70%] items-center justify-center'>
      <Slider.Root
        orientation="horizontal"
        value={[position]}
        max={50}
        min={-50}
        step={1}
        onValueChange={setVolume}
        aria-label="Crossfader"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: '35%',
        }}
      >
        <Slider.Track
          style={{
            backgroundColor: 'black',
            position: 'relative',
            flexGrow: 1,
            width: '100%',
            border: '0px solid black',
            height: '4px',
            borderRadius: 2,
          }}
          className='slider-h-gradient'
        >
          <Slider.Range
            style={{
              position: 'absolute',
              background: 'transparent',
              width: '100%',
              borderRadius: 'inherit',
            }}
          />
        </Slider.Track>
        <Slider.Thumb
          style={{
            display: 'block',
            width: 20,
            height: 46,
            backgroundColor: 'rgba(0,0,0,.8)',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
          className='slider-morph'
        />
      </Slider.Root>
    </div>
  );
}
