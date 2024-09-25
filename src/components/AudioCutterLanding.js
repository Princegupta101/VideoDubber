import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

import { Box, Button, Group, Text } from '@mantine/core';

import AudioShowcase from './AudioShowcase';

export default function AudioCutterLanding() {
  const [audioFile, setAudioFile] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleHowItWorksClick = () => {
    const linkName = 'about';
    setActiveLink(linkName);
    
    const section = document.getElementById('info-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box>
      <Box className={isSticky ? 'fixed-header' : ''}>
        <Box className="header-content" style={{ padding: '1rem', display: 'flex', gap:'2rem', alignItems: 'center' }}>
          <Text
            size="sm"
            onClick={handleHowItWorksClick}
          >
            HOW IT WORKS
          </Text>
          <Text size="sm">
            JOINER
          </Text>
        </Box>
      </Box>

      <Box style={{ marginTop: isSticky ? '4rem' : '0' }}>
        <Text
          size="xl"
          weight={700}
          style={{ marginBottom: '1rem', fontSize: '3em', fontWeight: 'bold' }}
        >
          Audio Cutter
        </Text>
        <Text
          size="sm"
          style={{ marginBottom: '1rem', fontSize: '2em' }}
        >
          Free editor to trim and cut any audio file online
        </Text>

        <Group position="center" mt="xl">
          <Button
            onClick={handleButtonClick}
            style={{
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              padding: '1rem',
              marginTop: '1rem',
              borderRadius: '2rem',
              fontSize: '1em',
              fontWeight: 'bold',
              backgroundColor: '#17171e',
              color: 'white',
              border: '2px solid #665dc3'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2b2847';
              e.currentTarget.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#17171e';
            }}
          >
            Browse my files
          </Button>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </Group>

        {audioFile && <AudioShowcase audioFile={audioFile} />}
      </Box>
    </Box>
  );
}
