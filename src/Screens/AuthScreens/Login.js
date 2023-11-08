import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';
import { TouchableOpacity } from "react-native"
import { Button, TextField } from '../../Ui_elements';
import { COLORS, mScale, nScale, vScale, request } from '../../Utilities';
import { EvilIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { AuthSchema } from './AuthSchema';
import { useLoginMutation } from '../../Redux/Services/api';
import { useDispatch } from 'react-redux';
import { configUser } from '../../Redux/Reducers';
import { useToast } from 'react-native-toast-notifications';

export const LoginScreen = () => {
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const toast = useToast()
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        // resolver: yupResolver(AuthSchema)
    })

    const [request, { isLoading }] = useLoginMutation()

    // const email = watch("email")
    // const password = watch("password")
    const onSubmit = async (data) => {

        if (data.email === "" || data.password === "") {
            toast.show("Please check your details", {
                type: "danger",
                placement: "top",
                animationType: "slide-in"
            })
        }
        else {
            const requestBody = {
                email: data.email,
                password: data.password
            }
            const response = await request(requestBody)
            if (response?.data?.token) {
                dispatch(configUser({
                    token: response?.data?.token
                }))
                toast.show("Login successful", {
                    type: "success",
                    placement: "top",
                    animationType: "slide-in"
                })
            }
            else {
                toast.show("Something went wrong", {
                    type: "error",
                    placement: "top",
                    animationType: "slide-in"
                })

            }
        }

    }

    return (
        <Container
            insets={insets}
            color={COLORS}
        >
            <KeyboardArea
                behavior='padding'
            >
                <TitleView>
                    <TextTitle>Login</TextTitle>
                    <Text>Hello, welcome back to your account.</Text>
                </TitleView>

                <Image source={require("../../../assets/password.png")} />
                <InputContainer>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                icon={() => <EvilIcons
                                    name='user'
                                    size={nScale(25)}
                                    color="black"
                                />}
                                placeholder={"Email"}
                                errors={errors?.username}
                            />
                        }
                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                icon={() => <EvilIcons
                                    name="lock"
                                    size={nScale(25)}
                                    color="black"
                                />}
                                endIcon={() => <EvilIcons
                                    name="eye"
                                    size={nScale(25)}
                                    color="black"
                                />}
                                placeholder={"Password"}
                                password
                                errors={errors?.password}
                            />
                        }
                    />
                </InputContainer>

                <ButtonContainer>
                    <Button
                        label={"Login"}
                        onPress={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                    />
                </ButtonContainer>
            </KeyboardArea>
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

const InputContainer = styled.View`
    gap: ${vScale(20)}px;
    margin-top: ${vScale(60)}px;

`
const TextTitle = styled.Text`
    font-weight: 600;
    font-size: ${mScale(35)}px;
    margin-top: ${vScale(50)}px;
    color: ${COLORS.blackText};
`
const Text = styled.Text`
    color: ${COLORS.lightText};
    font-size: ${mScale(18)}px;
    margin-top: ${vScale(5)}px;
`
const Image = styled.Image`
    align-self: center;
    margin-top: ${vScale(60)}px;
    height: ${mScale(150)}px;
    width: ${mScale(150)}px;
`
const KeyboardArea = styled.KeyboardAvoidingView`
    height: fit-content;
    height: 70%;
    justify-content: center;

`
const TitleView = styled.View`
    margin-top: ${vScale(50)}px;
`

const ButtonContainer = styled.View`
    margin-top: ${vScale(60)}px;
`