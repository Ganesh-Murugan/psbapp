import React, { useState } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const images = [
  {
    id: "1",
    image: "https://iconape.com/wp-content/files/dw/185903/png/185903.png",
  },
  {
    id: "2",
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPsn5Uv08zNvcYmeQ8vftVI-n-cROmmqHXC_62f",
  },
  {
    id: "3",
    image:
      "https://scontent.fmaa2-3.fna.fbcdn.net/v/t1.18169-9/13781726_1180081412014760_5872424441395926990_n.png?stp=dst-png_p320x320&_nc_cat=109&ccb=1-6&_nc_sid=85a577&_nc_ohc=ZgW1omQQeVsAX-Zqwyq&_nc_ht=scontent.fmaa2-3.fna&oh=00_AT-i7DWrDQJZ_KDmsm-XZGTEX_0FN7LHWyISdBP4YlJwTQ&oe=62A2AB4D",
  },
  {
    id: "4",
    image:
      "https://scontent.fmaa2-3.fna.fbcdn.net/v/t1.18169-9/13781726_1180081412014760_5872424441395926990_n.png?stp=dst-png_p320x320&_nc_cat=109&ccb=1-6&_nc_sid=85a577&_nc_ohc=ZgW1omQQeVsAX-Zqwyq&_nc_ht=scontent.fmaa2-3.fna&oh=00_AT-i7DWrDQJZ_KDmsm-XZGTEX_0FN7LHWyISdBP4YlJwTQ&oe=62A2AB4D",
  },
  {
    id: "5",
    image: "https://iconape.com/wp-content/files/dw/185903/png/185903.png",
  },
  {
    id: "6",
    image: "https://iconape.com/wp-content/files/dw/185903/png/185903.png",
  },
];
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

export const Offers = () => {
  const [imgActive, setimgActive] = useState(0);
  onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.floor(
        (nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width) * 1.5
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  return (
    <>
      <View>
        <Text style={{ paddingLeft: 20, fontSize: 20, fontWeight: 'bold' }}>
          Offers
        </Text>
      </View>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => (
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="#f2f2f2"
              key={e.id}
              onPress={({ data }) => null}
            >
              <Image
                key={e.id}
                resizeMode="cover"
                style={{
                  borderRadius: 25,
                  width: WIDTH / 1.5,
                  height: HEIGHT * 0.28,
                  marginRight: 20
                }}
                source={{ uri: e.image }}
              />
            </TouchableHighlight>
          ))}
        </ScrollView>

        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e.id}
              style={imgActive === index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingRight: 32,
    width: WIDTH,
    height: HEIGHT * 0.28,
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 3,
    color: "black",
  },
  dot: {
    margin: 3,
    color: "white",
  },
});
