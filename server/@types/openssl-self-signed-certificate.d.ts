/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'openssl-self-signed-certificate' {
    const sign: {
        key: any
        cert: any
    };
    export = sign
}
