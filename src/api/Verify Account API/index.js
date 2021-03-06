
import { request } from "helpers/requests";


export const verifyAccount = async (url) => {
    try {
        const { data } = await request('get', url.slice(4), null, 1);
        return data;
    }
    catch (error) {
        throw Error(error);
    }
};

