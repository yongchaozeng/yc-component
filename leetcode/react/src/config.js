const lyUrlDict = {
    dev: 'https://dev-website-api.dragonest.com',
    qa: 'https://qa-website-api.dragonest.com',
    prod: 'https://website-api.dragonest.com',
};

const baseUrlDict = {
    dev: 'https://chaosacademy-api-dev.dev-test.dragonest.com',
    qa: 'https://chaosacademy-api-qa.dev-test.dragonest.com',
    prod: 'https://demon-vote-api.dragonest.com',

};


export const lyUrl = lyUrlDict[process.env.REACT_APP_ENV] ||
    'https://dev-website-api.dragonest.com';
export const baseUrl = baseUrlDict[process.env.REACT_APP_ENV] ||
    'https://chaosacademy-api-dev.dev-test.dragonest.com';



