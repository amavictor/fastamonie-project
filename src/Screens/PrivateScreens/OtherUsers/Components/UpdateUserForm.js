import React from 'react'
import { styled } from "styled-components/native"
import { Controller, useForm } from 'react-hook-form'
import { Button, TextField } from '../../../../Ui_elements'
import { mScale } from '../../../../Utilities'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useUpdateUserMutation } from '../../../../Redux/Services/api';
import { useToast } from 'react-native-toast-notifications'

export const UpdateUserForm = ({ bottomSheetRef }) => {

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

    const [request, { isLoading }] = useUpdateUserMutation()
    const toast = useToast()

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
                toast.show("User has been updated", {
                    type: "success",
                    placement: "top",
                    animationType: "slide-in"
                })
                setValue("name", "")
                setValue("job", "")
                bottomSheetRef.current.close()
            }
        }


    }

    return (
        <Container>
            <Keyboard>
                <Controller
                    name='name'
                    control={control}
                    render={({ field }) =>
                        <TextField
                            {...field}
                            icon={() => <EvilIcons
                                name='user'
                                size={mScale(25)}
                                color="black"
                            />}
                            placeholder={"Enter a name"}
                            errors={errors?.name}
                        />
                    }
                />

                <Controller
                    name='job'
                    control={control}
                    render={({ field }) =>
                        <TextField
                            {...field}
                            icon={() => <Ionicons
                                name='briefcase-outline'
                                size={mScale(25)}
                                color="black"
                            />}
                            placeholder={"Enter a job"}
                            errors={errors?.job}
                        />
                    }
                />

                <Button
                    isLoading={isLoading}
                    label={"Update user"}
                    onPress={handleSubmit(onSubmit)}
                />
            </Keyboard>


        </Container>
    )
}


const Container = styled.View`
    flex: 1;
    padding-horizontal: ${mScale(70)}px;
    align-items: center;
    margin-top: 30%;
`

const Keyboard = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    gap: ${mScale(30)}px;
    width: 100%;
`