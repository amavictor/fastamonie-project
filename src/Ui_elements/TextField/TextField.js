import{ useState, forwardRef } from 'react'
import { styled } from 'styled-components/native'
import { COLORS, mScale, mVScale, nScale, vScale } from '../../Utilities'
import { View } from "react-native"

export const TextField = forwardRef(({
    password,
    icon,
    endIcon,
    placeholder,
    error,
    onChange,
    value,
    ...otherProps
}, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
    }
    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <InputBody ref={ref}>
            <Container
                focused={isFocused}
            >
                <IconContainer>{icon && icon()}</IconContainer>
                <Input
                    {...otherProps}
                    onChangeText={onChange}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={password}
                    placeholder={placeholder}
                />
                <IconContainer>{endIcon && endIcon()}</IconContainer>
            </Container>
            <ErrorContainer>
                {error && <ErroText>⚠ {error}</ErroText>}
            </ErrorContainer>
        </InputBody>

    )
})

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: ${mScale(20)}px;
    border-bottom-color: ${({ focused }) => focused ? COLORS.primary : COLORS.grayLine};
    border-bottom-width: 1.5px;

`

const Input = styled.TextInput`
    width:100%;
    font-weight: 500;
    height: ${mVScale(30)}px;
    font-size: ${mScale(18)}px;
`

const IconContainer = styled.View`

`
const InputBody = styled.View`

`
const ErrorContainer = styled.View`
    margin-top: ${vScale(6)}px;
`
const ErroText = styled.Text`
    color: red;
    font-size: ${mScale(10)}px;
`