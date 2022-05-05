import React, { useState, useContext } from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  Background,
  BgOpacity,
  Container,
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../components/auth.screen.styles";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error } = useContext(AuthenticationContext);
  return (
    <Background>
      <BgOpacity />
      <Container>
        <AuthInput
          label="E-mail"
          returnKeyType="next"
          value={email}
          autoCompleteType="email"
          textContentType="emailAddress"
          keyBoardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer position="top" size="large">
          <AuthInput
            label="Password"
            returnKeyType="done"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <ErrorContainer>
          {error && (
            <Spacer size="large">
              <Text variant="error">{error}</Text>
            </Spacer>
          )}
        </ErrorContainer>

        <Spacer position="top" size="large">
          <AuthButton
            icon="lock-open-outline"
            onPress={() => onLogin(email, password)}
          >
            Login
          </AuthButton>
        </Spacer>
      </Container>
      <Spacer size="large">
        <AuthButton
          icon="backspace-outline"
          onPress={() => navigation.goBack()}
        >
          Back
        </AuthButton>
      </Spacer>
    </Background>
  );
};
