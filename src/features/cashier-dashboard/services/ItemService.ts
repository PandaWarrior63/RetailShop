import { useEffect, useState } from 'react';
import useAxiosInstance from '../../login/services/useAxiosInstance';
import { mapIItemsToIMedicine } from '../utils/mapIItemsToIMedicine';
import { useUserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';
import { IMedicine } from '../../../interfaces/IMedicine';
import { usePaymentContext } from '../layout/MainCashierDashboard';
import { IItemInterface } from '../../../interfaces/IItemInterface';

const useItemService = () => {
  const http = useAxiosInstance();
  const [items, setItems] = useState([]);

  // const getAllItems = async () => {
  //   try {
  //     const res = await http.get('/item/get-all-items');
  //     const data = res.data.data;
  //     if (data.length === 0) return [];
  //     const mappedItems = data.map((item: any) => mapIItemsToIMedicine(item));
  //     setItems(mappedItems);
  //     console.log(res);
  //     return mappedItems;
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // };
  const user = useUserContext();
  // const [medicine, setMedicine] = useState<IMedicine[]>([]);
  // const [filteredMedicine, setFilteredMedicine] = useState<IMedicine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { setMedicine, medicine, setFilteredMedicine, filteredMedicine } =
    usePaymentContext();

  const getAllItems = async () => {
    try {
      if (!user) {
        toast.error('Not logged in');
        return;
      }
      setLoading(true);
      const res = await http.get(
        `/retailshop.api.v1.data.data.items/${user.user?.branchId}`
        // `/item/branched/get-item/1`
      );
      console.log(res);
      const data = res.data.message.items;
      const prices = res.data.message.prices;
      if (data.length === 0) return [];
      const mappedItems = data.map((item: any) => mapIItemsToIMedicine(item)).map((item: IMedicine) =>{
        const defaultPrice = prices.find((priceItem: any) => priceItem.item_code === item.name);
        console.log("default rpice=",defaultPrice);
        let price = defaultPrice?.price_list_rate || 0
        return {
            ...item,price:price
        }
      });
      setItems(mappedItems);
      console.log(res);
      setMedicine(mappedItems);
      setFilteredMedicine(mappedItems);
      return mappedItems;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getItemById = async (id: string) => {
    try {
      const res = await http.get('/item/' + id);
      const items = res.data.data;
      const mappedItems = items.map((item: any) => mapIItemsToIMedicine(item));
      return mappedItems;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    items,
    getAllItems,
    getItemById,
    medicine,
    filteredMedicine,
    setFilteredMedicine,
    loading,
  };
};

export default useItemService;
