import RNFetchBlob from "rn-fetch-blob";

export default (GLOBALS = {
    HEADERS: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export const DEBUG = {
    DEBUG: true,
    INFO: true,
    SUCCESS: true,
    DATABASE: true,
    DATABASE_QUERY: true,
    LIGHT_COLOR: true
};

export const DIRS = {
    LOCAL_URL: `${RNFetchBlob.fs.dirs.DocumentDir}`,
    IP: `http://192.168.1.157`
};