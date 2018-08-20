let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'realsite.com') {
  backendHost = 'https://api.realsite.com';
} else if(hostname === 'staging.realsite.com') {
  backendHost = 'https://staging.api.realsite.com';
} else if(/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:63260';
}

export const api_url = `${backendHost}/api/${apiVersion}`;

export const page_size_default = 10;