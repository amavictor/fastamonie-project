import React from 'react'
import { styled } from "styled-components/native"
import { useGetCurrentUserQuery } from '../../Redux/Services/api'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mScale, vScale, COLORS } from '../../Utilities';
import { ActivityIndicator } from "react-native"
import { Button } from '../../Ui_elements';
import { useDispatch } from 'react-redux';
import { configUser } from '../../Redux/Reducers';
export const Home = () => {
    const insets = useSafeAreaInsets()
    const { data, isLoading } = useGetCurrentUserQuery()

    const dispatch = useDispatch()

    if (isLoading) {
        <LoaderContainer>
            <ActivityIndicator
                size={mScale(50)}
                color={"black"}
            />
        </LoaderContainer>
    }

    const logout = () => {
        dispatch(configUser({
            token: null,
            onboard:false
        }))
    }

    return (
        <Container
            insets={insets}
            color={COLORS}
        >
            <Image
                source={{ uri: data?.data.avatar }}
                resizeMode={"cover"}
            />

            <DetailContainer>
                <Name>{data?.data?.first_name} {data?.data?.last_name}</Name>
                <Email>{data?.data?.email}</Email>
            </DetailContainer>

            <Button
                label={"Logout"}
                onPress={logout}
            />
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
    font-size: ${mScale(24)}px;
    font-weight: 600;
    text-align: center;
`

const Email = styled.Text`
    font-size: ${mScale(17)}px;
    font-weight: 400;
    text-align: center;
    color: ${COLORS.lightText};
`

const LoaderContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`