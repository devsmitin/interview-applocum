import axios from "axios";

const sendRequest = async (url, data) => {
  let result;

  try {
    result = await axios.post(url, data);
  } catch (error) {
    result = error;
    console.log("There was some error!");
  }

  return result;
};

const logMeOut = async (url, token) => {
  let result;

  try {
    result = await axios.delete(url, {
      headers: {
        AUTH_TOKEN: token,
      },
    });
  } catch (error) {
    result = error;
    console.log("There was some error!");
  }

  return result;
};

const setCookie = (e, t, n) => {
  var i = new Date();
  i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
  var o = "expires=" + i.toUTCString();
  document.cookie = e + "=" + t + ";" + o + ";path=/";
};

const getCookie = (e) => {
  for (
    var t = e + "=", n = document.cookie.split(";"), i = 0;
    i < n.length;
    i++
  ) {
    for (var o = n[i]; " " === o.charAt(0); ) o = o.substring(1);
    if (0 === o.indexOf(t)) return o.substring(t.length, o.length);
  }
  return "";
};

const checkNull = function (o) {
  return "undefined" == typeof o || null == o || "" === o.toString().trim();
};

export { sendRequest, logMeOut, setCookie, getCookie, checkNull };
