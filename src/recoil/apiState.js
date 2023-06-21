import { atom, selector } from 'recoil';
import axios from 'axios';

// Atom
export const selectedMassagePlaceState = atom({
  key: 'selectedMassagePlaceState',
  default: null,
});

// Selector
export const massagePlacesSelector = selector({
  key: 'massagePlacesSelector',
  get: async () => {
    try {
      const response = await axios.get('/massage-places');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch massage places:', error);
      throw error;
    }
  },
});

export const massagePlaceDetailSelector = selector({
  key: 'massagePlaceDetailSelector',
  get: async ({ get }) => {
    const selectedPlace = get(selectedMassagePlaceState);
    if (!selectedPlace) return null;

    try {
      const response = await axios.get(`/massage-places/${selectedPlace}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch massage place detail:', error);
      throw error;
    }
  },
});

// Hook
export const useFetchMassagePlaces = () => {
  const massagePlaces = useRecoilValue(massagePlacesSelector);

  useEffect(() => {
    // Fetch massage places
  }, []);

  return massagePlaces;
};
