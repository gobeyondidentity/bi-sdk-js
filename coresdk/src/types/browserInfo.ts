

/**
 * This interface concatenates the results (verbatim) from 
 * ua-parser-js and Client Hints (when available).
 */
export interface BrowserInfo {
    browser?: UABrowser,
    platform?: UAPlatform,
    device?: UADevice,
    clientData?: UAClientData,
}

interface UABrowser {
    name?: string,
    version?: string,
    engine_name?: string,
    engine_version?: string,
}

interface UAPlatform {
    name?: string,
    version?: string,
}

interface UADevice {
    architecture?: string,
    model?: string,
    type?: string,
    vendor?: string,
}

interface UAClientData {
    architecture?: string,
    bitness?: string,
    mobile?: boolean,
    model?: string,
    platform?: string,
    platformVersion?: string,
    uaFullVersion?: string,
}


