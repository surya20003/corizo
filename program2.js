import axios from 'axios';

export const getEnergyData = async () => {
    const response = await axios.get('/api/energy');
    return response.data;
};
