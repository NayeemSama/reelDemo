import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import styled from "styled-components";
import { Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { animated, useSpring } from '@react-spring/native'
import SpinnerButton from 'react-native-spinner-button';


export default function CameraScreen() {

    const [state, setstate] = useState(false);


    async function takePicture(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.log('originalpath', data.uri);
        // const dirs = RNFetchBlob.fs.dirs;
        // console.log(dirs.CacheDir);
        // console.log(dirs.DCIMDir);
        // console.log(dirs.DownloadDir);
        // console.log(data.uri);
        // console.log(data.uri);

        // const fs = RNFetchBlob.fs
        // const base64 = RNFetchBlob.base64

        // fs.createFile(NEW_FILE_PATH, 'foo', 'utf8')
        // fs.createFile(NEW_FILE_PATH, [102, 111, 111], 'ascii')
        // fs.createFile(NEW_FILE_PATH, base64.encode('foo'), 'base64')
        // fs.createFile(dirs.DocumentDir, data, 'uri')
    };

    const rotateView = useSpring({
        from: { rotate: 0 },
        to: { rotate: 1 },
        loop: { reverse: true },
        config: { duration: 1500 }
    })

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: '#012345',
            justifyContent: "flex-end"
        }}>
            <SpinnerButton
                buttonStyle={{
                    height: 80,
                    width: 80,
                    borderRadius: 90,
                    shadowColor: '#FF5733',
                    backgroundColor: '#FF5733'
                }}
                isLoading={state}
                onPress={() => {
                    console.log('first')
                    // setstate(!state);
                }}
                spinnerType='PulseIndicator'
                indicatorCount={10}
            >
            </SpinnerButton>

            <TouchableHighlight
                style={{
                    height: 90,
                    width: 90,
                    borderRadius: 90,
                    position: "absolute"
                }}
                activeOpacity={1}
                underlayColor="#66ff00"
                onLongPress={() => {
                    console.log('Long Press')
                    setstate(!state);
                }}
                onPressOut={() => {
                    console.log('Long onPressOut')
                    setstate(!state);
                }}>
                <Text></Text>
            </TouchableHighlight>
        </View>





        // <RNCamera
        //   captureAudio={true}
        //   style={{
        //     flex: 1,
        //     alignItems: "center",
        //     justifyContent: "flex-end"
        //   }}
        //   type={RNCamera.Constants.Type.front}
        //   androidCameraPermissionOptions={{
        //     title: 'Permission to use camera',
        //     message: 'We need your permission to use your camera',
        //     buttonPositive: 'Ok',
        //     buttonNegative: 'Cancel',
        //   }} >
        //   {({ camera, status, recordAudioPermissionStatus }) => {
        //     return (
        //       <TouchableOpacity onPress={() => takePicture(camera)} style={{
        //         height: 100,
        //         width: 100,
        //         margin: 50,
        //         justifyContent: 'center',
        //         backgroundColor: "#FF5733"
        //       }}>

        //       </TouchableOpacity>
        //       // <Pressable onPress={() => takePicture(camera)} style={{ height: 200, width: 200 }} >
        //       //   <Text>I'm pressable!</Text>
        //       // </Pressable>
        //     );
        //   }}

        // </RNCamera>
    );
}

export const ContainerView = styled.View`
  background-color: #FF5733;
  height: 200;
  width: 200;
  /* position: "relative"; */
`;


export const ButtonView = styled.View`
  height: 200;
  width: 200;
  background-color: #FF5733;
  border: 0;
  position: relative;
  animation: mymove 10s infinite;
  border-top: 10px solid #0eb7da;

`;

