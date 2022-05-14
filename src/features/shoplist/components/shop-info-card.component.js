import React, { useState } from "react";
import { SvgXml } from "react-native-svg";

import star from "../../../../assets/star";
import massage from "../../../../assets/massage";
import salon from "../../../../assets/salon";
import parlour from "../../../../assets/parlour";
import { Text } from "../../../components/typography/text.component";
import {
  StyledCard,
  CardCover,
  Info,
  Rating,
  Section,
  SectionEnd,
} from "./shop-info-card.styles";
import { Favourite } from "../../../components/favourites/favourites.component";
import { Spacer } from "../../../components/spacer/spacer.component";
//rating-algo => https://stackoverflow.com/questions/10196579/algorithm-used-to-calculate-5-star-ratings

export const ShopInfo = ({ shops = {} }) => {
  const {
    name,
    gender,
    photos,
    address,
    openingHours,
    isOpenNow = true,
    rating = 4,
    type,
  } = shops;
  const ratingArray = Array.from(new Array(Math.round(rating)));

  return (
    <StyledCard elevation={5}>
      <Favourite shop={shops} />
      <CardCover
        key={name}
        source={{
          uri: photos,
        }}
        resizeMode="cover"
      />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((e, index) => (
              <SvgXml key={index} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            <Spacer position="right" size="small">
              {type.spa ? (
                <SvgXml xml={massage} width={22} height={22} />
              ) : null}
            </Spacer>
            <Spacer position="right" size="small">
              {type.salon ? (
                <SvgXml xml={salon} width={22} height={22} />
              ) : null}
            </Spacer>
            <Spacer position="right" size="small">
              {type.parlour ? (
                <SvgXml xml={parlour} width={22} height={22} />
              ) : null}
            </Spacer>
          </SectionEnd>
        </Section>
        <Text variant="caption">{`${address.slice(0, 40)}...`}</Text>
      </Info>
    </StyledCard>
  );
};
