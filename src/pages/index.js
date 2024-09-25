import { Box, Button, Text, Group } from '@mantine/core';
import AudioCutterLanding from '@/components/AudioCutterLanding';
import InfoSection from '@/components/InfoSection';

export default function Home() {
  return (
    <Box style={{ display: 'flex',flexDirection:"column",backgroundColor:'#17171e',height:'200vh'}}>
      <Box style={{ flex: 1, textAlign: 'center',marginTop:'15rem',color:'white',height:'100vh'}}>
        <AudioCutterLanding />
      </Box>
      <Box 
        style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '2rem', 
          backgroundColor: '#17171e' ,
          height:'50vh'
        }}
      >
        <InfoSection />
      </Box>
    </Box>
  );
}
