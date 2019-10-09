import userApi from "./api/userApi";

export const USER_SETAUTHENTICATION = "user/SETAUTHENTICATION";
export const USER_LOGIN = "user/LOGIN";
export const USER_LOGOUT = "user/LOGOUT";

const currTimestamp = Math.round(new Date().getTime());

if (localStorage.u) {
  const parseStorage = JSON.parse(localStorage.u);

  if (parseStorage.token.expiresIn) {
    if (currTimestamp > new Date(parseStorage.token.expiresIn).getTime()) {
      localStorage.removeItem("u");
      window.parent.location = `${window.parent.location.origin}/login`;
    }
  }
}

const initialState = {
  isAuthenticated: localStorage.u ? true : false,
  userProfile: localStorage.u ? JSON.parse(localStorage.u) : {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SETAUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: action.auth,
        userProfile: action.payload
      };

    case USER_LOGOUT:
      return {
        ...state,
        userProfile: {},
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export const userSetAuthentication = payload => {
  return dispatch => {
    dispatch({
      type: USER_SETAUTHENTICATION,
      payload
    });
  };
};

export const userLogin = payload => {
  return dispatch => {
    return userApi
      .UserLogin(payload)
      .then(data => {
        if (data.user.role) {
          localStorage.setItem("u", JSON.stringify(data));

          setTimeout(() => {
            dispatch({
              type: USER_LOGIN,
              payload: data,
              auth: true
            });
          }, 1000);

          return data;
        }
        delete data.token;
        return data;
      })
      .catch(error => {
        throw error;
      });
  };
};

export const userLogout = () => {
  return dispatch => {
    dispatch({
      type: USER_LOGOUT
    });

    localStorage.removeItem("u");
  };
};

export const userRegister = payload => {
  return dispatch => {
    return userApi
      .UserRegister(payload)
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  };
};


