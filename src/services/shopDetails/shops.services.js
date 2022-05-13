import mocks from "./mocks.json";
import camelize from "camelize";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

export const shopDetailsRequest = async () => {
  const shop = { shops: [] };
  const firestore = getFirestore();
  const q = query(collection(firestore, "shop"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
    const s = {
      name: docs.data().shop.name,
      gender: docs.data().shop.gender,
      //photos: docs.data().shop.photos.path,
      vicinity: docs.data().shop.vicinity,
      type: docs.data().shop.type,
    };
    // doc.data() is never undefined for query doc snapshots

    shop.shops.push(s);
    //console.log(shop);
  });
  return shop;
};

export const shopDetailsEdit = ({ shops = [] }) => {
  const mappedResults = shops.map((shop) => {
    return {
      ...shop,
    };
  });

  return camelize(mappedResults);
};
