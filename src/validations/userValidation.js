import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  username: Yup.string().required('Nome é obrigatório'),
  categoriaId: Yup.number().required('Categoria é obrigatória'),
  password: Yup.string().required('Senha é obrigatória').min(3, 'A senha deve ter pelo menos 3 caracteres'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem coincidir').required('Confirmação de senha é obrigatória'),
});

export const updateUserSchema = Yup.object().shape({
  username: Yup.string(),
  categoriaId: Yup.number(),
  oldPassword: Yup.string().min(3, 'A senha antiga deve ter pelo menos 3 caracteres'),
  password: Yup.string().min(3, 'A nova senha deve ter pelo menos 3 caracteres').when('oldPassword', {
    is: (oldPassword) => !!oldPassword,
    then: Yup.string().required('A nova senha é obrigatória ao fornecer a antiga'),
  }),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem coincidir'),
});
