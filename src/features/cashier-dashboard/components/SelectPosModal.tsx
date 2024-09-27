import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import {RootState} from '../../../store'

//import useSellerCompanyService from '../services/SellerComapanyService';

interface SelectPosModalProps {
  onClose: () => void;
}

const SelectPosModal: React.FC<SelectPosModalProps> = ({ onClose }) => {
  // const { setFormData, addCompany, formData, adding } =
  //   useSellerCompanyService();
  const open_entries = useSelector<RootState, any[]>(state => state.app.open_entries)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };
  useEffect(()=>{
    console.log("I'm in useEffect")

  },[])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
//    addCompany();
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray bg-opacity-90 z-50 backdrop-blur-xs'>
      <div className='bg-gray-800 rounded-lg p-6 w-[500px] border border-gray-200'>
        <h2 className='text-lg font-semibold mb-4 text-white'>Open Pos</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='warehouseName' className='label-text'>
              Warehouse
            </label>
            <select
              id='warehouseName'
              name='warehouseName'
              //value={formData.companyName}
              onChange={handleChange}
              className='input-box'
              required
            >
            <option value='1'>Medicine</option>
            <option value='2'>Nutritions</option>
            <option value='3'>Sports</option>
            <option value='4'>Equipment</option>
            <option value='5'>First Aid</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='entryName' className='label-text'>
              Opened Entry
            </label>
            <select
              id='entryName'
              name='entryName'
              //value={formData.companyName}
              onChange={handleChange}
              className='input-box'
              required
            >
            {open_entries.map((el)=>(
              <option value={el.name}>{el.name}</option>
            ))}
            
            <option value=''>New Entry</option>
            </select>
          </div>
          
          
          <div className='mb-4'>
            <div className='card'>
              <h6 className='label-text'>  Opening Balance Details</h6>
              <table className="text-sm text-left text-gray-500 dark:text-gray-400 border-solid border-yellow-500 border  bg-white max-h-screen overflow-scroll w-full">
                  <thead>
                  <tr className='border'>
                      <td>Mode of payment</td>
                      <td>Amount</td>
                      <td>Action</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>Cash</td>
                      <td>
                          <input className='input-box' />
                      </td>
                      <td>
                      </td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            >
              Back
            </button>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              {/* {adding ? 'Adding...' : 'Add Company'} */}
              Open Pos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectPosModal;
