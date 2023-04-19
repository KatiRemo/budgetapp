// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  // delete user or item
export const deleteItem = ({key}) => {
  return localStorage.removeItem(key)
};