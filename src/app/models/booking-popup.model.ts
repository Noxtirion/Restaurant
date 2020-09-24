export class ContactRequest {
  date: string = '';
  timeAvalible: string = '00:00';
  numberOfGuests: number = 0;
  firstName: string = '';
  lastName: string = '';
  uniqueId: string = '';
}

export class CancelRequest {
  uniqueId: string = '';
}
