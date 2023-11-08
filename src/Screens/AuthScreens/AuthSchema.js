import * as yup from "yup"

export const AuthSchema = yup.object().shape({
    email: yup.string().email().required("Please enter your username"),
    password:yup.string().required("Please enter your password")
})