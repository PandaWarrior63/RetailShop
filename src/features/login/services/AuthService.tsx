import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeReponseToIEmployee';
import { IEmployeeInterface } from '../../../interfaces/IEmployeeInterface';
import useAxiosInstance from './useAxiosInstance';
import { toast } from 'react-toastify';
import { storageService } from '../../../services/StorageService';
const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setCookie, setUser } = useUserContext(); // Assuming you have a setUser function in your context for setting user data
  const http = useAxiosInstance();

  const signIn = async (
    username: string,
    password: string
  ): Promise<IEmployeeInterface | null> => {
    setLoading(true);
    try {
      const res = await http.post('retailshop.api.v1.auth.login', {
        email: username,
        password: password,
      });

      console.log(res.data);

      if (res.data.message.token ) {
        toast.success('Logged in successfully.');
        const employee =mapEmployeeReponseToIEmployee( {
          employerId: 13,
          branchId: 13,
          employerNicName: "NiceName",
          employerFirstName: "FirstNmae",
          employerLastName: "LastNames",
          employerEmail: username,
          employerPhone: "phone",
          employerAddress: "address",
          employerSalary: 134,
          employerNic: "12313123",
          isActiveStatus: true,
          gender: "male",
          dateOfBirth: "",
          role: "SELLER", // OWNER,SELLER
          pin: "1234",
          profileImage:  null
        });
        /*const employee = mapEmployeeReponseToIEmployee(
          res.data.employerDetails
        );

        console.log(employee);
        localStorage.setItem('user', JSON.stringify(employee));*/

        // Set user data or store cookie if needed
        setCookie(res.data.message.token );
        await storageService.setToken(storageService.token,res.data.message.token)
        await storageService.setToken(storageService.user,JSON.stringify(employee))
        return employee;
      }
    } catch (error) {
      console.log(error);
      toast.warn('Incorrect password. Please try again.');
      //alert('Incorrect password. Please try again.');
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { signIn, loading };
};

export default useSignIn;
