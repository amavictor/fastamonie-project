import React, {useState, useEffect, useRef} from 'react'
import { styled } from "styled-components/native"
import { mScale, vScale } from '../../../../Utilities'
import { Animated, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetUserListQuery } from '../../../../Redux/Services/api'
import { COLORS } from '../../../../Utilities'
import { RefreshControl } from 'react-native'
import { UserCard } from '../Components/UserCard'

export const AllUsers = () => {
    const insets = useSafeAreaInsets()
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching, isSuccess } = useGetUserListQuery(
        page,
        {
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        }
    )

    const handleLoadMore = () => {
        if (isSuccess && !isLoading && !isFetching) {
            setPage((prevPage) => prevPage + 1);
        }
    }

    useEffect(() => {
        if (data && isSuccess) {
            setContent((prevContent) => [...prevContent, ...data?.data])
        }
    }, [data])



    const scrollY = useRef(new Animated.Value(0)).current

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, vScale(10)],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, vScale(60)],
        outputRange: [0, -vScale(60)],
        extrapolate: "clamp",
    });

    if (isLoading && page === 1) {
        return (
            <LoaderContainer>
                <ActivityIndicator
                    size={mScale(50)}
                    color={COLORS.primary}
                />
            </LoaderContainer>)
    }
    return (
        <Container insets={insets} color={COLORS}>
            <TaskHeader
                style={{
                    opacity: headerOpacity,
                    transform: [{ translateY: headerTranslateY }],
                }}
            >
                <TaskText colors={COLORS.blackText}>All users</TaskText>
            </TaskHeader>

            <Animated.FlatList
                data={content}
                contentContainerStyle={{
                    gap: `${vScale(20)}px`,
                    width: "100%",
                    // paddingBottom: `${vScale(200)}px`
                }}
                refreshControl={<RefreshControl />}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        mScale(93) * index,
                        mScale(93) * (index + 2)
                    ];
                    const opacityInputRange = [
                        -1,
                        0,
                        mScale(93) * index,
                        mScale(93) * (index + .5)
                    ];
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                        extrapolate: "clamp"
                    });
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            style={{
                                opacity,
                                transform: [{ scaleX: scale }, { scaleY: scale }],
                            }}
                        >
                            <UserCard
                                id={item?.id}
                                username={item?.first_name}
                                email={item?.email}
                                imageUrl={item?.avatar}
                            />
                        </Animated.View>
                    );
                }}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                onEndReached={handleLoadMore}
                ListFooterComponent={
                    isFetching && <ActivityIndicator size="small" color={COLORS.primary} />
                }
            >
            </Animated.FlatList>


            {
                !data || data?.data.length === 0 ? (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: mScale(16),
                                color: "gray"
                            }}
                        >
                            You have no users
                        </Text>
                    </View>
                ) : null
            }

        </Container>

    )
}

const Container = styled.View`
    flex:1;
    background-color: ${({ color }) => color.white};
    padding-top: ${({ insets }) => insets.top}px;
    gap: 30%;
    align-items: center;
    justify-content: center;
    /* height: 20px; */
`

const TaskHeader = styled(Animated.View)`
    flex-direction: row;
    height:${mScale(30)}px;
    padding-horizontal:${mScale(20)}px;
    align-items: center;
`

const TaskText = styled.Text`
    font-size:${mScale(18)}px;
    font-weight:600;
    /* color:${({ colors }) => colors.textColor}; */
`

const LoaderContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`