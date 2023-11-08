import * as yup from "yup"

export const CreateUserSchema = yup.object().shape({
    name: yup.string().required("Please enter a name"),
    job: yup.string().required("PLease enter a job")
})