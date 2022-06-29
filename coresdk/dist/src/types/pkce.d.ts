export interface PkceCodeChallenge {
    challenge: string;
    method: string;
}
export interface Pkce {
    codeVerifier: string;
    codeChallenge: PkceCodeChallenge;
}
