import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configUser } from "../../Redux/Reducers";
import { Dimensions, FlatList } from "react-native"
import { COLORS, mScale } from "../../Utilities";
import { styled } from "styled-components/native"
import { Button } from "../../Ui_elements";

const { width } = Dimensions.get("window");

export const OnBoardingScreen = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef(null)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.details)

    const slides = [
        {
            id: "1",
            image: require("../../../assets/users.png"),
            title: "Manage all users",
        },
        {
            id: "2",
            image: require("../../../assets/insights.png"),
            title: "Gain more insights",
        },
        {
            id: "3",
            image: require("../../../assets/success.png"),
            title: "Acheive team success",
        },
    ];

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x
        const currentIndex = Math.round(contentOffsetX / width)
        setCurrentSlideIndex(currentIndex)
    }

    const nextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width
            ref?.current?.scrollToOffset({ offset, animated: true })
            setCurrentSlideIndex(nextSlideIndex)
        }
    }

    const enterAuth = async () => {
        try {
            // const updatedShowValue = true;
            dispatch(configUser({
                ...user,
                onboard: true
            }))
            navigation.navigate("Login");
        } catch (e) {
            console.log("Onboarding couldn't save");
        }
    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1
        const offset = lastSlideIndex * width
        ref?.current?.scrollToOffset({ offset, animated: true })
        setCurrentSlideIndex(lastSlideIndex)
    }

    return (
        <OnBoardingContainer colors={COLORS}>
            <Slider
                ref={ref}
                data={slides}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Slide item={item} />}
                keyExtractor={(item) => item.id}
            />
            <Footer
                slides={slides}
                currentSlideIndex={currentSlideIndex}
            />

            <ButtonContainer>
                {
                    currentSlideIndex === slides.length - 1
                        ?
                        <Button
                            label={"Login"}
                            onPress={enterAuth}
                        />
                        :
                        <>
                            <Button
                                label={"Next"}
                                onPress={nextSlide}
                            />
                            <Button
                                label={"Skip"}
                                onPress={skip}
                            />
                        </>
                }

            </ButtonContainer>
        </OnBoardingContainer>
    );
};

const Slide = ({ item }) => {
    return (
        <StyledView width={width}>
            <OnBoardImage source={item.image} />
            <StyledText
                colors={COLORS}
            >{item.title}</StyledText>
        </StyledView>
    );
};

const Footer = ({ slides, currentSlideIndex }) => {
    return (
        <StyledFooterContainer>
            <StyledIndicatorContainer>
                {slides.map((_, index) => (
                    <StyledIndicator
                        key={index}
                        currentSlideIndex={currentSlideIndex}
                        colors={COLORS}
                        index={index}
                    />
                ))}
            </StyledIndicatorContainer>
        </StyledFooterContainer>
    );
};

const OnBoardingContainer = styled.View`
  background-color: ${({ colors }) => colors.white};
  padding-top: ${mScale(100)}px;
  width: 100%;
  flex: 1;
  align-items: center;
`;

const Slider = styled(FlatList).attrs({
    contentContainerStyle: {
        alignItems: "center",
    }
})`
  flex: 0.8;
`;
const ButtonContainer = styled.View`
  margin-top: 10%;
  width:100%;
  gap:${mScale(10)}px;
  padding-horizontal: ${mScale(20)}px;
`
const OnBoardImage = styled.Image`
  width: 100%;
  height: ${Platform.OS === "android" ? "60%" : "75%"};
  resize-mode: contain;
  align-self: center;
`;

const StyledView = styled.View`
  width: ${({ width }) => width && width}px;
  
`;

const SkipButton = styled(Button)`
  margin-top: 10px;
`

const StyledText = styled.Text`
  font-size: ${mScale(26)}px;
  font-weight: bold;
  margin-top: ${mScale(20)}px;
  text-align: center;
  width: 80%;
  align-self: center;
  color: ${({ colors }) => colors.blackText};
`;

const StyledFooterContainer = styled.View`
  height: 100px;
  justify-content: space-between;
  padding-horizontal: 20px;
`;

const StyledIndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const StyledIndicator = styled.View`
  height: ${mScale(5)}px;
  width: ${({ index, currentSlideIndex }) =>
        index === currentSlideIndex ? mScale(40) + "px" : mScale(10) + "px"
    };
  background-color: ${({ colors, index, currentSlideIndex }) =>
        index === currentSlideIndex ? colors.primary : colors.grayLine
    };
  margin-horizontal: 10px;
  border-radius: 50px;
`;