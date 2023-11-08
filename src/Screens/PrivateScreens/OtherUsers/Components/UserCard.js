import React from 'react'
import { styled } from 'styled-components/native'
import { Image } from "react-native"
import { COLORS, mScale, vScale } from '../../../../Utilities'
import { useNavigation } from '@react-navigation/native'

export const UserCard = ({ id, username, email, imageUrl, }) => {
    const navigation = useNavigation()
    return (
        <Container onPress={()=>navigation.navigate("single-user", {id})}>
            <Avatar
                source={{ uri: `${imageUrl}` }}
            />
            <Contact>
                <EmailText>{username}</EmailText>
                <Text>{email}</Text>
            </Contact>
        </Container>
    )
}

const Container = styled.TouchableOpacity`
    width: ${mScale(350)}px;
    flex-direction: row;
    height:${mScale(80)}px;
    padding: ${mScale(10)}px;
    background-color: ${COLORS.white};
    border-radius: ${mScale(14)}px;
    border-color: ${COLORS.lightText};
    border-width: 1px;
    align-items: center;
    gap: ${mScale(10)};
    
`
const Avatar = styled.Image`
    width: ${mScale(60)}px;
    height: ${mScale(60)}px;
    border-radius: 50%;
`

const Contact = styled.View`
    

`
const Text = styled.Text`
    color: ${COLORS.lightText};
    font-size: ${mScale(15)};

`
const EmailText = styled.Text`
    font-size: ${mScale(20)};
    font-weight: 600;
`