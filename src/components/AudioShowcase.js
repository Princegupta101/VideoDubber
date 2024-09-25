import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { Box, Text, Button, Slider } from '@mantine/core';

export default function AudioWaveform({ audioFile }) {
  const [waveform, setWaveform] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const waveformRef = useRef(null);

  useEffect(() => {
    if (audioFile && waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4aec8c',
        progressColor: '#1e1e1e',
        cursorColor: '#ffffff',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 2,
      });

      wavesurfer.loadBlob(audioFile);

      wavesurfer.on('ready', () => {
        setWaveform(wavesurfer);
        setDuration(wavesurfer.getDuration());
        setEnd(wavesurfer.getDuration());
      });

      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on('finish', () => {
        setIsPlaying(false);
      });

      return () => wavesurfer.destroy();
    }
  }, [audioFile]);

  const handlePlayPause = () => {
    if (waveform) {
      waveform.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrim = () => {
    if (waveform) {
      waveform.regions.clear();
      waveform.addRegion({
        start: start,
        end: end,
        color: 'rgba(255, 255, 255, 0.3)',
      });
    }
  };

  const handleDownload = () => {
    if (waveform) {
      const trimmedAudio = waveform.exportPCM(start, end, true);
      const blob = new Blob([trimmedAudio], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'trimmed_audio.wav';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <Box style={{ marginTop: '5rem', marginBottom: '3rem', textAlign: 'center', height: '100vh' }}>
       <Text 
 
        weight={700} 
        mb="md" 
        style={{ padding: '20px',color: '#4aec8c', borderRadius: '8px', fontSize: '2rem'  }}
      >
        Audio Waveform
      </Text>
      <Box 
        ref={waveformRef} 
        style={{ 
          marginBottom: '1rem', 
          border: '2px solid #4aec8c',
          borderRadius: '8px', 
          padding: '10px',
          backgroundColor: '#1e1e1e'
        }} 
      />
      <Box mb="md" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Button 
          onClick={handlePlayPause} 
          style={{ 
            backgroundColor: isPlaying ? '#e74c3c' : '#4caf50',
            color: '#fff', 
            borderRadius: '8px', 
            padding: '10px 20px',
            transition: 'background-color 0.3s',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button 
          onClick={handleTrim} 
          style={{ 
            backgroundColor: '#3498db', 
            color: '#fff', 
            borderRadius: '8px',
            padding: '10px 20px',
            transition: 'background-color 0.3s',
          }}
        >
          Trim
        </Button>
        <Button 
          onClick={handleDownload} 
          style={{ 
            backgroundColor: '#f39c12', 
            color: '#fff', 
            borderRadius: '8px',
            padding: '10px 20px',
            transition: 'background-color 0.3s',
          }}
        >
          Download Trimmed
        </Button>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 20px' }}>
        <Text>Current Time: {currentTime.toFixed(2)}s</Text>
        <Text>Duration: {duration.toFixed(2)}s</Text>
      </Box>
      <Box mb="md" style={{ padding: '0 20px' }}>
        <Text mb="xs">Trim Start: {start.toFixed(2)}s</Text>
        <Slider
          min={0}
          max={duration}
          step={0.1}
          value={start}
          onChange={setStart}
          style={{ marginBottom: '1rem' }}
        />
        <Text mb="xs">Trim End: {end.toFixed(2)}s</Text>
        <Slider
          min={0}
          max={duration}
          step={0.1}
          value={end}
          onChange={setEnd}
        />
      </Box>
    </Box>
  );
}
