import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { List } from "react-native-paper";

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
  font-size: ${(props) => props.theme.sizes[1]};
`;

const ListItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[4]};
`;
const Container = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${colors.bg.primary};
  border-radius: ${(props) => props.theme.space[2]};
`;
const Title = styled.Text`
  font-size: ${(props) => props.theme.sizes[1]};
`;

export const ShopDetailScreen = ({ route, navigation }) => {
  //const [expanded, setExpanded] = useState(true);

  //const handlePress = () => setExpanded(!expanded);
  const { shop } = route.params;
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
        //left={(props) => <List.Icon {...props} color="black" icon="heart" />}
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
