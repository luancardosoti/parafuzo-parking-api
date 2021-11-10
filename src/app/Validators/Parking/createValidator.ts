import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const schema = Yup.object().shape({
            plate: Yup.string()
                .typeError('Deve ser um formato válido de texto')
                .required('A Placa é obrigatória.')
                .test('validPlate', 'Formato do número da placa inválido. Siga o exemplo: "AAA-1234".', plate => {
                    const regex = /^([A-Z]{3})-(\d{4}$)/;

                    if (!regex.test(plate)) {
                        return false;
                    }

                    return true;
                }),
        });
        await schema.validate(request.body, { abortEarly: false });

        return next();
    } catch (err) {
        return response
            .status(400)
            .json({ error: 'Validation fails', messages: err.inner });
    }
};
