import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLORS, mScale, vScale } from '../../Utilities';
import { styled } from 'styled-components/native';

export const Button = ({ label, isLoading, ...otherProps }) => {
    return (
        <Container
            {...otherProps}
        >
            {isLoading ? <ActivityIndicator
                size={mScale(18)}
                color={COLORS.blackText}
            /> :
                <Content>
                    {label}
                </Content>
            }

        </Container>
    )
}

const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${COLORS.primary};
    color: ${COLORS.white};
    border-radius: ${mScale(15)}px;
    opacity: 0.7;
    align-items: center;
    justify-content: center;
    height: ${vScale(40)}px;
`
const Content = styled.Text`
    font-weight: 600;
    font-size: ${mScale(18)}px;
`