import axios from "axios";

const UpdateUserInfo = async (fname, lname, address, telephone) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.put(
            'https://localhost:8081/updateUserInfo',
            {
                fname: fname,
                lname: lname,
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
        console.error('Error updating cart:',error);
    }
};

export default UpdateUserInfo ;