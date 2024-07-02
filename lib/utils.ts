import { isAxiosError } from 'axios';

export const getErrorMsg = (error: Error) => {
    let errorMsg = error.message;
    if (isAxiosError(error)) {
        const dataError = error.response?.data?.error;
        const msg = dataError?.message || dataError;
        if (msg) {
            errorMsg = msg;
        }
    }
    return errorMsg ?? 'Something went wrong';
};

export const onError = (error: Error) => {
    alert(getErrorMsg(error));
};
