import { xyz, rgb, kelvin } from '../plugins/colorConvert';

export default hueHelper = {
    setHue: (state) => {
        console.log(state, "STATE...");
        if (!state.hue) {//cacl only if hue not present
            let RGB = [], HSL = [];
            if (state.xy && state.xy.length > 0) {
                RGB = xyz.rgb(state.xy[0], state.xy[1], state.bri, false)
            }
            else if (state.ct) {
                RGB = kelvin.rgb(state.ct, false);
            }
            HSL = rgb.hsl(RGB[0], RGB[1], RGB[2], false);
            state.hue = HSL[0];
            state.sat = HSL[1];
            state.bri = HSL[2];
        }
        return state;
    }
}