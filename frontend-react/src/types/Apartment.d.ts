interface Apartment {
  title: string;
  description: string;
  id: string;
  latitude: number;
  longitude: number;
  previewImage: string;
  price: number;
  roomsNo: number;
  areaSize: number;
  realtor:
    | string
    | {
        id: string;
        name: string;
      };
}
