import {
  baseVTEX,
  startLoginURL,
  vtexAcountName,
  vtexEnvironment,
} from "../constantsVtex";

type UserEmail = {
  email: string;
};

export default async function startLogin({ user: any }) {
  const uriStart = `${baseVTEX}${vtexAcountName}.myvtex.com${startLoginURL}`;

  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/jsonp");

var formdata = new FormData();
formdata.append("accountName", vtexAcountName);
formdata.append("scope", vtexAcountName);
formdata.append("returnUrl", `https://${vtexAcountName}.myvtex.com/`);
formdata.append("callbackUrl", `https://${vtexAcountName}.myvtex.com/api/vtexid/oauth/finish?popup=false`);
formdata.append("user", "ernesto@vinneren.com.mx");
formdata.append("fingerprint", "");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  //redirect: 'follow'
};

  const response = await fetch(uriStart, requestOptions);
  console.log("start login", response);
  return response;
}
