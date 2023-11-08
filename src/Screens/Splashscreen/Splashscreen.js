import React from 'react'
import { styled } from 'styled-components/native'
import { COLORS, mScale } from '../../Utilities'
import {Image} from "react-native"

export const Splashscreen = () => {
    return (
        <Container>
            <Image
                source={require("../../../assets")}
            />
            <Text>Work balance</Text>
       </Container>
    )
}


const Container = styled.View`
    flex: 1;
    background-color: ${COLORS.primary};
    justify-content: center;
    align-items: center;
    gap:${mScale(30)}px;
    width: 100%;
`

const Text = styled.Text`
    background-color: ${COLORS.white};
    font-size: ${mScale(18)}px;
    font-weight: 600;
`