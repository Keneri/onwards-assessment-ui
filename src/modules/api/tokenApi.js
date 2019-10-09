class TokenApi {

  static GetToken() {
    const currTimestamp = Math.round(new Date().getTime());

    if (localStorage.u) {
      const parseStorage = JSON.parse(localStorage.u);

      if (currTimestamp > new Date(parseStorage.token.expiresIn).getTime()) {
        localStorage.removeItem('u');
        window.parent.location = `${window.parent.location.origin}/login`;
      } else {
        return `${parseStorage.token.tokenType} ${parseStorage.token.accessToken}`;
      }
    } else {
      window.parent.location = `${window.parent.location.origin}/login`;
    }
  }

}

export default TokenApi;