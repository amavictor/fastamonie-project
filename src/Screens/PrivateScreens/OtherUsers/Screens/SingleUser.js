import React, { useRef } from 'react'
import { styled } from "styled-components/native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, mScale, vScale } from '../../../../Utilities';
import { useGetSingleUserQuery } from '../../../../Redux/Services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet } from "react-native"
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button } from '../../../../Ui_elements';
import { BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { UpdateUserForm } from '../Components/UpdateUserForm';

export const SingleUser = () => {
    const insets = useSafeAreaInsets()
    const route = useRoute()
    const navigation = useNavigation()
    const bottomSheetModalRef = useRef()
    const { params } = route
    const { data, isLoading } = useGetSingleUserQuery(params.id)
    const snapPoints = ["60%"]

    if (!params.id) {
        navigation.navigate("user-details")
    }


    if (isLoading) {
        <LoaderContainer>
            <ActivityIndicator
                size={mScale(50)}
                color={"black"}
            />
        </LoaderContainer>
    }
    return (
        <Container
            insets={insets}
            color={COLORS}
        >
            <BottomSheetModalProvider>
                <Image
                    source={{ uri: data?.data.avatar }}
                    resizeMode={"cover"}
                />

                <DetailContainer>
                    <Name>{data?.data?.first_name} {data?.data?.last_name}</Name>
                    <Email>{data?.data?.email}</Email>
                </DetailContainer>

                <Button
                    label={"Update"}
                    onPress={() => bottomSheetModalRef.current?.present()}
                />

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backgroundStyle={{
                        borderRadius: 25,
                        backgroundColor: COLORS.backdrop
                    }}
                    backdropComponent={(props) =>
                        <BottomSheetBackdrop {...props}
                            opacity={0.5}
                            enableTouchThrough={false}
                            appearsOnIndex={0}
                            disappearsOnIndex={-1}
                            style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' },
                            StyleSheet.absoluteFillObject]}
                        />}

                >

                    <UpdateUserForm
                        bottomSheetRef={bottomSheetModalRef}
                    />
                </BottomSheetModal>
            </BottomSheetModalProvider>

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
    padding-horizontal: ${mScale(40)}px;
`
const Image = styled.Image`
    width: ${mScale(170)}px;
    height: ${mScale(170)}px;
    border-radius: 100%;
    text-align: center;
`
const DetailContainer = styled.View`
    margin-top: ${vScale(5)}px;
`
const Name = styled.Text`
    font-size: ${mScale(24)};
    font-weight: 600;
    text-align: center;
`
const Email = styled.Text`
    font-size: ${mScale(17)};
    font-weight: 400;
    text-align: center;
    color: ${COLORS.lightText};
`
const LoaderContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`