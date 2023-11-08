import { useSelector } from 'react-redux'
import { styled } from 'styled-components/native'
import { AuthNavigation } from './AuthNavigation'
import { PrivateNavigation } from './PrivateNavigation'

export const Navigation = () => {
    const user = useSelector((state) => state.user.details.payload)
    return (
        <Container>
          {!user?.token ?  <AuthNavigation />
            :<PrivateNavigation/>}
        </Container>
    )
}

const Container = styled.View`
    height: 100%;
`