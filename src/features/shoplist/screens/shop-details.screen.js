import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { List } from "react-native-paper";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";

import { ShopList } from "../components/shop-list.styles";
import { ShopInfo } from "../components/shop-info-card.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";

const Accordion = styled(List.Accordion).attrs({
  theme: {
    colors: { primary: `${colors.text.title}` },
  },
})``;

const Price = styled.Text`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.sizes[1]};
`;

const ListItem = styled(List.Item)`
  padding-vertical: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
`;
const Container = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${colors.bg.primary};
  border-radius: ${(props) => props.theme.space[2]};
`;
const Title = styled.Text`
  font-size: ${(props) => props.theme.sizes[1]};
`;

const CheckBox = styled(BouncyCheckbox).attrs({
  iconStyle: { borderColor: "lightgray", borderRadius: 5 },
  fillColor: colors.text.title,
})``;

export const ShopDetailScreen = ({ route, navigation }) => {
  //const [expanded, setExpanded] = useState(true);

  //const handlePress = () => setExpanded(!expanded);
  const { shop } = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("removed");
    removeItem();
  }, [ShopDetailScreen]);
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        shopName: shop.name,
        checkboxValue: checkboxValue,
      },
    });
  const removeItem = (item, checkboxValue) =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        ...item,
        shopName: shop.name,
        checkboxValue: checkboxValue,
      },
    });
  const HeaderContent = () => (
    <>
      <Spacer position="bottom" size="small">
        <ShopInfo shops={shop} home={false} />
      </Spacer>
      <Container>
        <Title> Services Provided :-</Title>
      </Container>
    </>
  );
  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        title={item.name}
        description={`${item.description.slice(0, 50)}...`}
        left={(props) => (
          <CheckBox
            {...props}
            onPress={(checkboxValue) => selectItem(item, checkboxValue)}
          />
        )}
        onPress={() =>
          navigation.navigate("Service Details", { service: item })
        }
        right={(props) => <Price {...props}>{`${item.price}₹`}</Price>}
      />
    );
  };
  return (
    <SafeArea>
      <List.Section>
        <ShopList
          ListHeaderComponent={HeaderContent}
          data={shop.services}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </List.Section>
    </SafeArea>
  );
};
