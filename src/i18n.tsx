import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import enUsTrans from "./locales/en-US.json";
import zhCnTrans from "./locales/zh-CN.json";
import {
    initReactI18next
} from 'react-i18next';

const resources = {
    en: {
        translation: enUsTrans,
    },
    zh: {
        translation: zhCnTrans,
    },
}

const options = {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'lng'
}

i18n.use(LanguageDetector) //嗅探当前浏览器语言
    .use(initReactI18next) //init i18next
    .init({
        detection: options,
        //引入资源文件
        resources: resources,
        //选择默认语言，选择内容为上述配置中的key，即en/zh
        fallbackLng: "en",
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })

export default i18n;