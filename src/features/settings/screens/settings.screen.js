import React, { useContext, useEffect, useState } from "react";
import { List, Avatar, ActivityIndicator } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[2]};
`;
const Container = styled.View`
  padding: ${(props) => props.theme.space[4]};
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const firestore = getFirestore();
  const { onLogout, users, error } = useContext(AuthenticationContext);
  useEffect(() => {
    getDoc(doc(firestore, "users", users.uid)).then((d) => {
      if (d) {
        console.log("i ran");
        setName(d.data().name);
        setIsLoading(false);
      } else {
        setName("none");
        setIsLoading(false);
      }
    });
  }, [SettingsScreen]);

  console.log(name);
  // const docRef = getDoc(doc(firestore, "users", auth.currentUser.uid));
  // console.log(docRef);

  // if (docRef) {
  //   console.log("Document data:", docRef.data.name);
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  return (
    <SafeArea>
      <Container>
        <Avatar.Image
          size={140}
          source={require("../../../../assets/avatar.png")}
          backgroundColor={colors.ui.tertiary}
        />
        <Spacer position="top" size="large">
          {!isLoading ? (
            <Text variant="label">{name}</Text>
          ) : (
            <ActivityIndicator animating={true} color={colors.ui.secondary} />
          )}
        </Spacer>
      </Container>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
        <SettingsItem
          title="Create Business Account"
          left={(props) => (
            <List.Icon {...props} color="black" icon="account" />
          )}
          onPress={() => null}
        />
      </List.Section>
    </SafeArea>
  );
};
