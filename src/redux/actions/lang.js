import { GET_LANG } from '../actionTypes';
import LANG from '../../plugins/languages';

export function getLang_RP(locale) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            try {
                if (locale == null || locale == undefined) {
                    dispatch({ type: GET_LANG, lang: langObj, locale: "", loaded: true });
                    reject(false);
                }
                let langObj = Object.keys(LANG).reduce((val, i) => {
                    val[i] = LANG[i][locale];
                    return val;
                }, {});
                dispatch({ type: GET_LANG, lang: langObj, locale: locale, loaded: true });
                resolve(true);
            }
            catch (err) {
                dispatch({ type: GET_LANG, lang: getState().lang.lang, locale: getState().lang.locale, loaded: false });
                reject(err);
            }
        })
    };
}