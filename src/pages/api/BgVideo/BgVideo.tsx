
import React, { Component } from 'react'
import ReactPlayer from 'react-player' // needed
import styles from './BgVideo.module.css';

export class BgVideo extends Component<any, any> {

  render() {
    return (
        <video autoPlay={true} loop={true} muted={true}
                src="/bg_video.mov" id={styles.bgVideo}></video>
    );
  }
}