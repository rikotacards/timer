export const isSafari = () =>{
    return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
           navigator.userAgent && !navigator.userAgent.match('CriOS');
  }
  