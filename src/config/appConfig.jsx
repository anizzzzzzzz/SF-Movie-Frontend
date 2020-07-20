export const envType = {
    'MOCK': 1,
    'LOCAL': 2,
    'DEV': 3,
    'PROD': 4
};

let env = envType.DEV;
let ROOT_API = '';

if(env === 3)
    ROOT_API='http://localhost:8080';
else if(env === 4)
    ROOT_API='http://192.168.1.86:8080';

export default ROOT_API;