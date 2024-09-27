import { useState } from 'react';
import ButtonWithTextOnly from '../../../../shared/buttons/ButtonWithTextOnly';
import MedicineGrid from '../order-details/MedicineGrid';
import {
  ComponentState,
  usePaymentContext,
} from '../../layout/MainCashierDashboard';

type Props = {};

const OrderDetailsSideBar = (props: Props) => {
  const { setCurrentComponent, medicine, setFilteredMedicine } =
    usePaymentContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const PayNowButtonClick = () => {
    setCurrentComponent(ComponentState.ConfirmPayment);
  };

  const handleSearchMedicine = (value: string): void => {
    setSearchQuery(value.trim());
    if (value === '') {
      setFilteredMedicine(medicine);
    } else {
      setFilteredMedicine(
        medicine.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className='w-auto flex pt-4 flex-col font-poppins space-y-3 p-0 min-h-[400px] max-w-[450px] min-w-[450px]'>
      <p className='font-bold w-10/12  text-sky-400 text-center mx-auto p-2 '>
        Order Details
      </p>
      <div>
        <p className='font-bold'>BarCode</p>
        <input
          className='border p-2 rounded-md w-full'
          type='text'
          placeholder='Scan or enter barcode'
          value={searchQuery}
          onChange={(e) => handleSearchMedicine(e.target.value)}
        />
      </div>
      <div>
        <MedicineGrid />
      </div>

      <div>
        <ButtonWithTextOnly text='Pay Now' onClick={PayNowButtonClick} />
      </div>
    </div>
  );
};

export default OrderDetailsSideBar;
