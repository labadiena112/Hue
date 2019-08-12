import { DEBUG } from '../plugins/globals';
import debug from '../plugins/debug';

let kelvin_rgb_table = {
    2000: [255, 138, 18],
    2100: [255, 142, 33],
    2200: [255, 147, 44],
    2300: [255, 152, 54],
    2400: [255, 157, 63],
    2500: [255, 161, 72],
    2600: [255, 165, 79],
    2700: [255, 169, 87],
    2800: [255, 173, 94],
    2900: [255, 177, 101],
    3000: [255, 180, 107],
    3100: [255, 184, 114],
    3200: [255, 187, 120],
    3300: [255, 190, 126],
    3400: [255, 193, 132],
    3500: [255, 196, 137],
    3600: [255, 199, 143],
    3700: [255, 201, 148],
    3800: [255, 204, 153],
    3900: [255, 206, 159],
    4000: [255, 209, 163],
    4100: [255, 211, 168],
    4200: [255, 213, 173],
    4300: [255, 215, 177],
    4400: [255, 217, 182],
    4500: [255, 219, 186],
    4600: [255, 221, 190],
    4700: [255, 223, 194],
    4800: [255, 225, 198],
    4900: [255, 227, 202],
    5000: [255, 228, 206],
    5100: [255, 230, 210],
    5200: [255, 232, 213],
    5300: [255, 233, 217],
    5400: [255, 235, 220],
    5500: [255, 236, 224],
    5600: [255, 238, 227],
    5700: [255, 239, 230],
    5800: [255, 240, 233],
    5900: [255, 242, 236],
    6000: [255, 243, 239],
    6100: [255, 244, 242],
    6200: [255, 245, 245],
    6300: [255, 246, 247],
    6400: [255, 248, 251],
    6500: [255, 249, 253]
}

export const kelvin = {
    rgb: (ct, returnAsString = true) => {
        let k = Math.round(ct * ((6500 + 2000) / (500 + 153)));
        k = k - (k % 100) + 100;
        if (returnAsString) {
            if (DEBUG.LIGHT_COLOR) debug.info(`rgb(${kelvin_rgb_table[k][0]}, ${kelvin_rgb_table[k][1]}, ${kelvin_rgb_table[k][2]})`);
            return `rgb(${kelvin_rgb_table[k][0]}, ${kelvin_rgb_table[k][1]}, ${kelvin_rgb_table[k][2]})`;
        }
        if (DEBUG.LIGHT_COLOR) debug.info(`Kelvin: ${kelvin_rgb_table[k]}`);
        return kelvin_rgb_table[k];
    }
}

export const hue = {
    hsl: (hue, sat, bri, returnAsString = true) => {
        hue = Math.round(hue * 360 / 65535);
        sat = Math.round(sat / 2.55);
        bri = Math.round(bri / 2.55);
        if (returnAsString) {
            if (DEBUG.LIGHT_COLOR) debug.info(`hsl(${hue}, ${sat}%, ${bri}%)`);
            return `hsl(${hue}, ${sat}%, ${bri}%)`;
        }
        if (DEBUG.LIGHT_COLOR) debug.info(`H: ${hue} | S: ${sat}% | L: ${bri}%`);
        return [hue, sat, bri];
    }
}

export const rgb = {
    hsl: (r, g, b, returnAsString = true) => {
        r = r / 255;
        g = g / 255;
        b = b / 255;
        const min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min;
        let h, s;

        if (max === min) {
            h = 0;
        } else if (r === max) {
            h = (g - b) / delta;
        } else if (g === max) {
            h = 2 + (b - r) / delta;
        } else if (b === max) {
            h = 4 + (r - g) / delta;
        }

        h = Math.min(h * 60, 360);

        if (h < 0) {
            h += 360;
        }

        const l = (min + max) / 2;

        if (max === min) {
            s = 0;
        } else if (l <= 0.5) {
            s = delta / (max + min);
        } else {
            s = delta / (2 - max - min);
        }

        if (returnAsString) {
            if (DEBUG.LIGHT_COLOR) debug.info(`hsl(${h}, ${s * 100}%, ${l * 100}%)`);
            return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
        }
        if (DEBUG.LIGHT_COLOR) debug.info(`H: ${h * (65535 / 360)} | S: ${s * 255}% | L: ${l * 255}%`);
        return [h * (65535 / 360), s * 255, l * 255];
    }
}

export const xyz = {
    rgb: (xy0, xy1, bri, returnAsString = true) => {
        let xyz = 1.0 - xy0 - xy1,
            x = ((bri / xy1) * xy0) / 100,
            y = bri / 100,
            z = ((bri / xy1) * xyz) / 100,
            r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986),
            g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415),
            b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
        //Assume sRGB
        r = r > 0.0031308
            ? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
            : r * 12.92;
        g = g > 0.0031308
            ? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
            : g * 12.92;
        b = b > 0.0031308
            ? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
            : b * 12.92;
        r = Math.round(Math.min(Math.max(0, r), 1) * 255);
        g = Math.round(Math.min(Math.max(0, g), 1) * 255);
        b = Math.round(Math.min(Math.max(0, b), 1) * 255);
        if (returnAsString) {
            if (DEBUG.LIGHT_COLOR) debug.info(`rgb(${r}, ${g}, ${b})`);
            return `rgb(${r}, ${g}, ${b})`;
        }
        if (DEBUG.LIGHT_COLOR) debug.info(`R: ${r} | G: ${g} | B: ${b}`);
        return [r, g, b];
    }
}