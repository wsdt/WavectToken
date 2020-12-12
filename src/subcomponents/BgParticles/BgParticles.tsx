import Particles from "react-particles-js"
import { AssetService } from "src/services/Asset.service"
import styles from './BgParticles.module.css';

export const BgParticles = (props: any) => {
    return <Particles canvasClassName={styles.particlesBg} params={{
        "particles": {
	        "number": {
	            "value": 60
	        },
	        "size": {
	            "value": 2
            },
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        }
        },     
        "retina_detect": true 
    }} />
}

/*
  polygon: {
            enable: true,
            type: 'inside',
            move: {
                radius: 10
            },
            url: AssetService.getPath('Logo_WAVECT_color_sym.svg'),
        }
*/