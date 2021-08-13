import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  PixelRatio
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { photoClickText, eclipsIcon, addCover } from '../../../assets';
import { TextView } from '../../../Component';
import { color, font } from '../../../Theme';
import { PixcelWidth, pickFromGallery } from '../../../Utils';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import { setGuestProfile } from '../../../store/guest';
import { updateProfileAction } from '../../../store/profile/actions';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Button } from 'native-base';
import moment from 'moment';
import BarcodeMask from 'react-native-barcode-mask';
import ImageResizer from 'react-native-image-resizer';
// import { Camera } from 'expo-camera';
// import { cameraWithTensors, fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
// import * as blazeface from '@tensorflow-models/blazeface';
// import * as tf from '@tensorflow/tfjs';
import { Svg, Rect, G, Circle } from 'react-native-svg'
import { useCallback } from 'react';
// import * as posenet from '@tensorflow-models/posenet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { FileSystem } from 'react-native-unimodules';
import vision, { VisionFaceContourType, VisionFaceDetectorClassificationMode, VisionFaceDetectorContourMode, VisionFaceDetectorLandmarkMode, VisionFaceLandmarkType } from '@react-native-firebase/ml-vision';
import ImageEditor from "@react-native-community/image-editor";
import FaceClickTooltip from '../../../Component/FaceClickTooltip';
import { useLayoutEffect } from 'react';
import BackButton from "../../../Component/BackButton";

// const TensorCamera = cameraWithTensors(Camera);

