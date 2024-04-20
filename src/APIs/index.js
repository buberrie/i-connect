import axios from 'axios';

export async function getAllServicesByCategory() {
  try {
    const response = await axios.get('https://i-connect-wj57.onrender.com/api/services/');
    const data = response.data;
    // Use reduce to group objects by category and assign an id to each group
    const groupedData = data.reduce((groups, item) => {
      const { category, ...rest } = item;
      const lowercaseCategory = category.toLowerCase(); // Convert category to lowercase
      if (!groups[lowercaseCategory]) {
          groups[lowercaseCategory] = { id: category, providers: [] };
      }
      groups[lowercaseCategory].providers.push({ ...rest });
      return groups;
  }, {});
    // Convert the object of groups into an array of groups
    const result = Object.values(groupedData);
    return result;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}

export async function getAllServices() {
  try {
    const response = await axios.get('https://i-connect-wj57.onrender.com/api/services/');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get('https://i-connect-wj57.onrender.com/api/user/allUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return null;
  }
}

export const getAllRequests = async () => {
  try {
    const response = await axios.get('https://i-connect-wj57.onrender.com/api/booking/allBooking');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching requests: ${error.message}`);
  }
};

