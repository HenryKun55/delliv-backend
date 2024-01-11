import { User } from '@prisma/client';

export interface NotifyArrivalToEstablishment {
  user: User;
}

export interface NotifyEstablishmentToDelivery {
  notificationId: string;
  user: User;
}
