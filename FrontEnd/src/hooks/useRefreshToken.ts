import {client} from '../api/api'

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await client.get('/refresh',{
            withCredentials: true
        });
        sessionStorage.setItem('accessToken', response.data)
        console.log('refreshed token access - ', response.data)
        return response.data.accessToken
    }
    return refresh
}

export default useRefreshToken;