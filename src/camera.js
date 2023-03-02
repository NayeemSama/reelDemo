import React, { useEffect, useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import styled from "styled-components";
import { Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { animated, useSpring } from '@react-spring/native'
import SpinnerButton from 'react-native-spinner-button';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, Platform, Image, Vibration } from 'react-native'
// import Filesys from 'react-native-fs';
import AnimatedProgressWheel from 'react-native-progress-wheel';
var Filesys = require('react-native-fs');


export default function CameraScreen() {

  const [state, setstate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFront, setIsFront] = useState(false);
  const [path, setPath] = useState("");
  let circleProgress = useRef(null);
  let isOn = useRef(false);
  let forCamera = useRef(null);

  useEffect(() => {
    ask();
  }, []);

  useEffect(() => {
    console.log('progress', progress)
    console.log('state change to - ', state)
    console.log('isOn change to - ', isOn.current)
    if (isOn.current) {
      console.log('true')
      myLoop()
    }
  }, [state]);

  let i = 1;

  async function myLoop() {
    console.log("afer myloop", state);
    setTimeout(() => {
      console.log("inside setTimeout", state);
      if (isOn.current) {
        console.log("i < 100", state);
        if (i <= 100) {
          circleProgress.current._reactInternals.ref.current.animateTo(i)
          i++;
          myLoop();
          console.log("before myLoop", state);
        }
        else if (i > 100) {
          console.log('stop now')
          isOn.current = false
          setstate(false)
          stop(forCamera.current);
        }
      }
      else {
        if (i < 100) {
          circleProgress.current._reactInternals.ref.current.animateTo(0, 1000)
        }
      }
    }, 100)
  }

  function rotateCamera() {
    setIsFront(!isFront);
  }

  async function ask() {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    console.log('ask')
  }

  async function takePicture(camera) {
    const options = { quality: 0.9, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log('originalpath', data.uri);
  };

  async function record(camera) {
    const options = { quality: 0.5, base64: true };

    const data = await camera.recordAsync(options);
    let p = RNFetchBlob?.fs?.dirs?.DownloadDir;
    setPath(data.uri);
    await RNFetchBlob.fs.cp(data.uri, RNFetchBlob?.fs.dirs.DownloadDir + '/' + new Date().toLocaleString().replace(/ /g, '_').replace(/,/g, '').replace(/\//g, '-') + '.mp4')
      .then((asd) => {
        console.log('copy success!!', asd);
        setstate(false);
      })
      .catch((asd) => {
        console.log('copy fail!!', asd);
      })
  };

  async function stop(camera) {
    const options = { quality: 0.5, base64: true };
    Vibration.vibrate()
    await camera.stopRecording(options);
    setstate(false)
    console.log('stop', state);
  }

  const rotateView = useSpring({
    from: { rotate: 0 },
    to: { rotate: 1 },
    loop: { reverse: true },
    config: { duration: 1500 }
  })

  return (
    <RNCamera
      captureAudio={true}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
      }}
      type={isFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }} >
      {({ camera, status, recordAudioPermissionStatus }) => {
        forCamera.current = camera
        return (
          <View style={{ flexDirection: "row", }}>
            <View style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 30
            }}>

              <TouchableHighlight
                underlayColor="#0ADDF600"
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 90,
                  position: "absolute"
                }}
                onLongPress={() => {
                  console.log('Long Press 1')
                }}
                onPressOut={() => {
                  console.log('Long onPressOut 1')
                }}>
                <Text></Text>
              </TouchableHighlight>
            </View>
            <View style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 30
            }}>
              {/* <SpinnerButton
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
              </SpinnerButton> */}
              <AnimatedProgressWheel
                ref={circleProgress}
                size={80}
                color={'white'}
                fullColor="#FF5733"
                width={10}
              />

              <TouchableHighlight
                // activeOpacity={1}
                underlayColor="#0ADDF600"
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 90,
                  position: "absolute"
                }}
                onLongPress={() => {
                  record(camera)
                  setstate(true);
                  isOn.current = true;
                  Vibration.vibrate()
                  console.log('Long Press', state)
                  console.log('new Date()', new Date().toLocaleString().replace(/ /g, '_').replace(/,/g, '').replace(/\//g, '-'))
                }}
                onPressOut={() => {
                  stop(camera)
                  setstate(false);
                  isOn.current = false;
                  console.log('Long onPressOut', state)
                }}>
                <Text></Text>
              </TouchableHighlight>
            </View>
            <View style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 30
            }}>
              <TouchableHighlight
                // activeOpacity={1}
                underlayColor="#0ADDF600"
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 90,
                  position: "absolute",
                }}
                onPress={() => {
                  rotateCamera()
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 50
                  }}
                  source={require('./orange.png')}
                />
              </TouchableHighlight>
            </View>
          </View>


          // <TouchableOpacity onPress={() => takePicture(camera)} style={{
          //   height: 100,
          //   width: 100,
          //   margin: 50,
          //   justifyContent: 'center',
          //   backgroundColor: "#FF5733"
          // }}>

          // </TouchableOpacity>
          // <Pressable onPress={() => takePicture(camera)} style={{ height: 200, width: 200 }} >
          //   <Text>I'm pressable!</Text>
          // </Pressable>
        );
      }}

    </RNCamera>
  );
}
