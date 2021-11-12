import differenceInMinutes from 'date-fns/differenceInMinutes';

import { Parking } from '../app/Entities/Parking';

interface IHistoric {
    id: number;
    time: string;
    paid: boolean;
    left: boolean;
}

function calculateParkingTime(historic: Parking[]): IHistoric[] {
    let historicWithTime = historic.map(register => {
        let timeInMinutes = register.exit_time
            ? differenceInMinutes(register.exit_time, register.entry_time)
            : differenceInMinutes(new Date(), register.entry_time);

        let days = 0, hours = 0, minutes = 0;

        while (timeInMinutes >= 60 * 24) {
            days += 1;
            timeInMinutes -= 60 * 24;
        }

        while (timeInMinutes >= 60) {
            hours += 1;
            timeInMinutes -= 60;
        }

        minutes = timeInMinutes;

        let time = `${days > 0 ? days === 1 ? '1 dia, ' : `${days} dias, ` : ''}${hours > 0 ? hours === 1 ? '1 hora, ' : `${hours} horas, ` : ''}${minutes > 0 ? minutes === 1 ? '1 minuto.' : `${minutes} minutos.` : 'menos de 1 minuto.'}`;

        return { id: register.id, time: time, paid: register.paid, left: register.left };
    })

    return historicWithTime;
}

export { calculateParkingTime };