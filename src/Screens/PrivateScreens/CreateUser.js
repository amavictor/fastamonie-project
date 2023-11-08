import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';
import { Keyboard, View, TouchableWithoutFeedback, ScrollView } from "react-native"
import { TextField, Button } from '../../Ui_elements';
import { COLORS, mScale, nScale, vScale } from '../../Utilities';
import { EvilIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { useCreateAccountMutation, useSignupMutation } from '../../Redux/Services/api';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useToast } from 'react-native-toast-notifications';


export const CreateAccountScreen = () => {
    const insets = useSafeAreaInsets()
    const toast = useToast()
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            job: ""
        }
    })

    const [request, { isLoading }] = useCreateAccountMutation()

    const onSubmit = async (data) => {
        const requestBody = {
            name: data.name,
            job: data.job
        }


        if (data.name === "" || data.job === "") {
            toast.show("Please check your details", {
                type: "danger",
                placement: "top",
                animationType: "slide-in"
            })
        }
        else {
            const response = await request(requestBody)
            if (response) {
                toast.show("User has been created", {
                    type: "success",
                    placement: "top",
                    animationType: "slide-in"
                })
                setValue("name", "")
                setValue("job", "")


            } else {
                toast.show("Something went wrong", {
                    type: "danger",
                    placement: "top",
                    animationType: "slide-in"
                })
            }
        }

    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container
                insets={insets}
                color={COLORS}
            >
                <KeyboardArea
                    behavior='position'
                >
                    <TitleView>
                        <TextTitle>Create user</TextTitle>
                        <Text>Hello, go ahead and create a user.</Text>
                    </TitleView>


                    <View
                        style={{
                            height: "auto",
                            width: "auto",
                            alignSelf: "center",
                            marginTop: vScale(20)
                        }}
                    >
                        <LottieView
                            style={{
                                width: mScale(200),
                                height: mScale(200),
                                backgroundColor: '#eee',
                            }}
                            source={require("../../../user.json")}
                            autoPlay
                        // loop
                        />
                    </View>

                    <InputContainer>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    icon={() => <EvilIcons
                                        name='user'
                                        size={mScale(25)}
                                        color="black"
                                    />}
                                    error={errors?.name}
                                    placeholder={"Enter a user name"}
                                />
                            }
                        />

                        <Controller
                            name="job"
                            control={control}
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    icon={() => <Ionicons
                                        name="briefcase-outline"
                                        size={24}
                                        color="black"
                                    />
                                    }
                                    error={errors?.job}
                                    placeholder={"Enter a job"}
                                />
                            }

                        />

                    </InputContainer>

                    <ButtonContainer>
                        <Button
                            isLoading={isLoading}
                            label={"Create Account"}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </ButtonContainer>
                </KeyboardArea>
            </Container>
        </TouchableWithoutFeedback>

    )
}

const Container = styled(ScrollView).attrs(({ color,insets }) => ({
    contentContainerStyle: {
        flex:1,
        backgroundColor:color.white,
        paddingHorizontal:mScale(40),
        paddingTop: insets.top,
        alignItems: "center",
        justifyContent: "center",
        gap: mScale(30)
    }
}))`
  
`

const InputContainer = styled.View`
    gap: ${vScale(20)}px;
    margin-top: ${vScale(40)}px;

`
const TextTitle = styled.Text`
    font-weight: 600;
    font-size: ${nScale(25)}px;
    margin-top: ${vScale(50)}px;
    color: ${COLORS.blackText};
`
const Text = styled.Text`
    color: ${COLORS.lightText};
    font-size: ${mScale(18)}px;
`
const Image = styled.Image`
    align-self: center;
    margin-top: ${vScale(10)}px;
    height: ${mScale(150)}px;
    width: ${mScale(150)}px;
`
const KeyboardArea = styled.KeyboardAvoidingView`
    height: 100%;
    flex: 1;
    width: 100%;
`
const TitleView = styled.View`
`
const ButtonContainer = styled.View`
    margin-top: ${vScale(60)}px;
`