const PhotoClick = (props) => {
  const initial = props.route?.params?.initial ?? false;
  let rafID = useRef(null);
  let croppedImage = useRef(null);
  let alertMsg = useRef("");

  const autoRender = true;
  const inputTensorWidth = 152;
  const inputTensorHeight = 200

  const imagePath = Platform.select({
    android: `${RNFS.ExternalStorageDirectoryPath}/HelloFace`,
    ios: `${RNFS.DocumentDirectoryPath}/HelloFace`,
  });

  let camera = useRef(null)
  // const [camera, setCamera] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSize, setImageSize] = useState(1000);
  const [image, setImage] = useState('');
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [isProccessing, setIsProccessing] = useState(false);
  const [isCameraClick, setIsCameraClick] = useState(false);
  const [blazefaceModel, setBlazefaceModel] = useState(null);
  const [faces, setFaces] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [tooltip, setTooltip] = useState(true);

  // useEffect(() => {
  //   loadBlazefaceModel()
  //   return () => {
  //     if (rafID.current) {
  //       cancelAnimationFrame(rafID.current);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: '',
      headerLeft: () => <BackButton onBackPress={skip} />,
      headerShown: true,
      headerTransparent: true,
    })
  },[props.navigation])

  const makeDirectory = async () => {
    await RNFS.mkdir(imagePath);
  };

  const checkStoragePermission = () => {
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
  };

  const checkPermission = () => {
    check(
      Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      }),
    ).then((res) => {
      console.log(res);
      if (res === RESULTS.DENIED) {
        requestPermission();
      } else if (res === RESULTS.GRANTED) {
        camera.current && camera.current.refreshAuthorizationStatus();
      } else if (res === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission',
          'You need to grand camera permission from settings if you want to use this feature',
          [
            {
              text: 'Opne Setting',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
    });
  };

  const requestPermission = () => {
    request({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    }).then((res) => {
      if (res === RESULTS.DENIED) {
        requestPermission();
      } else if (res === RESULTS.GRANTED) {
        camera.current.refreshAuthorizationStatus();
      }
    });
  };

  const takePicture = async () => {
    try {

      const path = `${imagePath}/HelloFace-${moment().format(
        'DDMMYYYYhhmmssSSS',
      )}.jpg`;
      const data = await camera.current.takePictureAsync({
        imageType: 'jpg',
        // width: inputTensorWidth,
      });

      setIsProccessing(true)
      setIsCameraClick(true)
      setIsImageCaptured(true);
      setImage(data);
      // camera.pausePreview()
      // cancelAnimationFrame(rafID.current);

      // console.log(data)
      // croppedImage.current = data
      // processFaces(data.uri)
      ImageResizer.createResizedImage(data.uri, inputTensorWidth, inputTensorHeight, 'JPEG', 100, 0, undefined, false, {
        mode: 'stretch',
        onlyScaleDown: false
      }).then(res => {
        console.log(res)
        croppedImage.current = res
        processFaces(res.uri)
      })

    } catch (err) {
      console.log('err: ', err);
    }
  };

  const faceDetection = async (data) => {

    // This method not working in android
    // const response = await fetch(data.uri, {}, { isBinary: true });
    // const imageDataArrayBuffer = await response.arrayBuffer();
    // const imageData = new Uint8Array(imageDataArrayBuffer);
    // const imageTensor = decodeJpeg(imageData);

    try {
      const imgB64 = await FileSystem.readAsStringAsync(data.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer)
      const imageTensor = decodeJpeg(raw);

      const detectedFaces = await blazefaceModel.estimateFaces(imageTensor, false);

      console.log("imageTensor", imageTensor)

      if (!validateFace(detectedFaces)) {
        Alert.alert("Face Detection", "Either no face detected or Front face is not clearly visible", [{
          text: "Ok",
          onPress: retake
        },
        ], {
          cancelable: false
        })
        tf.dispose(imageTensor)
        setIsProccessing(false)
        return
      }


      setIsProccessing(false)
      setFaces(detectedFaces)
      tf.dispose(imageTensor)
    } catch (error) {
      console.log(error)
    }

  }

  const retake = () => {
    setImage('');
    setFaces([])
    setIsImageCaptured(false);
    setIsProccessing(false)
    // camera.resumePreview();
  };

  const goNext = async () => {

    let formData = new FormData();
    let arr = image?.uri?.split('/') ?? [`${moment().format('MMDDYYYYhhmmssSSS')}.jpg`]
    let fileName = arr.pop()

    ImageResizer.createResizedImage(image.uri, imageSize, imageSize, 'JPEG', 100, 0, undefined, false, {
      mode: 'contain',
      onlyScaleDown: true
    }).then(res => {
      // console.log(res)
      formData.append('faceFile', {
        uri: res.uri,
        type: 'image/jpg',
        name: res.name //fileName //`${moment().format('MMDDYYYYhhmmssSSS')}.jpg`,
      });
      props.update(formData, {
        onSuccess: () => {
          navigate();
        },
        onError: () => { },
      });
    }).catch(err => {
      console.log(err)
    })


    // const detectedFaces = await vision().faceDetectorProcessImage(image.uri);
    // const boundingBox = faces[0]?.boundingBox

    // const width = boundingBox[2] - boundingBox[0] + 20
    // const height = boundingBox[3] - boundingBox[1] + 30

    // const cropData = {
    //   offset: { x: boundingBox[0] - 10, y: boundingBox[1] - 20 },
    //   size: { width, height },
    // };

    // ImageEditor.cropImage(croppedImage.current?.uri, cropData).then(url => {
    //   console.log("Cropped image uri", url);
    //   formData.append('faceFile', {
    //     uri: url,
    //     type: 'image/jpg',
    //     name: `${moment().format('MMDDYYYYhhmmssSSS')}.jpg`,
    //   });
    //   props.update(formData, {
    //     onSuccess: () => {
    //       navigate();
    //     },
    //     onError: () => { },
    //   });
    // }).catch(err => {
    //   console.log(err)
    // })
  };

  const navigate = () => {
    const initial = props.route?.params?.initial ?? false;
    if (initial)
      props.navigation.navigate('LanguageScreen', {
        initial,
      })
    // props.navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'LanguageScreen',
    //       params: {
    //         initial,
    //       },
    //     },
    //   ],
    // });
    else {
      props.navigation.goBack();
    }
  };

  const skip = () => {
    navigate();
  };

  const selectImage = () => {
    pickFromGallery((image) => {
      setIsProccessing(true)
      setIsImageCaptured(true);
      setIsCameraClick(false);
      setImage(image[0]);
      // camera.pausePreview()
      // cancelAnimationFrame(rafID.current);
      // console.log(image[0])
      ImageResizer.createResizedImage(image[0].uri, inputTensorWidth, inputTensorHeight, 'JPEG', 100, 0, undefined, false, {
        mode: 'stretch',
        onlyScaleDown: false
      }).then(res => {
        console.log(res)
        croppedImage.current = res
        processFaces(res.uri)
      }).catch(err => {
        console.log(err)
      })
    })
  }

  const handleCameraStream = (images, updatePreview, gl) => {
    const loop = async () => {

      if (!autoRender) {
        updatePreview();
      }

      if (blazefaceModel != null) {
        const imageTensor = images.next().value;
        // console.log("<><><>", imageTensor)
        const returnTensors = false;
        const faces = await blazefaceModel.estimateFaces(imageTensor, returnTensors);

        if (faces.length > 0) {

          //Calculation the distance between ear and eye to solve
          //side face problem
          const landmarks = faces[0].landmarks;

          console.log(landmarks)
          for (let index = 0; index < landmarks.length; index++) {
            console.log(`landmark ${index}`, landmarks[index])
          }
          const ree = landmarks[0][0] - landmarks[4][0];  //Distance between right ear and right eye
          const lee = landmarks[5][0] - landmarks[1][0];  //Distance between left ear and left eye
          const side_face_thereshold = 10 // 18.0;

          //Calculate the distance between nose and eyes
          //Face up problem
          const ne = landmarks[2][1] - landmarks[1][1];
          const up_face_thereshold = 10 //15.0;

          //Calculate the distance between nose and mouth
          //Face down problem
          const mn = landmarks[3][1] - landmarks[2][1];
          const down_face_thereshold = 10 //30.0;

          const prob = faces[0].probability * 100;
          const face_probability_threshold = 90.0;

          console.log(ree, lee, ne, mn, prob)

          console.log(faces)
          if (prob > face_probability_threshold && ree >= side_face_thereshold && lee >= side_face_thereshold && mn > down_face_thereshold && ne > up_face_thereshold) { // && ree >= side_face_thereshold && lee >= side_face_thereshold && mn > down_face_thereshold && ne > up_face_thereshold
            setFaces(faces)
          } else {
            setFaces([])
          }
        }
        tf.dispose(imageTensor);
      }

      if (!autoRender) {
        gl.endFrameEXP();
      }

      rafID.current = requestAnimationFrame(loop);

    }
    loop();
  }

  const renderFaces = () => {
    if (faces != null) {
      const faceBoxes = faces.map((f, fIndex) => {
        const topLeft = f.topLeft;
        const bottomRight = f.bottomRight;
        // console.log("faces:>>>", f);

        let tmpValueY = Platform.select({
          ios: 0,
          android: 0
        })
        let tmpValueX = Platform.select({
          ios: 0,
          android: 0
        })
        // const landmarks = (f.landmarks).map((l, lIndex) => {
        //   return <Circle
        //     key={`landmark_${fIndex}_${lIndex}`}
        //     cx={l[0]}
        //     cy={l[1]}
        //     r='2'
        //     strokeWidth='0'
        //     fill='blue'
        //   />;
        // });

        // return <G key={`facebox_${fIndex}`}>
        //   <Rect
        //     x={50}
        //     y={50}
        //     strokeWidth={2}
        //     stroke="red"
        //     width={(bottomRight[0] - topLeft[0])}
        //     height={(bottomRight[1] - topLeft[1])}
        //   />
        //   {/* {landmarks} */}
        // </G>;
        return <Rect
          key={fIndex}
          x={topLeft[0] - tmpValueX}
          y={topLeft[1] - tmpValueY}
          strokeWidth={2}
          stroke={color.btnPrimary_color}
          width={(bottomRight[0] - topLeft[0])}
          height={(bottomRight[1] - topLeft[1])}
          // strokeDasharray={[20, bottomRight[0] - topLeft[0] - 40, 40, bottomRight[1] - topLeft[1] - 40, 40, bottomRight[0] - topLeft[0] - 40, 40, bottomRight[1] - topLeft[1] - 40]}
          strokeDasharray={[20, bottomRight[0] - topLeft[0] - 40, 40, bottomRight[1] - topLeft[1] - 40, 40, bottomRight[0] - topLeft[0] - 40, 40, bottomRight[1] - topLeft[1] - 40]}
        />

      });

      const flipHorizontal = Platform.OS === 'ios' ? 1 : 1;
      return <Svg height='100%' width='100%'
        viewBox={`0 0 ${inputTensorWidth} ${inputTensorHeight}`}
        scaleX={flipHorizontal}
      >
        {faceBoxes}
      </Svg>;
    } else {
      return null;
    }
  }

  const validateFace = (facesData) => {
    if (facesData.length > 0) {

      //Calculation the distance between ear and eye to solve
      //side face problem
      const landmarks = facesData[0].landmarks;

      // console.log(landmarks)
      // for (let index = 0; index < landmarks.length; index++) {
      //   console.log(`landmark ${index}`, landmarks[index])
      // }
      const ree = landmarks[0][0] - landmarks[4][0];  //Distance between right ear and right eye
      const lee = landmarks[5][0] - landmarks[1][0];  //Distance between left ear and left eye
      const side_face_thereshold = 0 // 18.0;

      //Calculate the distance between nose and eyes
      //Face up problem
      const ne = landmarks[2][1] - landmarks[1][1];
      const up_face_thereshold = 10 //15.0;

      //Calculate the distance between nose and mouth
      //Face down problem
      const mn = landmarks[3][1] - landmarks[2][1];
      const down_face_thereshold = 10 //30.0;

      const prob = facesData[0].probability * 100;
      const face_probability_threshold = 90.0;

      console.log(ree, lee, ne, mn, prob)

      console.log(facesData)
      if (prob > face_probability_threshold && ree >= side_face_thereshold && lee >= side_face_thereshold) { // && ree >= side_face_thereshold && lee >= side_face_thereshold && mn > down_face_thereshold && ne > up_face_thereshold //&& ree >= side_face_thereshold && lee >= side_face_thereshold && mn > down_face_thereshold && ne > up_face_thereshold
        // setFaces(faces)
        return true
      } else {
        // setFaces([])
        return false
      }
    }
    return false
  }

  const loadBlazefaceModel = async () => {
    const model = await blazeface.load({
      maxFaces: 1, scoreThreshold: 0.9
    });
    // console.log("blazefaceModel:::", model)
    setBlazefaceModel(model)
    setIsLoading(false)
  }

  const processFaces = async (localPath) => {
    const detectedFaces = await vision().faceDetectorProcessImage(localPath, {
      landmarkMode: VisionFaceDetectorLandmarkMode.ALL_LANDMARKS,
      minFaceSize: 0.3,
    });

    // console.log("detectedFaces",detectedFaces)
    alertMsg.current = "No Face Detected"
    const hasMultipleFaces = detectedFaces.length > 1
    if (hasMultipleFaces) {
      alertMsg.current = "Multiple Face Detected"
    }

    if (hasMultipleFaces || detectedFaces.length === 0 || !validateFaceBox(detectedFaces)) {
      Alert.alert("Face Detection", alertMsg.current, [{
        text: "Ok",
        onPress: retake
      },
      ], {
        cancelable: false
      })
      setIsProccessing(false)
      return
    }

    setIsProccessing(false)
    setFaces(detectedFaces)

  }

  const validateFaceBox = (detectedFaces) => {
    if (detectedFaces.length > 0) {
      const faceLandmarks = {}
      const face = detectedFaces[0]
      
      if (Math.abs(face.headEulerAngleY) > 20) {
        alertMsg.current = "Please look into the camera, not sideways"
        return false
      }
      if(Math.abs(face.headEulerAngleZ) > 20){
        alertMsg.current = "Please look into the camera"
        return false
      }

      face.landmarks.forEach((landmark) => {
        if (landmark.type === VisionFaceLandmarkType.LEFT_CHEEK) {
          faceLandmarks.LEFT_CHEEK = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.LEFT_EAR) {
          faceLandmarks.LEFT_EAR = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.LEFT_EYE) {
          faceLandmarks.LEFT_EYE = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.MOUTH_BOTTOM) {
          faceLandmarks.MOUTH_BOTTOM = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.MOUTH_LEFT) {
          faceLandmarks.MOUTH_LEFT = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.MOUTH_RIGHT) {
          faceLandmarks.MOUTH_RIGHT = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.NOSE_BASE) {
          faceLandmarks.NOSE_BASE = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.RIGHT_CHEEK) {
          faceLandmarks.RIGHT_CHEEK = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.RIGHT_EAR) {
          faceLandmarks.RIGHT_EAR = landmark.position
        } else if (landmark.type === VisionFaceLandmarkType.RIGHT_EYE) {
          faceLandmarks.RIGHT_EYE = landmark.position
        }
      })

      // console.log("faceLandmarks:::", faceLandmarks)
      const lec = faceLandmarks?.LEFT_EYE[0] - faceLandmarks?.LEFT_CHEEK[0]
      console.log("distanceBetweenlec", lec)

      const rec = faceLandmarks?.RIGHT_CHEEK[0] - faceLandmarks?.RIGHT_EYE[0]
      console.log("distanceBetweenrec", rec)

      const sideFaceThreshold = 3

      // if (Math.abs(rec) >= sideFaceThreshold && Math.abs(lec) >= sideFaceThreshold) {
      //   return true
      // }

      return true
    } else {
      return false
    }
  }

  const renderFaceBox = () => {
    const faceBoxes = faces.map((face, fIndex) => {
      console.log(face)
      const { boundingBox } = face
      const width = boundingBox[2] - boundingBox[0]
      const height = boundingBox[3] - boundingBox[1]

      const edgeWidth = width / 4
      const fullEdgeWidth = edgeWidth * 2

      console.log(croppedImage)
      return <Rect
        key={fIndex}
        x={boundingBox[0]}
        y={boundingBox[1]}
        strokeWidth={2}
        stroke={color.btnPrimary_color}
        // scaleX={-1}
        width={width}
        height={height}
        strokeDasharray={[edgeWidth, width - fullEdgeWidth, fullEdgeWidth, height - fullEdgeWidth, fullEdgeWidth, width - fullEdgeWidth, fullEdgeWidth, height - fullEdgeWidth]}
      />

    });

    return <Svg height='100%' width='100%'
      viewBox={`0 0 ${inputTensorWidth} ${inputTensorHeight}`}
    >
      {faceBoxes}
    </Svg>;
  }

  let textureDims = {}

  if (Platform.OS === 'ios') {
    textureDims = {
      height: 1920,
      width: 1080,
    };
  } else {
    textureDims = {
      height: 1200,//PixelRatio.getPixelSizeForLayoutSize(parseInt(DEVICE_HEIGHT)),
      width: 1600//PixelRatio.getPixelSizeForLayoutSize(parseInt(DEVICE_WIDTH)),
    };
  }

  // console.log(textureDims)

  // if (hasPermission === false) {
  //   return <View style={styles.noPermissionContainer}>
  //     <TextView style={styles.noPerText}>
  //       No permission Detected
  //     </TextView>
  //     <Button
  //       style={{ alignSelf: 'center', backgroundColor: color.primary_color_dark }}
  //       rounded
  //       light
  //       onPress={() => Linking.openSettings()}>
  //       <TextView style={styles.settingTxt}>Open Setting</TextView>
  //     </Button>
  //   </View>
  // }

  return (
    <>
      <View style={styles.mainContainer}>
        {!isImageCaptured ? <RNCamera
          ref={camera}
          style={styles.cameraContainer}
          type={'front'}
          flashMode='off'
          captureAudio={false}
          ratio={"1:1"}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          notAuthorizedView={
            <View style={styles.noPermissionContainer}>
              <TextView style={styles.noPerText}>
                No permission Detected
                </TextView>
              <Button
                style={{ alignSelf: 'center' }}
                rounded
                light
                onPress={() => Linking.openSettings()}>
                <TextView style={styles.settingTxt}>Open Setting</TextView>
              </Button>
            </View>
          }>
          <FastImage style={styles.roundContainer} source={eclipsIcon} />
        </RNCamera> :
        <>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={{ flex: 1, transform: [{ scaleX: isCameraClick ? -1 : 1 }] }} // transform: [{ scaleX: isCameraClick ? 1 : 1 }]
            source={{
              uri: image.uri
            }}
          >
            {isProccessing ? <BarcodeMask
              outerMaskOpacity={0}
              animatedLineHeight={5}
              edgeBorderWidth={0}
              height={PixcelWidth(317)}
              lineAnimationDuration={1000}
            /> : renderFaceBox()}
          </FastImage>
          </>
          }
        {/* <TensorCamera
          // Standard Camera props
          style={styles.cameraContainer}
          type={Camera.Constants.Type.front}
          ref={(cam) => {
            console.log(":::", cam)
            setCamera(cam);
          }}
          flashMode='off'
          // Tensor related props
          // cameraTextureHeight={textureDims.height}
          // cameraTextureWidth={textureDims.width}
          resizeHeight={200}
          resizeWidth={152}
          resizeDepth={3}
          onReady={handleCameraStream}
          autorender={autoRender}
        >
        </TensorCamera>
        {isProccessing ? <BarcodeMask
          outerMaskOpacity={0}
          animatedLineHeight={5}
          edgeBorderWidth={0}
          height={PixcelWidth(317)}
          lineAnimationDuration={1000}
        /> : (
          // <FastImage style={styles.roundContainer} source={eclipsIcon} />
          renderFaces()
        )} */}

        {/* {isLoading ?
          <ActivityIndicator
            style={{
              backgroundColor: color.primary_color,
              flex: 1
            }}
            color='#fff'
          /> :
          !isImageCaptured ?
            <React.Fragment>
              <Camera
                // Standard Camera props
                ref={camera}
                style={styles.camera}
                type={Camera.Constants.Type.front}
              // ratio={"512:369"}

              // tensor related props
              // cameraTextureHeight={textureDims.height}
              // cameraTextureWidth={textureDims.width}
              // resizeHeight={inputTensorHeight}
              // resizeWidth={inputTensorWidth}
              // resizeDepth={3}
              // onReady={handleCameraStream}
              // autorender={autoRender}
              >

              </Camera>
              <View style={styles.faceContainer}>
                <FastImage style={styles.roundContainer} source={eclipsIcon} />
              </View>
            </React.Fragment>
            : (
              <>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{ flex: 1, transform: [{ scaleX: (Platform.OS === 'android' && isCameraClick) ? -1 : 1 }] }} //transform: [{ scaleX: -1 }]
                  source={{
                    uri: image.uri
                  }}
                >
                </FastImage>
                <View style={styles.imageProcessing}>
                  {isProccessing ? <BarcodeMask
                    outerMaskOpacity={0}
                    animatedLineHeight={5}
                    edgeBorderWidth={0}
                    height={PixcelWidth(317)}
                    lineAnimationDuration={1000}
                  /> : (renderFaces())}
                </View>
              </>
            )
        } */}

      </View>
      <View style={styles.bottomContainer}>
        {!isImageCaptured ? (
          <View style={styles.bottomSubContainer}>
            <View style={{ width: '33%', alignItems: 'center' }}>
              <Pressable onPress={() => {
                selectImage()
              }}>
                <Image
                  source={addCover}
                  style={styles.addGallaryImg}
                />
              </Pressable>
            </View>
            <View style={{ width: '33%', alignItems: 'center' }}>
              <Pressable
                onPress={() => {
                  takePicture();
                }}
                style={styles.snapOuterContainer}>
                <View style={styles.snapInerContainer}></View>
              </Pressable>
            </View>

            {initial ? (
              <View style={{ width: '33%' }} />
            ) : (
              <TextView
                onPress={() => {
                  skip();
                }}
                style={styles.skipText}>
                Skip
              </TextView>
            )}
          </View>
        ) : isProccessing ? (
          <View style={{ width: '100%' }} />
        ) : (
          <View style={{ width: '100%' }}>
            {/* <Image
              style={{ alignSelf: 'center' }}
              source={photoClickText}
              resizeMode="contain"
            /> */}
            <View style={styles.btnContainer}>
              <Pressable onPress={retake} style={styles.btnSkip}>
                <TextView style={styles.retakeTxt}>Retake</TextView>
              </Pressable>
              <Pressable onPress={goNext} style={styles.btnGo}>
                <TextView style={styles.goText}>GOOD TO GO</TextView>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <FaceClickTooltip visible={tooltip} toggle={() => {
        setTooltip(!tooltip)
      }} />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: hp('84%'),
    width: '100%',
    backgroundColor: color.primary_color
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    backgroundColor: color.secondary_color,
    height: hp('16%'),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    paddingBottom: 10
  },
  roundContainer: {
    width: PixcelWidth(217),
    height: PixcelWidth(317),
  },
  snapOuterContainer: {
    height: PixcelWidth(80),
    width: PixcelWidth(80),
    borderRadius: PixcelWidth(40),
    backgroundColor: color.txt_white,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    margin: PixcelWidth(3),
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    shadowOffset: { height: 0, width: 0 },
  },
  snapInerContainer: {
    height: PixcelWidth(60),
    width: PixcelWidth(60),
    borderRadius: PixcelWidth(30),
    backgroundColor: color.txt_white,
    borderWidth: PixcelWidth(1),
    borderColor: 'rgba(0, 0, 0, 0.2)',

    elevation: 3,
    margin: PixcelWidth(3),
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    shadowOffset: { height: 0, width: 0 },
  },
  bottomSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    color: color.txt_white,
    fontFamily: font.MontserratRegular,
    fontSize: PixcelWidth(20),
    width: '33%',
    textAlign: 'center',
  },
  btnSkip: {
    width: '40%',
    justifyContent: 'center',
  },
  btnGo: {
    backgroundColor: color.btnPrimary_color,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  retakeTxt: {
    color: color.txt_white,
  },
  goText: {
    fontWeight: '600',
    color: color.txt_white,
    fontSize: PixcelWidth(15),
    paddingVertical: PixcelWidth(12),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: PixcelWidth(20),
    marginHorizontal: PixcelWidth(15),
  },
  settingTxt: {
    paddingHorizontal: PixcelWidth(10),
    color: color.txt_white,
  },
  noPermissionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary_color,
    flex: 1,
  },
  noPerText: {
    color: color.txt_white,
    marginVertical: PixcelWidth(7),
  },
  faceContainer: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    // position: 'absolute',
    width: "100%",
    height: "100%",
    // transform: [{ scaleX: -1 }]
  },
  addGallaryImg: {
    tintColor: "#fff",
    height: PixcelWidth(40),
    width: PixcelWidth(40),
  },
  imageProcessing: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
});

const mapStateToProps = (state) => ({
  guest: state.guest.guestProfile,
  user: state.login.data,
});

const mapDispatchToProps = (dispatch) => ({
  setGuest: (data) => dispatch(setGuestProfile(data)),
  update: bindActionCreators(updateProfileAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoClick);
