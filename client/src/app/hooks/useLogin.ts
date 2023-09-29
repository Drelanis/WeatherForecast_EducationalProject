import { useFormik } from 'formik';
import { registrationValidate as validate } from '@lib/helpers/registrationValidate';
import { IRegistrationValues } from '@models/interfaces/viewInterfaces';
import { toast } from 'react-toastify';
import { REGISTRATION } from 'src/apollo/mutation/registration';
import { useMutation } from '@apollo/client';

const useLogin = () => {};

export default useLogin;
