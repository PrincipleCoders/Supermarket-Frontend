import axios from "axios";

const UpdateUserInfo = async (address, telephone) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.put(
            'https://localhost:8081/updateUserInfo',
            {
                address: address,
                telephone: telephone
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