import { IItemInterface } from '../../../interfaces/IItemInterface';
import { IMedicine } from '../../../interfaces/IMedicine';

export const mapIItemsToIMedicine = (item: IItemInterface): IMedicine => {
  return {
    id: item.name,
    name: item.item_name,
    price: item.sellingPrice,
    quantity: item.itemQuantity,
    status: item.itemQuantity > 0 ? 'In Stock' : 'Out of Stock',
    image: item.itemImage,
    category: item.itemCategoryName,
  };
};
