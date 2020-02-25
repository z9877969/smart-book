export const ActionType = {
    REGISTRATION_REQUEST: 'REGISTRATION_REQUEST',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_ERROR: 'REGISTRATION_ERROR',
}

export interface RegistrationCredentials {
    email: string
    password: string
    name: {
        fullName: string
    }
}

interface registrationRequest {
    type: typeof ActionType.REGISTRATION_REQUEST,
};

interface registrationSuccess {
    type: typeof ActionType.REGISTRATION_SUCCESS,
    payload: object,
};

interface registrationError {
    type: typeof ActionType.REGISTRATION_ERROR,
    payload: object,
};

export type RegistrationActionTypes = registrationRequest | registrationSuccess | registrationError;