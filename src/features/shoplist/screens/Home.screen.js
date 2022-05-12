import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { ShopList } from "../components/shop-list.styles";
import { SearchBar } from "../components/SearchBar";
import { ShopInfo } from "../components/shop-info-card.component";
import { Offers } from "../components/Offers";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ShopsContext } from "../../../services/shopDetails/shops.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FadeInView } from "../../../components/animations/fade.animation";

const SearchBarView = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 65%;
  left: 50%;
`;

export const HomeScreen = ({ navigation }) => {
  const { shop, isLoading, error } = useContext(ShopsContext);
  const { favourites } = useContext(FavouritesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [isToggled, setIsToggled] = useState(false);

  const filteredshop = shop.filter((shops) => {
    return shops.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const OffersList = () => (
    <Spacer position="bottom" size="large">
      <Offers />
    </Spacer>
  );
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate("Shop Details", { shop: item })}
      >
        <Spacer position="bottom" size="large">
          <ShopInfo shops={item} />
        </Spacer>
      </TouchableOpacity>
    );
  };
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <SearchBarView>
        <SearchBar
          isFavToggled={isToggled}
          onFavToggle={() => setIsToggled(!isToggled)}
          searchinfo={onChangeSearch}
        />
      </SearchBarView>
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <ShopList
        data={filteredshop}
        ListHeaderComponent={OffersList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
