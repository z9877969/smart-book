export const ActionType = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
    REFRESH_USER_REQUEST: 'REFRESH_USER_REQUEST',
    REFRESH_USER_SUCCESS: 'REFRESH_USER_SUCCESS',
    REFRESH_USER_ERROR: 'REFRESH_USER_ERROR',
    REGISTRATION_REQUEST: 'REGISTRATION_REQUEST',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_ERROR: 'REGISTRATION_ERROR',
}

export interface LoginCredentials {
    email: string
    password: string
}


//=============login actions ============
interface loginSuccessAction {
    type: typeof ActionType.LOGIN_SUCCESS
    payload: object
}

interface loginRequestAction {
    type: typeof ActionType.LOGIN_REQUEST,
};

interface loginErrorAction {
    type: typeof ActionType.LOGIN_ERROR,
    payload: object,
};


//=============logout==========
interface logOutSuccessAction {
    type: typeof ActionType.LOGOUT,
};

interface logOutErrorAction {
    type: typeof ActionType.LOGOUT_ERROR,
    payload: object,
};


//=============refresh user actions==========

interface refreshUserRequestAction {
    type: typeof ActionType.REFRESH_USER_REQUEST,
};

interface refreshUserSuccessAction {
    type: typeof ActionType.REFRESH_USER_SUCCESS,
    payload: object,
};

interface refreshUserErrorAction {
    type: typeof ActionType.REFRESH_USER_ERROR,
    payload: object,
};

export type LoginActionTypes = loginSuccessAction |
    loginRequestAction | loginErrorAction | logOutErrorAction | logOutSuccessAction
    | refreshUserRequestAction | refreshUserSuccessAction | refreshUserErrorAction;