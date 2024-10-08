import React, { useState } from 'react';
import Divider from '../../../shared/divider/Divider';
import CashierNavBar from '../../../shared/navbar/CashierNavBar';
import OrderDetailsSideBar from '../components/cashier_dashboard_order_details_sidebar/OrderDetailsSideBar';
import PaymentDrawer from '../components/cashier_dashboard_payement_sidebar/PaymentDrawer';
import ConfirmPaymentPopUp from '../components/cashier_dashboard_payment_confirm_popup/ConfirmPaymentPopUp';
import Medicine from '../components/medicine-table/Medicine';
import CashierSideBar from '../components/sidebar/CashierSideBar';
import { OrderedMedicine } from '../interfaces/OrderMedicine';
import { PaymentContextType } from '../interfaces/PaymentContextType';
import { PaymentDetails } from '../interfaces/PaymentDetails';
import PersonalCareTable from '../components/personal-care-table/PersonalCareTable';
import SportsTable from '../components/sports-table/SportsTable';
import NutritionTable from '../components/nutrition-table/NutritionTable';
import FirstAidTable from '../components/first-aid-table/FirstAidTable';
import MedicalDeviceTable from '../components/medical-device-table/MedicalDeviceTable';
import { IMedicine } from '../../../interfaces/IMedicine';
import SelectPosModal from '../components/SelectPosModal';

export enum ComponentState {
  OrderDetails,
  ConfirmPayment,
  PopupPayment,
}

const PaymentContext = React.createContext<PaymentContextType | undefined>(
  undefined
);

export const usePaymentContext = () => {
  const context = React.useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};

const MainCashierDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState(
    ComponentState.OrderDetails
  );

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: '',
    paymentAmount: 0,
    paymentDate: new Date(),
    paymentNotes: '',
    paymentDiscount: 0,
    paidAmount: 0,
  });

  const [orderedMedicine, setOrderedMedicine] = useState<OrderedMedicine[]>([]);

  const [medicine, setMedicine] = useState<IMedicine[]>([]);

  const [filteredMedicine, setFilteredMedicine] = useState<IMedicine[]>([]);
  const [showPosModal, setShowPosModal] = useState(true);
  const contextValue: PaymentContextType = {
    currentComponent,
    setCurrentComponent,
    paymentDetails,
    setPaymentDetails,
    orderedMedicine,
    setOrderedMedicine,
    medicine,
    setMedicine,
    filteredMedicine,
    setFilteredMedicine,
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case ComponentState.OrderDetails:
        return <OrderDetailsSideBar />;
      case ComponentState.ConfirmPayment:
        return <PaymentDrawer />;
      case ComponentState.PopupPayment:
        return <ConfirmPaymentPopUp />;
      default:
        return <OrderDetailsSideBar />;
    }
  };

  const [activeTable, setActiveTable] = useState('medicine');

  return (
    <div className='flex flex-col h-screen'>
      <CashierNavBar />
      <div className='flex flex-row min-h-[90%]'>
        <CashierSideBar setActiveTable={setActiveTable} />
        <Divider />
        <PaymentContext.Provider value={contextValue}>
          {activeTable === 'medicine' && <Medicine />}
          {activeTable === 'personal-care' && <PersonalCareTable />}
          {activeTable === 'sports' && <SportsTable />}
          {activeTable === 'nutrition' && <NutritionTable />}
          {activeTable === 'first-aid' && <FirstAidTable />}
          {activeTable === 'medical-devices' && <MedicalDeviceTable />}
          {renderComponent()}
        </PaymentContext.Provider>
      </div>
      <div>
        {showPosModal?
        <SelectPosModal onClose={() => {
            console.log("Close Select Pos")
            setShowPosModal(false);
            // fetchCompanies();
          }}/>:null
        }
      </div>
    </div>
  );
};

export default MainCashierDashboard;
// /
