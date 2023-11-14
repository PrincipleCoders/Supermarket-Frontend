import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + 'user'

const UpdateUserInfo = async (userId, address, telephone) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            API_URL,
            {
                userId: userId,
                address: address,
                phone: telephone
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }
        );

        console.log('Details Updated Successfully',response.data);
    } catch (error){
        console.error('Error updating user details:',error);
    }
};

export default UpdateUserInfo ;