import { Box, Text } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

export default function InfoSection() {
  return (
    <Box style={{ borderTop: '1px solid #3a3a44' }}>
      <Box
        id="info-section" // Ensure this is unique and matches the ID used in the landing page
        style={{
          marginTop: '3rem',
          padding: '2rem',
          color: 'white',
        }}
      >
        {/* Header Section */}
        <Text size="lg" weight={700} style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          How to cut audio
        </Text>

        {/* Info Section */}
        <Box
          style={{
            marginBottom: '1rem',
            borderLeft: '3px solid #665dc3',
            padding: '1rem',
            backgroundColor: '#1c1c24',
          }}
        >
          <Text size="md" style={{ marginBottom: '1rem', lineHeight: '2', fontSize: '1.4rem' }}>
            This app can be used to trim and/or cut audio tracks, remove an audio fragment. Fade in and fade out your music easily to make the audio harmoniously.
          </Text>
          <Text size="md" style={{ marginBottom: '1rem', lineHeight: '2', fontSize: '1.4rem' }}>
            It’s fast and easy to use. You can save the audio file in any format (codec parameters are configured).
          </Text>
          <Text size="md" style={{ lineHeight: '2', fontSize: '1.4rem' }}>
            It works directly in the browser, no need to install any software, and is available for mobile devices.
          </Text>
        </Box>

        {/* Privacy and Security Section */}
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
            paddingLeft: '1rem',
          }}
        >
          <IconLock size={35} style={{ marginRight: '1rem' }} />
          <Text size="md" weight={700} style={{ fontSize: '1.5rem' }}>
            Privacy and Security Guaranteed
          </Text>
        </Box>

        {/* Privacy Details */}
        <Box
          style={{
            marginTop: '1rem',
            padding: '1rem',
            borderLeft: '3px solid #665dc3',
            backgroundColor: '#1c1c24',
          }}
        >
          <Text size="md" style={{ lineHeight: '2', fontSize: '1.4rem' }}>
            This is a serverless app. Your files do not leave your device.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
