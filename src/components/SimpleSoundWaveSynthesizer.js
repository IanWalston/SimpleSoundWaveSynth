import React, { Component } from "react";
import { Button, Slider, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { PlayArrow, Stop } from "@material-ui/icons"


let context = new AudioContext()
let gainNode = context.createGain()
gainNode.gain.setValueAtTime(0, context.currentTime);
gainNode.connect(context.destination)

const SimpleSoundWaveSynthesizer = ({minFreq, maxFreq, defaultFreq}) => {
    const [frequency, setFrequency] = React.useState(defaultFreq);
    const [oscillator, setOscillator] = React.useState(context.createOscillator());
    const [shape, setShape] = React.useState('sine')
    const [playing, setPlaying] = React.useState(false)

    const handleVolumeChange = (event, newValue) => {
        setFrequency(newValue);
        oscillator.frequency.setValueAtTime(newValue, context.currentTime + 0.01)
    }

    const handleShapeChange = (event, newValue) => {
        let shapeName = newValue.props.value
        setShape(shapeName)
        oscillator.type = shapeName
    }

    const handleStartSound = () => {
        setPlaying(true)
        oscillator.type = shape
        oscillator.frequency.setValueAtTime(frequency, context.currentTime)
        oscillator.connect(context.destination)
        oscillator.start(0)
    }

    const handleStopSound = () => {
        setPlaying(false)
        oscillator.stop()
        setOscillator(context.createOscillator())
    }

    return (<>

        <Grid container spacing={2}>
            <Grid item xs={6} align="center">
                {
                    playing ?
                        <Button onClick={handleStopSound}><Stop /></Button> :
                        <Button onClick={handleStartSound}><PlayArrow /></Button>
                }
                <Typography>
                    {frequency} Hz
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl style={{ width: '200px' }}>
                    <InputLabel>Shape</InputLabel>
                    <Select
                        value={shape}
                        onChange={handleShapeChange}
                    >
                        <MenuItem value='sine'>Sine</MenuItem>
                        <MenuItem value='triangle'>Triangle</MenuItem>
                        <MenuItem value='square'>Square</MenuItem>
                        <MenuItem value='sawtooth'>Sawtooth</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Typography>{minFreq} Hz</Typography>
            </Grid>
            <Grid item xs>
                <Slider
                    value={frequency}
                    min={minFreq}
                    max={maxFreq}
                    scale={x => Math.log2(x)}
                    onChange={handleVolumeChange}
                    aria-labelledby="continuous-slider"
                />
            </Grid>
            <Grid item>
                <Typography>{maxFreq} Hz</Typography>
            </Grid>
            <Grid item xs={12} align='center'>

            </Grid>
        </Grid>
    </>
    );

}

export default SimpleSoundWaveSynthesizer;
