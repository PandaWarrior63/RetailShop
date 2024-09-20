import { useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { mapEmployeeReponseToIEmployee } from '../utils/mapEmployeeReponseToIEmployee';
import { IEmployeeInterface } from '../../../interfaces/IEmployeeInterface';
import useAxiosInstance from './useAxiosInstance';
import { toast } from 'react-toastify';
import { storageService } from '../../../services/StorageService';
const useInitData = () => {
  const [initDataLoading, setInitDataLoading] = useState(false);
  const http = useAxiosInstance();

  const getInitData = async (
  ): Promise<any> => {
    setInitDataLoading(true);
    try {
      const res = await http.get('retailshop.api.v1.data.data.init_data' );
      return res.data.message;
    } catch (error) {
      console.log(error);
      toast.warn('Error occurs in loading initial data. Please restart app.');
  } finally {
      setInitDataLoading(false);
    }

    return null;
  };

  return { getInitData, initDataLoading };
};

export default useInitData;
