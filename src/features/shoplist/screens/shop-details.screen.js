import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { List } from "react-native-paper";

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
  padding: ${(props) => props.theme.space[3]};
`;
const Container = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${colors.bg.primary};
`;
const Title = styled.Text`
  font-size: ${(props) => props.theme.sizes[1]};
`;

export const ShopDetailScreen = ({ route, navigation }) => {
  //const [expanded, setExpanded] = useState(true);

  //const handlePress = () => setExpanded(!expanded);
  const { shop } = route.params;
  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ShopInfo shops={shop} home={false} />
        <Container>
          <Title> Services Provided :-</Title>
        </Container>
        <List.Section>
          <ListItem
            title="Hair Cuts & Styling"
            description="Accentuate your best..."
            //left={(props) => <List.Icon {...props} color="black" icon="heart" />}
            onPress={() => navigation.navigate("Service Details")}
            right={(props) => <Price {...props}>180₹</Price>}
          />
          <ListItem
            title="Hair Colouring & Highlights"
            description="Reinvent your whole look..."
            //left={(props) => <List.Icon {...props} color="black" icon="heart" />}
            onPress={() => navigation.navigate("Service Details")}
            right={(props) => <Price {...props}>200₹</Price>}
          />
          <ListItem
            title="Hair Spa"
            description="Pampering yourself and your hair..."
            //left={(props) => <List.Icon {...props} color="black" icon="heart" />}
            onPress={() => navigation.navigate("Service Details")}
            right={(props) => <Price {...props}>250₹</Price>}
          />
          <ListItem
            title="Hair Spa"
            description="Pampering yourself and your hair..."
            //left={(props) => <List.Icon {...props} color="black" icon="heart" />}
            onPress={() => navigation.navigate("Service Details")}
            right={(props) => <Price {...props}>250₹</Price>}
          />
          <ListItem
            title="Hair Spa"
            description="Pampering yourself and your hair..."
            //left={(props) => <List.Icon {...props} color="black" icon="heart" />}
            onPress={() => navigation.navigate("Service Details")}
            right={(props) => <Price {...props}>250₹</Price>}
          />
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
