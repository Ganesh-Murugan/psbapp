import mocks from "./mocks.json";
import camelize from "camelize";

export const shopDetailsRequest = () => {
  return new Promise((resolve, reject) => {
    const mock = mocks;
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const shopDetailsEdit = ({ shops = [] }) => {
  const mappedResults = shops.map((shop) => {
    return {
      ...shop,
      isOpenNow: shop.opening_hours && shop.opening_hours.open_now,
      isClosedTemporarily: shop.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
