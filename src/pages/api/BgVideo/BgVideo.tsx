
import React, { Component } from 'react'
import ReactPlayer from 'react-player' // needed
import { AssetService } from 'src/services/Asset.service';
import styles from './BgVideo.module.css';

export class BgVideo extends Component<any, any> {

  render() {
    return (
        <video autoPlay={true} loop={true} muted={true}
                src={AssetService.getPath('bg_video.mov')} id={styles.bgVideo}></video>
    );
  }
}