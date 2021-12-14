import {ParseAuth, ParseClient} from "ra-data-parse";

const parseConfig = {
    URL: '/parse',
    JAVASCRIPT_KEY: '',
    APP_ID: 'stocklog'
}

export const dataProvider = ParseClient(parseConfig);
// Pass it as the second parameter after the base URL.
export const authProvider = ParseAuth(parseConfig);