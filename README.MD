# visual-recognition-ionic

1. The user uploads an image from the camera of his device to the [Node JS Server](https://github.com/maxgfr/visual-recognition-server/).

2. Then, the [Node JS Server](https://github.com/maxgfr/visual-recognition-server/) uses IBM Visual Recognition API to send a JSON Response to the Ionic Application.

3. The Ionic Application displays to the user the confidence and the class of the image from the previous JSON Response.

## Run the project

```
    npm install -g ionic cordova
    git clone https://github.com/maxgfr/visual-recognition-ionic.git
    cd visual-recognition-ionic
    ionic platform add ios
    ionic emulate ios
```

## Global Architecture

![alt text](https://github.com/maxgfr/visual-recognition-ionic/blob/master/screen/screen4.png)

## Application :

<div align="center">
  <img src="https://github.com/maxgfr/visual-recognition-ionic/blob/master/screen/screen1.png" height="540" width="200"/>
  <img src="https://github.com/maxgfr/visual-recognition-ionic/blob/master/screen/screen2.png" height="540" width="200"/>
  <img src="https://github.com/maxgfr/visual-recognition-ionic/blob/master/screen/screen3.png" height="540" width="200"/>
</div>
