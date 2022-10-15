import { Box, Button, Container, FormControl, FormErrorMessage, Heading, Input, SimpleGrid } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { useMutation } from "react-query";
import { login } from "../../http/auth";
import { IDecodedToken, ILogin } from "../../models";
import Cookies from 'js-cookie';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { initHTTPToken } from "../../http";

const LoginForm = () => {

    const navigate = useNavigate();

    const toast = useToast()

    const [inputs,setInputs] =useState({
        userName: '',
        password: ''
    });

    const [errors,setErrors] =useState({
        userName: false,
        password: false
    })

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const loginMutation = useMutation((credentials: ILogin) => login(credentials));

    const handleSubmit = async () => {

        // Reset Errors
        setErrors({
            userName: false,
            password: false
        });

        // Validate
        if(inputs.userName === '') {
            setErrors(prev => {
                return {
                    ...prev,
                    userName: true
                }
            });
            return;
        }
        if(inputs.password === '') {
            setErrors(prev => {
                return {
                    ...prev,
                    password: true
                }
            });
            return;  
        }
        
        // All OK
        const res= await loginMutation.mutateAsync(inputs);
        
        if(res.success) {

            const decodedToken: IDecodedToken = jwt_decode(res.token);
            
            Cookies.set('FEUToken',res.token,{expires: Math.floor(decodedToken.exp / (1000 * 3600 * 24))});
            Cookies.set('FEUser',JSON.stringify(res.user),{expires: Math.floor(decodedToken.exp / (1000 * 3600 * 24))});
            
            initHTTPToken();

            toast({
                description: 'Log In Success',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            });
            return navigate('/');
        }

        toast({
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        })    

    }

  return (
    <Container>
        <Box borderWidth={1} padding={10} borderRadius={10} boxShadow={'md'}>
            <SimpleGrid spacing={4}>
                <Heading color={'teal'} textAlign={'center'} mb={2}>Log  In</Heading>
                <FormControl isInvalid={errors.userName}>
                    <Input
                        placeholder="User Name"
                        type='text'
                        name="userName"
                        value={inputs.userName}
                        onChange={handleInputs}
                    />
                    {errors.userName && <FormErrorMessage>User Name is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={errors.password}>
                    <Input
                        placeholder="Password"
                        type='password'
                        name="password"
                        value={inputs.password}
                        onChange={handleInputs}
                    />
                    {errors.password && <FormErrorMessage>Password is required.</FormErrorMessage>}
                </FormControl>
                <Button 
                    // spinner={<BeatLoader size={8} 
                    // color='white' />}
                    isLoading={loginMutation.isLoading}
                    colorScheme='teal' 
                    size='md' onClick={handleSubmit}>
                    Submit
                </Button>
            </SimpleGrid>
        </Box> 
    </Container>
  )
}

export default LoginForm
