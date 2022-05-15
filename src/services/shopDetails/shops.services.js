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
  //const [imagepath, setImagePath] = useState();
  const shop = { shops: [] };
  const firestore = getFirestore();

  const q = query(collection(firestore, "shop"));

  // const path = shop.imagepath.replace(
  //   "gs:/booking-app-16723.appspot.com",
  //   ""
  // );
  // console.log(path);
  // const Ref = ref(storage, path);
  // getDownloadURL(Ref).then((x) => {
  //   shop.photo : url
  // });
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
    const s = {
      name: docs.data().name,
      gender: docs.data().gender,
      //imagepath: docs.data().photos.path,
      photos: docs.data().photos,
      contact: docs.data().contact,
      openingHours: docs.data().openingHours,
      address: docs.data().address,
      type: docs.data().type,
      services: docs.data().services,
    };
    // doc.data() is never undefined for query doc snapshots

    shop.shops.push(s);
    //console.log(shop);
  });
  return shop;
};

export const shopDetailsEdit = ({ shops = [] }) => {
  // const getUrl = async (v) => {
  //   console.log(v);
  //   const path = v.replace("gs:/booking-app-16723.appspot.com", "");
  //   console.log(path);
  //   const Ref = ref(storage, path);
  //   await getDownloadURL(Ref).then((x) => {
  //     console.log(x);
  //     return x;
  //   });
  // };

  const mappedResults = shops.map((shop) => {
    return {
      ...shop,
    };
  });

  return camelize(mappedResults);
};
