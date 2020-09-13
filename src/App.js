import React, { useState } from "react";
import SimpleSoundWaveSynthesizer from "./components/SimpleSoundWaveSynthesizer";
import { Alert } from "@material-ui/lab"
import { Typography, Button, Box } from "@material-ui/core"

const App = () => {
  const [acknowledged, setAcknowledged] = useState(false)

  const handleClick = () => {
    setAcknowledged(true)
  }

  return (<>
    {
      acknowledged ?
        <SimpleSoundWaveSynthesizer
          minFreq={40}
          maxFreq={4000}
          defaultFreq={440}
        />
        :
        <Alert severity='warning'>
          <Typography fontWeight={800}>WARNING:</Typography>
          <Typography>This application has the potential to make loud and high pitched noises.</Typography>
          <Typography> Please reduce your volume to a low level before proceeding.</Typography>
          <Box align='right'>
            <Button onClick={handleClick}>Ok</Button>
          </Box>
        </Alert>

    }
  </>
  );

}

export default App;
