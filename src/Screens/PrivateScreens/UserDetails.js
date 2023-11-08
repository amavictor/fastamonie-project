import React from 'react'
import { styled } from 'styled-components/native'
import { mScale } from '../../Utilities'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../Utilities';
import {Text} from "react-native"
import { useGetUserListQuery } from '../../Redux/Services/api';

export const UserDetails = () => {

    return (
        <Container
            insets={insets}
            color={COLORS}
        >
            <Text>THisdsd</Text>
        </Container>
    )
}

const Container = styled.View`
    flex:1;
    background-color: ${({ color }) => color.white};
    padding-horizontal:${mScale(40)}px;
    gap: 30%;
    padding-top: ${({ insets }) => insets.top}px;
`